<script setup lang="ts">
import { computed } from 'vue'

type PersonIn = {
  name: string
  image?: string   // filename or basename (e.g., "Abraham_alikhanyan.webp" or "abraham")
  text?: string    // optional; filled from internal bios if omitted
  href?: string
}

/* ---------- Load images from assets (case/extension tolerant) ---------- */
const imgMods = import.meta.glob('~/assets/images/historical-overview/*.{webp,png,jpg,jpeg}', {
  eager: true,
  import: 'default'
}) as Record<string, string>

const files = Object.entries(imgMods)
  .map(([path, url]) => {
    const file = path.split('/').pop() || ''
    const base = file.replace(/\.[^.]+$/, '')
    return { file, url, base, lowerFile: file.toLowerCase(), lowerBase: base.toLowerCase() }
  })
  .sort((a, b) => a.file.localeCompare(b.file))

const exactByFile = Object.fromEntries(files.map(f => [f.file, f.url]))

function resolveImg(name?: string): string {
  if (!name) return ''
  const raw = name.split('/').pop()!.trim()
  if (exactByFile[raw]) return exactByFile[raw]
  const lower = raw.toLowerCase()
  const byLower = files.find(f => f.lowerFile === lower)?.url
  if (byLower) return byLower
  const base = raw.replace(/\.[^.]+$/, '').toLowerCase()
  const byBase = files.find(f => f.lowerBase === base || f.lowerBase.startsWith(base))?.url
  if (byBase) return byBase
  if (import.meta.env.DEV) console.warn('[HistoricalOverview] image not found:', raw, 'Available:', files.map(f => f.file))
  return ''
}

/* ---------- Internal bios (kept inside the component) ---------- */
const canon = (s: string) => s.toLowerCase().replace(/[_\W]+/g, ' ').trim()
const bios: Record<string, string> = {
  [canon('Abraham Alikhanyan')]:
`Yerevan Physics Institute (YerPhI) was founded in 1943 by eminent physicists Abraham and Artem Alikhanyan brothers. The study of cosmic rays and the setting-up of two cosmic ray stations on Mount Aragats (“Aragats” and “Nor Amberd”) laid the groundwork for the Institute. In 1962, the Institute appeared under the authority of the State Atomic Energy Committee of the Soviet Union. After the collapse of the Soviet Union in 1992, YerPhI was taken under the auspices of the RA Ministry of Industry and Trade. Since 2002, it has borne the name of founder Artem Alikhanyan as a state non-commercial organization. In 2010 it was renamed “A. I. Alikhanyan National Science Laboratory”, and in 2011 evolved into “A. I. Alikhanyan National Science Laboratory (Yerevan Physics Institute)” Foundation (AANL).`,

  [canon('Artem Alikhanyan')]:
`An important milestone in the Institute’s history is the construction of the 6 GeV electron synchrotron, completed in 1967, becoming the first particle accelerator in Armenia (“ARUS”). In the 1970–90s numerous experiments were conducted at the Yerevan electron accelerator, including studies of hadronic properties of photons, nuclear resonances, properties of nuclear matter, and transition radiation in the X-ray region—methods still widely used today for particle identification.`
}

/* ---------- Props ---------- */
const props = withDefaults(defineProps<{
  title?: string
  people?: PersonIn[]     // You can pass just { name, image }
  readMoreHref?: string
}>(), {
  title: 'Historical overview',
  readMoreHref: '/history'
})

/* ---------- Defaults (used if parent passes nothing) ---------- */
const defaults: PersonIn[] = [
  { name: 'Abraham Alikhanyan', image: 'abraham' },
  { name: 'Artem Alikhanyan',   image: 'artem' }
]

/* ---------- Merge: fill bios, resolve images, graceful fallbacks ---------- */
const merged = computed(() => {
  const src = (props.people?.length ? props.people : defaults).map(p => ({ ...p }))
  for (const p of src) {
    const key = p.name ? canon(p.name) : ''
    if (!p.text && bios[key]) p.text = bios[key]
    ;(p as any).imgUrl = resolveImg(p.image)
  }
  // fallback to first images if unresolved
  const pool = files.map(f => f.url)
  if (src[0] && !(src[0] as any).imgUrl && pool[0]) (src[0] as any).imgUrl = pool[0]
  if (src[1] && !(src[1] as any).imgUrl && pool[1]) (src[1] as any).imgUrl = pool[1]
  return src as Array<PersonIn & { imgUrl: string }>
})
</script>

<template>
  <section class="relative container overflow-hidden bg-[#0E214B] text-white" aria-labelledby="history-title">
    <!-- Decorative background (soft vignette + diagonal lines) -->
    <div aria-hidden="true" class="pointer-events-none absolute inset-0 -z-10">
      <div class="absolute inset-0 bg-[radial-gradient(120%_90%_at_40%_-10%,rgba(99,102,241,0.20),transparent_60%)]"></div>
      <div class="absolute inset-0 opacity-20 [background:repeating-linear-gradient(122deg,rgba(255,255,255,0.06)_0_2px,transparent_2px_18px)]"></div>
      <div class="absolute -top-24 -left-24 size-[320px] rounded-[48px] bg-blue-500/10 blur-2xl"></div>
      <div class="absolute -bottom-24 -right-24 size-[360px] rounded-[48px] bg-indigo-400/10 blur-2xl"></div>
    </div>

    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-24">
      <!-- Title with underline -->
      <h2 id="history-title"
          class="inline-block text-2xl sm:text-3xl font-bold tracking-tight text-white dark:text-white relative
                after:content-[''] after:block after:h-[3px] after:bg-white after:rounded-full after:mt-2">
        <span>{{ title }}</span>
        <span class="h-[3px] w-24 bg-white/80 rounded-full"></span>
      </h2>
      

      <!-- Row 1 -->
      <div v-if="merged[0]" class="mt-8 sm:mt-10 grid items-center gap-6 md:gap-10 lg:gap-14 md:grid-cols-12">
        <!-- Image left -->
        <figure class="md:col-span-5">
          <div class="overflow-hidden rounded-[20px] ring-1 ring-white/10 shadow-2xl">
            <img
              :src="merged[0].imgUrl"
              :alt="merged[0].name"
              class="w-full h-auto object-cover grayscale"
              loading="lazy" decoding="async"
            />
          </div>
        </figure>

        <!-- Text right -->
        <div class="md:col-span-7">
          <h3 class="text-[22px] sm:text-[24px] font-semibold">{{ merged[0].name }}</h3>
          <p class="mt-3 text-[14.5px] leading-7 text-white/90 max-w-prose">
            {{ merged[0].text }}
          </p>
        </div>
      </div>

      <!-- Row 2 (flipped) -->
      <div v-if="merged[1]"
           class="mt-10 sm:mt-12 grid items-center gap-6 md:gap-10 lg:gap-14 md:grid-cols-12">
        <!-- Text left on desktop -->
        <div class="md:col-span-7 order-2 md:order-1">
          <h3 class="text-[22px] sm:text-[24px] font-semibold">{{ merged[1].name }}</h3>
          <p class="mt-3 text-[14.5px] leading-7 text-white/90 max-w-prose">
            {{ merged[1].text }}
          </p>
        </div>

        <!-- Image right on desktop -->
        <figure class="md:col-span-5 order-1 md:order-2">
          <div class="overflow-hidden rounded-[20px] ring-1 ring-white/10 shadow-2xl">
            <img
              :src="merged[1].imgUrl"
              :alt="merged[1].name"
              class="w-full h-auto object-cover grayscale"
              loading="lazy" decoding="async"
            />
          </div>
        </figure>
      </div>

      <!-- CTA -->
      <div class="mt-10 sm:mt-12 flex justify-center">
        <NuxtLink
        :to="readMoreHref"
        class="group inline-flex w-full items-center justify-center
                h-[50px] px-8 gap-4 rounded-[130px]
                text-[15px] font-semibold leading-none
                text-[#1D50A2] bg-white hover:bg-[#EAF0FF]
                focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/80
                focus-visible:ring-offset-2 focus-visible:ring-offset-[#0E214B]
                transition"
        aria-label="Read more about our history"
        >
        <span>Read More</span>
        <svg class="size-4 transition-transform group-hover:translate-x-1" viewBox="0 0 20 20" fill="none" aria-hidden="true">
            <path d="M4 10h10" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
            <path d="M10 5l5 5-5 5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        </NuxtLink>

      </div>
    </div>
  </section>
</template>
