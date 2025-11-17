<!-- pages/news/index.vue -->
<script setup lang="ts">
import { computed, ref } from 'vue'
import { useHead } from '#imports'
import { getAllNews, type NewsItem } from '~/data/news'

import NewsFilterBar from '~/components/news/NewsFilterBar.vue'
import NewsHeroSlider from '~/components/news/NewsHeroSlider.vue'
import NewsCard from '~/components/news/NewsCard.vue'

useHead({ title: 'News — AANL' })

/* ---------- Raw data ---------- */
const allNews = computed<NewsItem[]>(() => getAllNews())

/* ---------- Filters (driven by NewsFilterBar) ---------- */
const categories = [
  'Conference',
  'Education',
  'Events',
  'Partners',
  'Research',
  'Science',
  'Library',
  'International relations'
] as const

type Category = (typeof categories)[number]

const search = ref('')
const selectedType = ref<'News'>('News') // reserved for future extension
const selectedCategory = ref<'all' | Category>('all')

/* ---------- Filtering ---------- */
const filtered = computed<NewsItem[]>(() => {
  const q = search.value.trim().toLowerCase()

  return allNews.value.filter((n) => {
    const matchesCategory =
      selectedCategory.value === 'all' || n.category === selectedCategory.value

    const matchesSearch =
      !q ||
      n.title.toLowerCase().includes(q) ||
      n.excerpt.toLowerCase().includes(q)

    // selectedType is only "News" for now – kept for future use
    return matchesCategory && matchesSearch
  })
})

const hasNews = computed(() => filtered.value.length > 0)

/* ---------- Layout slices (all derived from filtered) ---------- */
const HERO_COUNT = 5

const heroNews = computed<NewsItem[]>(() =>
  filtered.value.slice(0, HERO_COUNT)
)

/**
 * All remaining news AFTER the hero items.
 * If you want ALL news (including heroes) in the grid, just change to:
 *   filtered.value
 */
const gridNews = computed<NewsItem[]>(() =>
  filtered.value.slice()
)

/* ---------- Image helper for cards ---------- */
const coverMods = import.meta.glob('~/assets/images/news/*', {
  eager: true,
  import: 'default'
}) as Record<string, string>

const coverByFile = Object.fromEntries(
  Object.entries(coverMods).map(([p, u]) => [p.split('/').pop()!, u])
)

function coverSrc(file: string): string {
  return coverByFile[file] || file
}

/* ---------- Date formatting helper (for future use if needed) ---------- */
function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

/* ---------- Filter bar hooks (optional for now) ---------- */
function onApply() {
  // Filtering is already reactive – later you can add analytics / scroll-to-top here
}

function onOpenDate() {
  // Hook for future date picker
}
</script>

<template>
  <div class="min-h-screen text-gray-900 dark:bg-gray-950">
    <!-- Page title -->
    <header class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-8 sm:pt-10 pb-4">
      <h1 class="text-3xl sm:text-4xl font-extrabold tracking-tight">
        News
      </h1>
    </header>

    <!-- Filter bar -->
    <section class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <NewsFilterBar
        v-model:search="search"
        v-model:type="selectedType"
        v-model:category="selectedCategory"
        :categories="categories"
        @apply="onApply"
        @open-date="onOpenDate"
      />
    </section>

    <main class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-6 pb-12">
      <!-- Hero slider -->
      <section v-if="hasNews" class="grid grid-cols-1 gap-6">
        <div>
          <NewsHeroSlider :items="heroNews" />
        </div>
      </section>

      <!-- Remaining news grid (everything after the hero items) -->
      <section
        v-if="gridNews.length"
        class="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
      >
        <NewsCard
          v-for="n in gridNews"
          :key="n.id"
          :item="n"
          :image-src="coverSrc(n.coverImage)"
        />
      </section>

      <!-- Upcoming events block (Nuxt will auto-import SectionsUpcomingEvents) -->
      <SectionsUpcomingEvents
        class="mt-12"
        all-href="/events"
      />

      <!-- Empty state -->
      <div
        v-if="!hasNews"
        class="mt-10 text-center text-sm text-white/70"
      >
        No news found for this filter.
      </div>
    </main>
  </div>
</template>
