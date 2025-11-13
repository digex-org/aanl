<script setup lang="ts">
/**
 * Best practice:
 * - Keep images in /assets for bundling + hashing when used in code.
 * - We glob them (sorted) so you can just drop 8 files into /assets/images/division/.
 * - If you want fixed mapping by filename, pass `items` prop with { title, href, img }.
 */

// (1) Auto-import all division images (webp/png/jpg)
const imageModules = import.meta.glob(
  '~/assets/images/division/*.{webp,png,jpg,jpeg}',
  { eager: true, import: 'default' }
) as Record<string, string>

// Sort for stable order (by filename)
const divisionImages = Object
  .entries(imageModules)
  .sort(([a], [b]) => a.localeCompare(b))
  .map(([, url]) => url)

// (2) Reusable prop if you want dynamic data (CMS/API)
type DivisionItem = { title: string; href?: string; img?: string }
const props = withDefaults(defineProps<{
  title?: string
  seeMoreHref?: string
  items?: DivisionItem[]
}>(), {
  title: 'Divisions',
  seeMoreHref: '/divisions',
})

// (3) Default demo items (titles) mapped to your 8 images by order
const defaultItems: DivisionItem[] = [
  { title: 'Experimental physics division' },
  { title: 'Matinyan center for theoretical physics' },
  { title: 'Center for cosmology and astrophysics' },
  { title: 'Division for Quantum Technologies' },
  { title: 'Cosmic ray division' },
  { title: 'Computational physics and IT division' },
  { title: 'Applied physics research division' },
  { title: 'Isotopes research and production division' },
].map((it, i) => ({ ...it, href: '/divisions', img: divisionImages[i] }))

const items = computed<DivisionItem[]>(() => {
  if (props.items?.length) return props.items.map((it, i) => ({
    ...it,
    img: it.img ?? divisionImages[i],
  }))
  return defaultItems
})
</script>

<template>
  <section class="container dark:bg-gray-950" aria-labelledby="divisions-title">
    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 sm:py-14 lg:py-20">
      <!-- Header -->
      <div class="flex items-center justify-between gap-4 mb-6 sm:mb-8">
        <h2
            id="contact-title"
            class="inline-block text-2xl sm:text-3xl font-bold tracking-tight text-gray-900 dark:text-white
                relative
                after:content-[''] after:block after:h-[3px] after:bg-gray-900 after:rounded-full after:mt-2"
        >
            {{ title }}
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
         <!-- optional See More (desktop) -->
        <!-- Bottom-centered See More -->
        <div class="mt-8 flex justify-center">
        <NuxtLink
            :to="seeMoreHref"
            aria-label="See more divisions"
            class="group inline-flex items-center justify-center gap-2
                h-[50px] rounded-[130px] px-6
                text-[15px] font-semibold
                text-[#1D50A2] border-2 border-[#1D50A2]
                shadow-[0_1px_2px_rgba(0,0,0,0.06)]
                hover:bg-[#1D50A2] hover:text-white
                focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1D50A2] focus-visible:ring-offset-2
                transition"
        >
            <span>See More</span>
            <svg
            class="size-4 shrink-0 transition-transform duration-200 ease-out group-hover:translate-x-1"
            viewBox="0 0 20 20" fill="none" aria-hidden="true"
            >
            <path d="M4 10h10" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
            <path d="M10 5l5 5-5 5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
        </NuxtLink>
        </div>


    </div>
  </section>
</template>
