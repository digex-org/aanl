<script setup lang="ts">
type Media = { kind: 'media'; image: string; alt?: string }
type Stat  = { kind: 'stat';  value: string; label: string }
type Card  = Media | Stat

const props = withDefaults(defineProps<{
  // filenames for the two photos (in assets/images/about-numbers)
  buildingImage?: string
  labImage?: string
  titleTop?: string
  titleBottom?: string
}>(), {
  buildingImage: 'campus.webp',
  labImage: 'lab.webp',
  titleTop: 'About us',
  titleBottom: 'in numbers',
})

/* Resolve images from assets */
const mods = import.meta.glob('~/assets/images/about-numbers/*.{webp,png,jpg,jpeg}', {
  eager: true, import: 'default'
}) as Record<string, string>
const byFile = Object.fromEntries(Object.entries(mods).map(([p,u]) => [p.split('/').pop()!, u]))
const url = (f?: string) => (f ? (byFile[f] ?? '') : '')
</script>

<template>
  <section class="dark:bg-gray-950" aria-labelledby="about-numbers-title">
    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
      <!-- GRID: explicit placement on lg (12 cols, 2 rows) -->
      <div
        class="grid gap-4 sm:gap-5 lg:gap-6
               grid-cols-1 sm:grid-cols-2 lg:grid-cols-12
               lg:[grid-auto-rows:minmax(0,1fr)]"
      >
        <!-- Row 1, Col 1–3: Title block -->
        <div
          class="lg:col-start-1 lg:col-span-3 lg:row-start-1
                 flex flex-col justify-start"
        >
          <h2 id="about-numbers-title"
              class="text-4xl leading-tight sm:text-5xl font-extrabold tracking-tight text-gray-900 dark:text-white">
            <span class="block">{{ titleTop }}</span>
            <span class="block">{{ titleBottom }}</span>
          </h2>
         </div>

        <!-- Row 1, Col 4–6: Nº1 -->
        <div class="lg:col-start-4 lg:col-span-3 lg:row-start-1">
          <div class="h-full rounded-2xl sm:rounded-3xl bg-[#EAF0FF] dark:bg-[#0f1a36]
                      ring-1 ring-black/5 dark:ring-white/10 p-6 sm:p-7 lg:p-8">
            <div class="text-[#1D50A2] text-4xl sm:text-5xl font-bold tracking-tight">Nº1</div>
            <p class="mt-3 text-sm sm:text-base leading-6 text-gray-700 dark:text-gray-300">
              Research institution in physics and nuclear sciences
            </p>
          </div>
        </div>

        <!-- Row 1, Col 7–9: Building photo -->
        <figure class="lg:col-start-7 lg:col-span-3 lg:row-start-1 rounded-2xl sm:rounded-3xl overflow-hidden
                       bg-[#EAF0FF] dark:bg-[#0f1a36] ring-1 ring-black/5 dark:ring-white/10">
          <img :src="url(buildingImage)" alt="AANL main building"
               class="w-full h-40 sm:h-48 lg:h-full object-cover" loading="lazy" decoding="async" />
        </figure>

        <!-- Row 1, Col 10–12: 8 divisions -->
        <div class="lg:col-start-10 lg:col-span-3 lg:row-start-1">
          <div class="h-full rounded-2xl sm:rounded-3xl bg-[#EAF0FF] dark:bg-[#0f1a36]
                      ring-1 ring-black/5 dark:ring-white/10 p-6 sm:p-7 lg:p-8">
            <div class="text-[#1D50A2] text-4xl sm:text-5xl font-bold tracking-tight">8</div>
            <p class="mt-3 text-sm sm:text-base leading-6 text-gray-700 dark:text-gray-300">
              Scientific Divisions
            </p>
          </div>
        </div>

        <!-- Row 2, Col 1–3: 20+ collaborations -->
        <div class="lg:col-start-1 lg:col-span-3 lg:row-start-2">
          <div class="h-full rounded-2xl sm:rounded-3xl bg-[#EAF0FF] dark:bg-[#0f1a36]
                      ring-1 ring-black/5 dark:ring-white/10 p-6 sm:p-7 lg:p-8">
            <div class="text-[#1D50A2] text-4xl sm:text-5xl font-bold tracking-tight">20+</div>
            <p class="mt-3 text-sm sm:text-base leading-6 text-gray-700 dark:text-gray-300">
              National &amp; International Collaborations
            </p>
          </div>
        </div>

        <!-- Row 2, Col 4–6: Lab photo -->
        <figure class="lg:col-start-4 lg:col-span-3 lg:row-start-2 rounded-2xl sm:rounded-3xl overflow-hidden
                       bg-[#EAF0FF] dark:bg-[#0f1a36] ring-1 ring-black/5 dark:ring-white/10">
          <img :src="url(labImage)" alt="Team in the lab"
               class="w-full h-40 sm:h-48 lg:h-full object-cover" loading="lazy" decoding="async" />
        </figure>

        <!-- Row 2, Col 7–12 (span 6): 1,000+ annually -->
        <div class="lg:col-start-7 lg:col-span-6 lg:row-start-2">
          <div class="h-full rounded-2xl sm:rounded-3xl bg-[#EAF0FF] dark:bg-[#0f1a36]
                      ring-1 ring-black/5 dark:ring-white/10 p-6 sm:p-7 lg:p-8
                      flex flex-col justify-between">
            <div class="text-[#1D50A2] text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
              1,000+ annually
            </div>
            <p class="mt-3 text-sm sm:text-base leading-6 text-gray-700 dark:text-gray-300">
              Students &amp; Researchers Trained
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
