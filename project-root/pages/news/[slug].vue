<!-- pages/news/[slug].vue -->
<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useHead } from '#imports'

import { getNewsBySlug, getAllNews, type NewsItem } from '~/data/news'
import { useBreadcrumbs } from '~/composables/useBreadcrumbs'
import AppBreadcrumbs from '~/components/ui/AppBreadcrumbs.vue'
import NewsCard from '~/components/news/NewsCard.vue'

const route = useRoute()
const slug = computed(() => String(route.params.slug || ''))

const item = computed<NewsItem | undefined>(() => getNewsBySlug(slug.value))
const allNews = computed(() => getAllNews())

// Simple related list – 4 other recent news
const related = computed<NewsItem[]>(() =>
  allNews.value.filter(n => n.slug !== slug.value).slice(0, 4)
)

// cover images
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

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

// crude body split into paragraphs
const paragraphs = computed(() => (item.value?.body ?? '').split(/\n{2,}/g))

/** Breadcrumbs: Home › News › Current article */
const { crumbs, jsonLd } = useBreadcrumbs({
  segmentLabels: { news: 'News' },
  currentLabel: item.value?.title ?? null
})

useHead(() => ({
  title: item.value ? `${item.value.title} — News — AANL` : 'News — AANL',
  script: [
    {
      type: 'application/ld+json',
      children: JSON.stringify(jsonLd.value)
    }
  ]
}))
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
            :alt="item.title"
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
          {{ item.title }}
        </h1>

        <div
          class="mt-4 space-y-4 text-sm sm:text-[15px] leading-relaxed text-gray-700 dark:text-gray-200"
        >
          <p v-for="(p, idx) in paragraphs" :key="idx">
            {{ p }}
          </p>
        </div>

        <!-- Optional gallery (kept for future use) -->
        <div
        
          class="mt-6 grid   gap-4"
        >
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

        <!-- Share icons (placeholder) -->
        <div class="mt-6 flex items-center gap-3 text-[#1D50A2]">
          <span class="text-sm text-gray-500">Share</span>
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
        <!-- Upcoming events (themed variant) -->
        <SectionsUpcomingEvents
          section-bg-class="bg-[#0B1843] border rounded-xl"
          title-class="text-white"
          all-button-class="
            text-white border rounded-xl border-white/40 px-4 py-1.5
            bg-[#0B1843] hover:bg-[#1D50A2] hover:text-white
            focus-visible:ring-orange-500
          "
        />

        <!-- Related topics / news (using NewsCard) -->
        <div class="mt-6 mb-8">
          <h2
            id="events-title"
            class="text-2xl p-6 sm:text-3xl  font-bold text-white tracking-tight"
          >
            <span
              class="relative inline-block
                after:content-[''] after:block after:h-[3px]
                after:bg-current after:rounded-full after:mt-2"
            >
              Related topics
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
  <div v-else class="mx-auto max-w-3xl px-4 py-16 text-center">
    <h1 class="text-2xl font-semibold">News item not found</h1>
    <p class="mt-2 text-gray-600">
      Please check the URL or return to the
      <NuxtLink to="/news" class="text-[--brand-navy] hover:underline">
        News
      </NuxtLink>
      page.
    </p>
  </div>
</template>
