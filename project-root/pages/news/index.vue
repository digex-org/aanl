<!-- pages/news/index.vue -->
<script setup lang="ts">
import { computed, ref } from 'vue'
import { useHead } from '#imports'

import { divisions } from '~/data/divisions'
import {
  getAllNews,
  type NewsItem
} from '~/data/news'

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
/**
 * selectedType here is effectively "division filter":
 * - "all"       → all divisions
 * - divisionSlug → only that division’s news
 */
const selectedType = ref<string>('all')
const selectedCategory = ref<'all' | Category>('all')

/**
 * Type options for the global news page:
 * - "all"                 → All divisions
 * - each division.slug    → That division’s news only
 */
const typeOptions = [
  { value: 'all', label: 'All divisions' },
  ...divisions.map(d => ({
    value: d.slug,
    label: d.title
  }))
] as const

/* ---------- Image helper for cards / slider ---------- */
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

/* ---------- Scoped list (by division / all) ---------- */
const scopedNews = computed<NewsItem[]>(() => {
  if (selectedType.value === 'all') {
    return allNews.value
  }
  // Filter by divisionSlug when a specific division is selected
  return allNews.value.filter(n => n.divisionSlug === selectedType.value)
})

/* ---------- Final filtered list (scope + category + search) ---------- */
const filtered = computed<NewsItem[]>(() => {
  const q = search.value.trim().toLowerCase()

  return scopedNews.value.filter((n) => {
    const matchesCategory =
      selectedCategory.value === 'all' || n.category === selectedCategory.value

    const matchesSearch =
      !q ||
      n.title.toLowerCase().includes(q) ||
      n.excerpt.toLowerCase().includes(q)

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
 * Remaining news AFTER the hero items for the grid.
 * If you want all news (including hero) in the grid, change to `filtered.value.slice()`.
 */
const gridNews = computed<NewsItem[]>(() =>
  filtered.value.slice(HERO_COUNT)
)

/* ---------- Optional date formatting helper (for future use) ---------- */
function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

/* ---------- Filter bar hooks (optional) ---------- */
function onApply() {
  // Filtering is reactive; later you can add analytics / scroll-to-top here.
}

function onOpenDate() {
  // Future: hook into a date picker.
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
        :types="typeOptions"
        @apply="onApply"
        @open-date="onOpenDate"
      />
    </section>

    <main class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-6 pb-12">
      <!-- Hero slider -->
      <section v-if="hasNews && heroNews.length" class="grid grid-cols-1 gap-6">
        <div>
          <NewsHeroSlider :items="heroNews" />
        </div>
      </section>

      <!-- Remaining news grid -->
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

      <!-- No grid items but we do have news (e.g. less than HERO_COUNT) -->
      <section
        v-else-if="hasNews"
        class="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
      >
        <NewsCard
          v-for="n in filtered"
          :key="n.id"
          :item="n"
          :image-src="coverSrc(n.coverImage)"
        />
      </section>
      <p v-else
      class="mt-10 text-center text-sm text-gray-600 dark:text-gray-300"
      >
         No news found for this filter.
      </p>
      <!-- Upcoming events -->
      <SectionsUpcomingEvents
        class="mt-12 text-white bg-[#0B1843]"
        all-href="/events"
      />


      <!-- Empty state -->
      <div
        v-if="!hasNews"
        class="mt-10 text-center text-sm text-gray-600 dark:text-gray-300"
      >
        No news found for this filter.
      </div>
    </main>
  </div>
</template>
