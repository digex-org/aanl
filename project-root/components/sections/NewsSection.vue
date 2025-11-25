<script setup lang="ts">
import { ref, computed } from 'vue'
import { useI18n } from '#imports'
import { getAllNews, type NewsItem } from '~/data/news'

/**
 * Props:
 * - title: optional override for section title (otherwise use i18n)
 * - allHref: "All news" link
 * - items: optional override list (otherwise use getAllNews())
 * - maxItems: how many items to show at most
 */
const props = withDefaults(defineProps<{
  title?: string
  allHref?: string
  items?: NewsItem[]
  maxItems?: number
}>(), {
  allHref: '/news',
  maxItems: 8
})

const { t, locale } = useI18n()

/* ===== Image resolution from assets/images/news ===== */
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

/* ===== Helper: safe translate with fallback ===== */
function tr(key: string, fallback: string) {
  const translated = t(key)
  return translated === key ? fallback : translated
}

/* ===== i18n-aware section title & labels ===== */
const sectionTitle = computed(() =>
  props.title ?? t('news.page.title') // "News" / "Նորություններ"
)

const allNewsLabel = computed(() =>
  tr('news.section.all', 'All news')
)

const readMoreLabel = computed(() =>
  tr('news.section.readMore', 'Read more')
)

/* ===== Load news (from data/news.ts) ===== */
const rawList = computed<NewsItem[]>(() =>
  props.items?.length ? props.items : getAllNews()
)

/** Apply maxItems limit for section */
const list = computed<NewsItem[]>(() => {
  const arr = rawList.value
  if (props.maxItems && props.maxItems > 0) {
    return arr.slice(0, props.maxItems)
  }
  return arr
})

/** Featured + right column items */
const featured = computed<NewsItem | null>(() => list.value[0] ?? null)
const secondary = computed<NewsItem[]>(() => list.value.slice(1, 4))

/* ===== i18n-aware title & excerpt per news item ===== */
/**
 * Expects:
 *   news.items.<slug>.title
 *   news.items.<slug>.excerpt   (optional)
 * in your en/hy/news.json
 */
function newsTitle(item: NewsItem) {
  const key = `news.items.${item.slug}.title`
  const translated = t(key)
  return translated === key ? item.title : translated
}

function newsExcerpt(item: NewsItem) {
  const key = `news.items.${item.slug}.excerpt`
  const translated = t(key)
  if (translated !== key) return translated
  return item.excerpt ?? ''
}

/* ===== Localized date formatter ===== */
function fmt(date: string) {
  const d = new Date(date)
  const loc = locale.value === 'hy' ? 'hy-AM' : 'en-US'

  try {
    return d.toLocaleDateString(loc, {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric'
    })
  } catch {
    // robust fallback
    return d.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric'
    })
  }
}

/* ===== Mobile slider controls ===== */
const trackRef = ref<HTMLElement | null>(null)

function scrollByCard(dir: 1 | -1) {
  const el = trackRef.value
  if (!el) return
  el.scrollBy({
    left: dir * Math.round(el.clientWidth * 0.9),
    behavior: 'smooth'
  })
}
</script>

<template>
  <section class="dark:bg-gray-950" aria-labelledby="news-title">
    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 sm:py-14 lg:py-20">
      <!-- Header -->
      <div class="mb-6 sm:mb-8 flex items-center justify-between">
        <h2
          id="news-title"
          class="inline-block text-2xl sm:text-3xl font-bold tracking-tight text-gray-900 dark:text-white
                 relative
                 after:content-[''] after:block after:h-[3px] after:bg-gray-900 after:rounded-full after:mt-2"
        >
          {{ sectionTitle }}
        </h2>

        <NuxtLink
          :to="allHref"
          class="group inline-flex items-center gap-2 text-[#1D50A2] font-semibold text-sm"
        >
          <span>{{ allNewsLabel }}</span>
          <svg
            width="26"
            height="15"
            viewBox="0 0 26 15"
            fill="none"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            class="shrink-0"
          >
            <path
              d="M25.7071 8.07112C26.0976 7.6806 26.0976 7.04743 25.7071 6.65691L19.3431 0.292946C18.9526 -0.0975785 18.3195 -0.0975785 17.9289 0.292946C17.5384 0.68347 17.5384 1.31664 17.9289 1.70716L23.5858 7.36401L17.9289 13.0209C17.5384 13.4114 17.5384 14.0446 17.9289 14.4351C18.3195 14.8256 18.9526 14.8256 19.3431 14.4351L25.7071 8.07112ZM0 8.36401L25 8.36401V6.36401L0 6.36401L0 8.36401Z"
              fill="currentColor"
            />
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
          <NuxtLink :to="`/news/${featured.slug}`" class="block p-5 sm:p-6">
            <figure class="overflow-hidden rounded-2xl">
              <img
                :src="img(featured.coverImage)"
                :alt="newsTitle(featured)"
                class="w-full h-[340px] object-cover"
                loading="lazy"
                decoding="async"
              />
            </figure>

            <p class="mt-4 text-sm text-gray-500">
              {{ fmt(featured.date) }}
            </p>
            <h3 class="mt-1 text-[22px] leading-snug font-semibold text-gray-900 dark:text-gray-100">
              {{ newsTitle(featured) }}
            </h3>
            <p
              v-if="newsExcerpt(featured)"
              class="mt-1.5 text-[15px] text-gray-700 dark:text-gray-300 line-clamp-3"
            >
              {{ newsExcerpt(featured) }}
            </p>

            <span class="mt-3 inline-flex items-center gap-2 text-[#1D50A2] font-semibold text-sm">
              {{ readMoreLabel }}
              <svg class="size-4" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                <path d="M4 10h10" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" />
                <path d="M10 5l5 5-5 5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
            </span>
          </NuxtLink>
        </article>

        <!-- Right column: 3 secondary items -->
        <div class="col-span-6 flex flex-col gap-4">
          <article
            v-for="n in secondary"
            :key="n.id"
            class="rounded-3xl border border-gray-200/80 dark:border-white/10 bg-white dark:bg-gray-900
                   shadow-[0_1px_2px_rgba(0,0,0,0.06)] ring-1 ring-black/5 dark:ring-white/5"
          >
            <NuxtLink :to="`/news/${n.slug}`" class="flex gap-4 p-4 sm:p-5">
              <figure class="relative w-[233px] shrink-0 overflow-hidden rounded-xl">
                <img
                  :src="img(n.coverImage)"
                  :alt="newsTitle(n)"
                  class="size-full object-cover"
                  loading="lazy"
                  decoding="async"
                />
              </figure>

              <div class="min-w-0">
                <p class="text-xs text-gray-500">
                  {{ fmt(n.date) }}
                </p>
                <h3 class="mt-1 text-[17px] leading-snug font-semibold text-gray-900 dark:text-gray-100">
                  {{ newsTitle(n) }}
                </h3>
                <p
                  v-if="newsExcerpt(n)"
                  class="mt-1 text-sm text-gray-700 dark:text-gray-300 line-clamp-2"
                >
                  {{ newsExcerpt(n) }}
                </p>

                <span class="mt-2 inline-flex items-center gap-1.5 text-[#1D50A2] font-semibold text-sm">
                  {{ readMoreLabel }}
                  <svg class="size-4" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                    <path d="M4 10h10" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" />
                    <path d="M10 5l5 5-5 5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" />
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
          class="snap-x snap-mandatory overflow-x-auto -mx-4 px-4 flex gap-4"
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
            <NuxtLink :to="`/news/${n.slug}`" class="block p-4">
              <figure class="overflow-hidden rounded-2xl">
                <img
                  :src="img(n.coverImage)"
                  :alt="newsTitle(n)"
                  class="w-full h-48 object-cover"
                  loading="lazy"
                  decoding="async"
                />
              </figure>

              <p class="mt-3 text-xs text-gray-500">
                {{ fmt(n.date) }}
              </p>
              <h3 class="mt-1 text-[17px] leading-snug font-semibold text-gray-900 dark:text-gray-100">
                {{ newsTitle(n) }}
              </h3>
              <p
                v-if="newsExcerpt(n)"
                class="mt-1 text-sm text-gray-700 dark:text-gray-300 line-clamp-2"
              >
                {{ newsExcerpt(n) }}
              </p>
              <span class="mt-2 inline-flex items-center gap-1.5 text-[#1D50A2] font-semibold text-sm">
                {{ readMoreLabel }}
                <svg class="size-4" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                  <path d="M4 10h10" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" />
                  <path d="M10 5l5 5-5 5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" />
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
          <svg class="mx-auto size-5" viewBox="0 0 20 20" fill="none" aria-hidden="true">
            <path d="M12 5l-5 5 5 5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" />
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
          <svg class="mx-auto size-5" viewBox="0 0 20 20" fill="none" aria-hidden="true">
            <path d="M8 5l5 5-5 5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
        </button>
      </div>
    </div>
  </section>
</template>
