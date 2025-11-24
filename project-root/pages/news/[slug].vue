<!-- pages/news/[slug].vue -->
<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useHead, useI18n } from '#imports'

import { getNewsBySlug, getAllNews, type NewsItem } from '~/data/news'
import AppBreadcrumbs from '~/components/ui/AppBreadcrumbs.vue'
import NewsCard from '~/components/news/NewsCard.vue'
import type { Crumb } from '~/composables/useBreadcrumbs'

const route = useRoute()
const slug = computed(() => String(route.params.slug || ''))

const { t, locale } = useI18n()

/* ---------- Current item & all news ---------- */
const item = computed<NewsItem | undefined>(() => getNewsBySlug(slug.value))
const allNews = computed(() => getAllNews())

// Simple related list – 4 other recent news
const related = computed<NewsItem[]>(() =>
  allNews.value.filter(n => n.slug !== slug.value).slice(0, 4)
)

/* ---------- i18n-aware title & body ---------- */
/**
 * Uses news.items.<slug>.title / body if present in locales,
 * falls back to the static data from /data/news.ts.
 */
const newsTitle = computed(() => {
  if (!item.value) return ''
  const key = `news.items.${item.value.slug}.title`
  const translated = t(key)
  return translated === key ? item.value.title : translated
})

const newsBody = computed(() => {
  if (!item.value) return ''
  const key = `news.items.${item.value.slug}.body`
  const translated = t(key)
  return translated === key ? item.value.body : translated
})

/* ---------- Date formatting (locale-aware) ---------- */
function formatDate(iso: string): string {
  const d = new Date(iso)
  const loc = locale.value === 'hy' ? 'hy-AM' : 'en-US'

  try {
    return d.toLocaleDateString(loc, {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric'
    })
  } catch {
    // Fallback if locale is somehow invalid
    return d.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric'
    })
  }
}

/* ---------- Body paragraphs ---------- */   
const paragraphs = computed(() =>
  (newsBody.value || '').split(/\n{2,}/g)
)

/* ---------- Breadcrumbs (i18n-aware) ---------- */
const crumbs = computed<Crumb[]>(() => [
  { label: t('nav.top.home'), to: '/' },
  { label: t('news.page.breadcrumbTitle'), to: '/news' },
  { label: newsTitle.value || t('news.detail.fallbackTitle') }
])

/* ---------- SEO ---------- */
useHead(() => ({
  title: item.value
    ? `${newsTitle.value} — ${t('news.page.title')} — AANL`
    : t('news.detail.metaFallbackTitle')
}))

/* ---------- Cover images ---------- */
const coverMods = import.meta.glob('~/assets/images/news/*', {
  eager: true,
  import: 'default'
}) as Record<string, string>

const coverByFile = Object.fromEntries(
  Object.entries(coverMods).map(([p, u]) => [p.split('/').pop()!, u])
)

function imgSrc(file: string): string {
  return coverByFile[file] || file
}
</script>

<template>
  <div v-if="item" class="dark:bg-gray-950 min-h-screen">
    <!-- Hero image + breadcrumbs -->
    <section>
      <div class="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 pt-6 sm:pt-8">
        <AppBreadcrumbs :items="crumbs" />
      </div>

      <div class="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
        <div class="overflow-hidden rounded-xl shadow-lg ring-1 ring-black/5">
          <img
            :src="imgSrc(item.coverImage)"
            :alt="newsTitle"
            class="w-full h-[260px] sm:h-80 lg:h-[380px] object-cover"
            loading="eager"
            decoding="async"
            fetchpriority="high"
          />
        </div>
      </div>
    </section>

    <!-- Article body -->
    <main class="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 pb-12">
      <article
        class="mx-auto max-w-3xl lg:max-w-4xl -mt-10 sm:-mt-14 lg:-mt-16
               relative z-10
               rounded-3xl bg-white dark:bg-gray-900
               shadow-xl ring-1 ring-black/5 dark:ring-white/10
               px-4 sm:px-8 lg:px-10 py-6 sm:py-8 lg:py-10"
      >
        <p class="text-[11px] uppercase tracking-wide text-gray-500">
          {{ formatDate(item.date) }}
        </p>

        <h1
          class="mt-1 text-2xl sm:text-3xl lg:text-[32px] font-semibold text-gray-900 dark:text-white"
        >
          {{ newsTitle }}
        </h1>

        <div
          class="mt-4 space-y-4 text-sm sm:text-[15px] leading-relaxed text-gray-700 dark:text-gray-200"
        >
          <p v-for="(p, idx) in paragraphs" :key="idx">
            {{ p }}
          </p>
        </div>

        <!-- Small related grid under the article (optional) -->
        <div class="mt-6">
          <div class="grid grid-cols-1 p-6 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <NewsCard
              v-for="n in related"
              :key="n.id"
              :item="n"
              :image-src="imgSrc(n.coverImage)"
              :show-excerpt="false"
            />
          </div>
        </div>

        <!-- Share icons -->
        <div class="mt-6 flex items-center gap-3 text-[#1D50A2]">
          <span class="text-sm text-gray-500">
            {{ t('news.detail.shareLabel') }}
          </span>
          <button class="size-8 rounded-full bg-gray-100 flex items-center justify-center">
            f
          </button>
          <button class="size-8 rounded-full bg-gray-100 flex items-center justify-center">
            in
          </button>
          <button class="size-8 rounded-full bg-gray-100 flex items-center justify-center">
            ▶
          </button>
        </div>
      </article>

      <!-- Dark band: Upcoming events + related topics -->
      <section class="bg-[#0B1843] mt-10 border rounded-xl border-white/10">
        <!-- Upcoming events (themed variant, i18n title from events.section.title) -->
        <SectionsUpcomingEvents
          :title="t('events.section.title')"
          section-bg-class="bg-[#0B1843] border rounded-xl"
          title-class="text-white"
          all-button-class="
            text-white border rounded-xl border-white/40 px-4 py-1.5
            bg-[#0B1843] hover:bg-[#1D50A2] hover:text-white
            focus-visible:ring-orange-500
          "
        />

        <!-- Related topics / news -->
        <div class="mt-6 mb-8">
          <h2
            class="text-2xl p-6 sm:text-3xl font-bold text-white tracking-tight"
          >
            <span
              class="relative inline-block
                after:content-[''] after:block after:h-[3px]
                after:bg-current after:rounded-full after:mt-2"
            >
              {{ t('news.detail.relatedTitle') }}
            </span>
          </h2>
          <div class="grid grid-cols-1 p-6 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <NewsCard
              v-for="n in related"
              :key="n.id"
              :item="n"
              :image-src="imgSrc(n.coverImage)"
              :show-excerpt="false"
            />
          </div>
        </div>
      </section>
    </main>
  </div>

  <!-- Fallback if slug not found -->
  <div v-else class="mx-auto max-w-3xl px-4 py-16 text-center dark:bg-gray-950">
    <h1 class="text-2xl font-semibold text-gray-900 dark:text-white">
      {{ t('news.detail.notFoundTitle') }}
    </h1>
    <p class="mt-2 text-sm text-gray-600 dark:text-gray-300">
      {{ t('news.detail.notFoundBody') }}
      <NuxtLink to="/news" class="text-[--brand-navy] hover:underline">
        {{ t('news.page.title') }}
      </NuxtLink>
      .
    </p>
  </div>
</template>
