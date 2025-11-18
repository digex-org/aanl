<!-- components/history/HistoryOverviewArticle.vue -->
<script setup lang="ts">
import { computed } from 'vue'
import AppBreadcrumbs from '~/components/ui/AppBreadcrumbs.vue'
import type { Crumb } from '~/composables/useBreadcrumbs'

type HistoryBlock =
  | { type: 'text'; content: string }
  | { type: 'image'; image: string; alt?: string }
  | { type: 'imageRow'; images: { image: string; alt?: string }[] }

const props = withDefaults(defineProps<{
  heroTitle?: string
  /** Hero background image, file name in ~/assets/images/history/* */
  heroImageFile?: string
  /** Breadcrumb items shown above the hero */
  breadcrumbs?: Crumb[]
}>(), {
  heroTitle: 'History',
  heroImageFile: 'history-hero.webp',
  breadcrumbs: () => []
})

const blocks: HistoryBlock[] = [
  {
    type: 'text',
    content: `Yerevan Physics Institute (YerPhI) was founded by eminent physicists Abraham and Artem Alikhanyan. The study of cosmic rays and the construction of two cosmic-ray stations on Mount Aragats laid the groundwork for the Institute’s establishment.`
  },
  {
    type: 'image',
    image: 'history-1962.webp',
    alt: 'Early researchers at YerPhI laboratory'
  },
  {
    type: 'text',
    content: `The Institute once operated under the authority of the State Atomic Energy Committee of the Soviet Union. After the collapse of the Soviet Union in 1992, YerPhI was transferred to the jurisdiction of the Ministry of Industry and Trade of the Republic of Armenia.`
  },
  {
    type: 'imageRow',
    images: [
      { image: 'history-1970.webp', alt: 'Group photo of scientists' },
      { image: 'history-1980.webp', alt: 'Historic YerPhI building' }
    ]
  },
  {
    type: 'text',
    content: `An important milestone was the construction of a 6 GeV electron synchrotron, completed in 1967 and becoming the first particle accelerator in Armenia. In the 1970s–1990s, a broad program of experiments was carried out, including studies of hadronic processes, structure of nucleon resonances, and properties of nuclear matter.`
  },
  {
    type: 'image',
    image: 'history-2002.webp',
    alt: 'Interior of accelerator hall'
  },
  {
    type: 'text',
    content: `Another notable development was the Imaging Atmospheric Cherenkov Observatories (IACT), designed at YerPhI in the mid-1980s for high-energy gamma-ray astrophysics. These technologies were successfully applied in international collaborations and later used in MAGIC and H.E.S.S. experiments.`
  },
  {
    type: 'imageRow',
    images: [
      { image: 'history-2011.webp', alt: 'Historic facade' },
      { image: 'history-2002.webp', alt: 'Conceptual illustration of detectors' }
    ]
  },
  {
    type: 'text',
    content: `Since 2002, the Institute has been named after Artem Alikhanyan, and in 2011 it was reorganized into the “A. I. Alikhanyan National Science Laboratory (YerPhI)” Foundation.`
  },
  {
    type: 'image',
    image: 'history-2011.webp',
    alt: 'Modern entrance of A. I. Alikhanyan National Science Laboratory'
  },
  {
    type: 'text',
    content: `Today, AANL scientists are actively engaged in high-energy physics experiments at major international facilities, as well as in nuclear physics, cosmic-ray physics, astrophysics, detector development, data acquisition systems, and modern scientific computing. The Laboratory remains a leading research center with publications in high-impact journals and strong participation in global collaborations.`
  }
]

/* ---------- SSR-safe local images (hero + article) ---------- */
const imageMods = import.meta.glob('~/assets/images/about/history/*', {
  eager: true,
  import: 'default'
}) as Record<string, string>

const imageByFile = Object.fromEntries(
  Object.entries(imageMods).map(([p, u]) => [p.split('/').pop()!, u])
)

function imgSrc(file: string): string {
  return imageByFile[file] || file
}

const heroSrc = computed(() => imgSrc(props.heroImageFile))
</script>

<template>
  <section class="dark:bg-gray-950">
    <!-- Breadcrumbs row (above hero) -->
    <div class="mx-auto max-w-7xl px-4 pt-4 sm:px-6 lg:px-8">
      <AppBreadcrumbs
        v-if="breadcrumbs?.length"
        :items="breadcrumbs"
      />
    </div>

    <!-- Hero banner -->
    <div class="relative  mt-4 isolate overflow-hidden rounded-xl bg-gray-900">
      <img
        :src="heroSrc"
        :alt="heroTitle"
        class="w-full h-[500px] sm:h-5380px] lg:h-[580px] object-cover"
        loading="eager"
        decoding="async"
        fetchpriority="high"
      />

      <!-- Gradient overlay -->
      <div
        class="pointer-events-none absolute inset-0
               bg-[linear-gradient(180deg,rgba(0,0,0,0.55),rgba(0,0,0,0.35))]"
      />

      <!-- Title only (bottom-left) -->
      <div class="absolute inset-0 mb-50">
        <div class="mx-auto flex h-full max-w-7xl items-end px-4 pb-6 sm:px-6 sm:pb-8 lg:px-8">
          <h1 class="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
            {{ heroTitle }}
          </h1>
        </div>
      </div>
    </div>

    <!-- Overlapping white article card -->
    <div class="relative">
      <article
        class="mx-auto max-w-3xl lg:max-w-4xl -mt-10 sm:-mt-14 lg:-mt-16
               relative z-10
               rounded-3xl bg-white dark:bg-gray-900
               shadow-xl ring-1 ring-black/5 dark:ring-white/10
               px-4 sm:px-8 lg:px-10 py-6 sm:py-8 lg:py-10"
      >
        <!-- Title -->
        <header class="mb-4 sm:mb-6">
          <h2 class="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-white">
            Historical overview
          </h2>
        </header>

        <!-- Content blocks -->
        <div
          class="space-y-6 sm:space-y-7 lg:space-y-8
                 text-sm sm:text-[15px] leading-relaxed
                 text-gray-700 dark:text-gray-200"
        >
          <template v-for="(block, index) in blocks" :key="index">
            <!-- Text paragraph -->
            <p v-if="block.type === 'text'">
              {{ block.content }}
            </p>

            <!-- Single full-width image -->
            <div
              v-else-if="block.type === 'image'"
              class="overflow-hidden rounded-2xl bg-gray-100 dark:bg-gray-800"
            >
              <img
                :src="imgSrc(block.image)"
                :alt="block.alt || 'History image'"
                class="w-full h-auto object-cover"
                loading="lazy"
                decoding="async"
              />
            </div>

            <!-- Two-column image row -->
            <div
              v-else-if="block.type === 'imageRow'"
              class="grid grid-cols-1 gap-4 sm:grid-cols-2"
            >
              <div
                v-for="img in block.images"
                :key="img.image"
                class="overflow-hidden rounded-2xl bg-gray-100 dark:bg-gray-800"
              >
                <img
                  :src="imgSrc(img.image)"
                  :alt="img.alt || 'History image'"
                  class="w-full h-auto object-cover"
                  loading="lazy"
                  decoding="async"
                />
              </div>
            </div>
          </template>
        </div>
      </article>
    </div>
  </section>
</template>
