<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from '#imports'

/**
 * Best practice:
 * - Keep images in /assets for bundling + hashing when used in code.
 * - We glob them (sorted) so you can just drop 8 files into /assets/images/division/.
 * - If you want fixed mapping by filename, pass `items` prop with { title, href, img }.
 */

const { t } = useI18n()

// (1) Auto-import all division images (webp/png/jpg)
const imageModules = import.meta.glob(
  '~/assets/images/divisions/*.{webp,png,jpg,jpeg}',
  { eager: true, import: 'default' }
) as Record<string, string>

// Sort for stable order (by filename)
const divisionImages = Object
  .entries(imageModules)
  .sort(([a], [b]) => a.localeCompare(b))
  .map(([, url]) => url)

// (2) Props
type DivisionItem = { title: string; href?: string; img?: string }

const props = withDefaults(defineProps<{
  /** Optional override – otherwise uses i18n: home.divisions.title */
  title?: string
  seeMoreHref?: string
  items?: DivisionItem[]
}>(), {
  seeMoreHref: '/divisions'
})

// i18n-aware section title + CTA labels
const sectionTitle = computed(() =>
  props.title ?? t('home.divisions.title')
)

const seeMoreLabel = computed(() =>
  t('home.divisions.seeMore')
)

const seeMoreAria = computed(() =>
  t('home.divisions.seeMoreAria')
)

// (3) Default items: titles from i18n, images by order
const defaultItems = computed<DivisionItem[]>(() => [
  { title: t('home.divisions.cards.experimentalPhysics') },
  { title: t('home.divisions.cards.theoreticalPhysics') },
  { title: t('home.divisions.cards.cosmologyAstrophysics') },
  { title: t('home.divisions.cards.quantumTechnologies') },
  { title: t('home.divisions.cards.cosmicRay') },
  { title: t('home.divisions.cards.computationalPhysics') },
  { title: t('home.divisions.cards.appliedPhysics') },
  { title: t('home.divisions.cards.isotopes') }
].map((it, i) => ({
  ...it,
  href: '/divisions',
  img: divisionImages[i]
})))

// Final items list (props override → fallback to defaults)
const items = computed<DivisionItem[]>(() => {
  if (props.items?.length) {
    return props.items.map((it, i) => ({
      ...it,
      img: it.img ?? divisionImages[i]
    }))
  }
  return defaultItems.value
})
</script>

<template>
  <section
    class="container dark:bg-gray-950"
    aria-labelledby="divisions-title"
  >
    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 sm:py-14 lg:py-20">
      <!-- Header -->
      <div class="flex items-center justify-between gap-4 mb-6 sm:mb-8">
        <h2
          id="divisions-title"
          class="inline-block text-2xl sm:text-3xl font-bold tracking-tight text-gray-900 dark:text-white
                 relative
                 after:content-[''] after:block after:h-[3px] after:bg-gray-900 after:rounded-full after:mt-2"
        >
          {{ sectionTitle }}
        </h2>
      </div>

      <!-- Grid -->
      <ul
        class="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5"
      >
        <li v-for="(div, idx) in items" :key="idx">
          <NuxtLink
            :to="div.href || '#'"
            class="group block h-full rounded-2xl border border-gray-200/70 dark:border-white/10
                   bg-white dark:bg-gray-900 p-3 sm:p-3.5
                   shadow-[0_1px_2px_rgba(0,0,0,0.04)] hover:shadow-lg
                   transition transform will-change-transform hover:-translate-y-0.5
                   focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1D50A2]"
          >
            <!-- Square thumbnail -->
            <div class="aspect-square overflow-hidden rounded-xl">
              <img
                :src="div.img"
                :alt="div.title"
                class="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                loading="lazy"
                decoding="async"
                :sizes="'(max-width: 1024px) 50vw, 25vw'"
              />
            </div>

            <!-- Title -->
            <h3 class="mt-2.5 text-sm sm:text-[15px] font-medium leading-snug text-gray-900 dark:text-gray-100">
              {{ div.title }}
            </h3>
          </NuxtLink>
        </li>
      </ul>

      <!-- Bottom-centered See More -->
      <div class="mt-8 flex justify-center">
        <NuxtLink
          :to="seeMoreHref"
          :aria-label="seeMoreAria"
          class="group inline-flex items-center justify-center gap-2
                 h-[50px] rounded-[130px] px-6
                 text-[15px] font-semibold
                 text-[#1D50A2] border-2 border-[#1D50A2]
                 shadow-[0_1px_2px_rgba(0,0,0,0.06)]
                 hover:bg-[#1D50A2] hover:text-white
                 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1D50A2] focus-visible:ring-offset-2
                 transition"
        >
          <span>{{ seeMoreLabel }}</span>
          <svg
            class="size-4 shrink-0 transition-transform duration-200 ease-out group-hover:translate-x-1"
            viewBox="0 0 20 20" fill="none" aria-hidden="true"
          >
            <path d="M4 10h10" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" />
            <path
              d="M10 5l5 5-5 5"
              stroke="currentColor"
              stroke-width="1.8"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </NuxtLink>
      </div>
    </div>
  </section>
</template>
