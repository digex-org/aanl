<script setup lang="ts">
import { computed } from 'vue'

type PartnerItem = {
  name?: string          // Shown as alt text (accessible)
  href?: string          // Optional link to partner site
  image?: string         // filename only, e.g. "kek.webp"
}

const props = withDefaults(defineProps<{
  title?: string
  allHref?: string
  becomeHref?: string
  items?: PartnerItem[]  // If you want to feed from API/CMS
}>(), {
  title: 'Our partners',
  allHref: '/partners',
  becomeHref: '/partners#become'
})

/* ===== Load images from assets/images/partners ===== */
const logoModules = import.meta.glob('~/assets/images/partners/*.{webp,png,jpg,jpeg,svg}', {
  eager: true,
  import: 'default'
}) as Record<string, string>

const logos = Object
  .entries(logoModules)
  .sort(([a], [b]) => a.localeCompare(b))        // keep stable order (by filename)
  .map(([path, url]) => {
    const file = path.split('/').pop() || ''
    const base = file.replace(/\.[^.]+$/, '')
    // Build a readable default name from filename
    const name = base
      .replace(/[-_]+/g, ' ')
      .replace(/\s+/g, ' ')
      .trim()
      .replace(/\b([a-z])/g, s => s.toUpperCase())
    return { name, url, file }
  })

// Helper: filename -> built URL
const byFile: Record<string, string> = Object.fromEntries(logos.map(l => [l.file, l.url]))

function img(name?: string) {
  return name ? (byFile[name] ?? '') : ''
}

const defaultItems: PartnerItem[] = logos.map(l => ({ name: l.name, image: l.file }))

// final list
const list = computed<PartnerItem[]>(() => {
  if (props.items?.length) {
    // If items were passed, try to resolve their image filenames; keep href/name as provided
    return props.items.map(it => ({
      ...it,
      image: it.image,
      name: it.name || it.image?.replace(/\.[^.]+$/, '') || 'Partner'
    }))
  }
  return defaultItems
})
</script>

<template>
  <section class="dark:bg-gray-950" aria-labelledby="partners-title">
    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 sm:py-14 lg:py-20">
      <!-- Header -->
      <div class="mb-6 sm:mb-8 flex items-center justify-between">
        <h2
            id="contact-title"
            class="inline-block text-2xl sm:text-3xl font-bold tracking-tight text-gray-900 dark:text-white
                relative
                after:content-[''] after:block after:h-[3px] after:bg-gray-900 after:rounded-full after:mt-2"
        >
            {{ title }}
        </h2>

        <NuxtLink
          :to="allHref"
          class="group inline-flex items-center gap-2 text-[#1D50A2] font-semibold text-sm"
        >
          <span>All Partners</span>
          <svg class="size-4 transition-transform group-hover:translate-x-1" viewBox="0 0 20 20" fill="none" aria-hidden="true">
            <path d="M4 10h10" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
            <path d="M10 5l5 5-5 5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </NuxtLink>
      </div>

      <!-- Grid (mobile scroll-snap, desktop grid) -->
      <div
        class="snap-x snap-mandatory overflow-x-auto -mx-4 px-4 sm:mx-0 sm:px-0
               flex gap-4 sm:grid sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 sm:gap-5"
        role="list"
        aria-label="Partners logos"
      >
        <NuxtLink
          v-for="(p, i) in list" :key="i"
          :to="p.href || '#'"
          :aria-label="p.name || 'Partner'"
          role="listitem"
          class="group min-w-[68%] xs:min-w-[50%] sm:min-w-0
                 rounded-2xl border border-gray-200/80 dark:border-white/10
                 bg-white dark:bg-gray-900
                 shadow-[0_0_0_3px_rgba(29,80,162,0.06)]
                 hover:shadow-[0_0_0_4px_rgba(29,80,162,0.13)]
                 transition will-change-transform hover:-translate-y-0.5
                 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1D50A2]
                 p-5 flex items-center justify-center"
        >
          <div class="w-full">
            <!-- keep card ratio consistent -->
            <div class="aspect-[4/3] w-full rounded-xl bg-white dark:bg-gray-950 grid place-items-center">
              <img
                :src="img(p.image)"
                :alt="p.name"
                class="max-h-16 w-auto object-contain"
                loading="lazy" decoding="async"
              />
            </div>
          </div>
        </NuxtLink>
      </div>

      <!-- Bottom-centered CTA -->
      <div class="mt-8 flex justify-center">
        <NuxtLink
          :to="becomeHref"
          class="group inline-flex items-center justify-center gap-2
                 h-[44px] rounded-[130px] px-6
                 text-[15px] font-semibold
                 text-white bg-[#1D50A2] hover:bg-[#17408B]
                 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1D50A2] focus-visible:ring-offset-2
                 transition"
        >
          <span>Become A Partner</span>
          <svg class="size-4 transition-transform duration-200 ease-out group-hover:translate-x-1"
               viewBox="0 0 20 20" fill="none" aria-hidden="true">
            <path d="M4 10h10" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
            <path d="M10 5l5 5-5 5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </NuxtLink>
      </div>
    </div>
  </section>
</template>
