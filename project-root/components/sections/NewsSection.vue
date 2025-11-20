<script setup lang="ts">
import { ref, computed } from 'vue'

type NewsItem = {
  id: string | number
  title: string
  href?: string
  date: string      // ISO date
  excerpt?: string
  image?: string    // filename only, e.g. "news-fetured-img.webp"
}

/* ===== Resolve images from assets/images/news =====
   We import every file eagerly and map by its filename.
   Then use img('filename.webp') to get the built URL.
*/
const newsImages = import.meta.glob('~/assets/images/news/*.{webp,png,jpg,jpeg}', {
  eager: true,
  import: 'default'
}) as Record<string, string>

const imageByName: Record<string, string> = Object.fromEntries(
  Object.entries(newsImages).map(([path, url]) => [path.split('/').pop()!, url])
)

function img(name?: string) {
  return name ? (imageByName[name] ?? '') : ''
}

/* ===== Props ===== */
const props = withDefaults(defineProps<{
  title?: string
  allHref?: string
  items?: NewsItem[]
}>(), {
  title: 'News',
  allHref: '/news'
})

/** Demo data (replace by passing :items from API/CMS).
 *  IMPORTANT: use filenames only in `image`.
 */
const demo: NewsItem[] = [
  {
    id: 1,
    title: 'Evolving Universe: Theory And Observations Starobinsky Memorial Conference October',
    date: '2024-05-31',
    image: 'news-fetured-img.webp',
    href: '/news/11-february-international-day-of-women-and-girls-in-science',
    excerpt: 'A multi-day conference on cosmology, gravity and inflationary theory.'
  },
  {
    id: 2,
    title: 'The first release of lares–2 space experiment results on testing fundamental physics',
    date: '2023-12-22',
    image: 'Gurzadyan_Cosmo 1.webp',
    href: '/news/11-february-international-day-of-women-and-girls-in-science',
    excerpt: 'Early analysis confirms measurement stability and improved sensitivity.'
  },
  {
    id: 3,
    title: '75th anniversary of prof. Norayr Akopov',
    date: '2023-12-22',
    image: 'akopovbd 1.webp',
    href: '/news/international-conference-on-particle-physics-and-cosmology',
    excerpt: 'A commemorative event honoring contributions to particle physics.'
  },
  {
    id: 4,
    title: 'International Conference on Particle Physics and Cosmology dedicated to Prof. Rubakov memory',
    date: '2023-12-22',
    image: 'rubakov 1.webp',
    href: '/news/rubakov-library-article',
    excerpt: 'Leading researchers discussed novel directions in early-universe physics.'
  }
]

const list = computed<NewsItem[]>(() => props.items?.length ? props.items : demo)
const featured = computed<NewsItem | null>(() => list.value[0] ?? null)
const secondary = computed<NewsItem[]>(() => list.value.slice(1, 4))

/** date formatter */
function fmt(d: string) {
  const f = new Date(d)
  return f.toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

/** Mobile slider controls */
const trackRef = ref<HTMLElement | null>(null)
function scrollByCard(dir: 1 | -1) {
  const el = trackRef.value
  if (!el) return
  el.scrollBy({ left: dir * Math.round(el.clientWidth * 0.9), behavior: 'smooth' })
}
</script>

<template>
  <section class="dark:bg-gray-950" aria-labelledby="news-title">
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
       <span class="mt-3 inline-block h-[3px]  rounded-full text-gray-900"></span>


        <NuxtLink
          :to="allHref"
          class="group inline-flex items-center gap-2 text-[#1D50A2] font-semibold text-sm"
        >
          <span>All News</span>
          <svg class="size-4 transition-transform group-hover:translate-x-1" viewBox="0 0 20 20" fill="none" aria-hidden="true">
            <path d="M4 10h10" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
            <path d="M10 5l5 5-5 5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </NuxtLink>
      </div>

      <!-- Desktop layout -->
      <div class="relative hidden lg:grid grid-cols-12 gap-6">
        <!-- Featured -->
        <article
          v-if="featured"
          class="col-span-6 rounded-3xl border border-gray-200/80 dark:border-white/10 bg-white dark:bg-gray-900
                 shadow-[0_1px_2px_rgba(0,0,0,0.06)] ring-1 ring-black/5 dark:ring-white/5"
        >
          <NuxtLink :to="featured.href || '#'" class="block p-5 sm:p-6">
            <figure class="overflow-hidden rounded-2xl">
              <img :src="img(featured.image)" :alt="featured.title"
                   class="w-full h-[340px] object-cover" loading="lazy" decoding="async" />
            </figure>

            <p class="mt-4 text-sm text-gray-500">{{ fmt(featured.date) }}</p>
            <h3 class="mt-1 text-[22px] leading-snug font-semibold text-gray-900 dark:text-gray-100">
              {{ featured.title }}
            </h3>
            <p v-if="featured.excerpt" class="mt-1.5 text-[15px] text-gray-700 dark:text-gray-300 line-clamp-3">
              {{ featured.excerpt }}
            </p>

            <span class="mt-3 inline-flex items-center gap-2 text-[#1D50A2] font-semibold text-sm">
              Read more
              <svg class="size-4" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                <path d="M4 10h10" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
                <path d="M10 5l5 5-5 5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </span>
          </NuxtLink>
        </article>

        <!-- Right column -->
        <div class="col-span-6 flex flex-col gap-4">
          <article
            v-for="n in secondary" :key="n.id"
            class="rounded-3xl border border-gray-200/80 dark:border-white/10 bg-white dark:bg-gray-900
                   shadow-[0_1px_2px_rgba(0,0,0,0.06)] ring-1 ring-black/5 dark:ring-white/5"
          >
            <NuxtLink :to="n.href || '#'" class="flex gap-4 p-4 sm:p-5">
              <figure class="relative w-[233px] shrink-0 overflow-hidden rounded-xl">
                <img :src="img(n.image)" :alt="n.title" class="size-full object-cover" loading="lazy" decoding="async" />
              </figure>

              <div class="min-w-0">
                <p class="text-xs text-gray-500">{{ fmt(n.date) }}</p>
                <h3 class="mt-1 text-[17px] leading-snug font-semibold text-gray-900 dark:text-gray-100">
                  {{ n.title }}
                </h3>
                <p v-if="n.excerpt" class="mt-1 text-sm text-gray-700 dark:text-gray-300 line-clamp-2">
                  {{ n.excerpt }}
                </p>

                <span class="mt-2 inline-flex items-center gap-1.5 text-[#1D50A2] font-semibold text-sm">
                  Read more
                  <svg class="size-4" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                    <path d="M4 10h10" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
                    <path d="M10 5l5 5-5 5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                </span>
              </div>
            </NuxtLink>
          </article>
        </div>
      </div>

      <!-- Mobile / Tablet: horizontal snap carousel -->
      <div class="relative lg:hidden">
        <div
          ref="trackRef"
          class="snap-x snap-mandatory overflow-x-auto -mx-4 px-4
                 flex gap-4"
          role="list"
          aria-label="Latest news"
        >
          <article
            v-for="n in list"
            :key="n.id"
            role="listitem"
            class="min-w-[86%] sm:min-w-[65%] snap-start
                   rounded-3xl border border-gray-200/80 dark:border-white/10 bg-white dark:bg-gray-900
                   shadow-[0_1px_2px_rgba(0,0,0,0.06)] ring-1 ring-black/5 dark:ring-white/5"
          >
            <NuxtLink :to="n.href || '#'" class="block p-4">
              <figure class="overflow-hidden rounded-2xl">
                <img :src="img(n.image)" :alt="n.title" class="w-full h-48 object-cover" loading="lazy" decoding="async" />
              </figure>
              <p class="mt-3 text-xs text-gray-500">{{ fmt(n.date) }}</p>
              <h3 class="mt-1 text-[17px] leading-snug font-semibold text-gray-900 dark:text-gray-100">
                {{ n.title }}
              </h3>
              <p v-if="n.excerpt" class="mt-1 text-sm text-gray-700 dark:text-gray-300 line-clamp-2">
                {{ n.excerpt }}
              </p>
              <span class="mt-2 inline-flex items-center gap-1.5 text-[#1D50A2] font-semibold text-sm">
                Read more
                <svg class="size-4" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                  <path d="M4 10h10" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
                  <path d="M10 5l5 5-5 5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </span>
            </NuxtLink>
          </article>
        </div>

        <!-- Prev / Next buttons -->
        <button
          type="button"
          @click="scrollByCard(-1)"
          aria-label="Previous"
          class="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2
                 size-10 rounded-full bg-white text-gray-800 shadow-md ring-1 ring-black/10
                 hover:bg-gray-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1D50A2]"
        >
          <!-- left arrow -->
          <svg class="mx-auto size-5" viewBox="0 0 20 20" fill="none" aria-hidden="true">
            <path d="M12 5l-5 5 5 5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>

        <button
          type="button"
          @click="scrollByCard(1)"
          aria-label="Next"
          class="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2
                 size-10 rounded-full bg-white text-gray-800 shadow-md ring-1 ring-black/10
                 hover:bg-gray-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1D50A2]"
        >
          <!-- right arrow -->
          <svg class="mx-auto size-5" viewBox="0 0 20 20" fill="none" aria-hidden="true">
            <path d="M8 5l5 5-5 5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>
      </div>
    </div>
  </section>
</template>
