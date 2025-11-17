<!-- pages/divisions/[slug]/news.vue -->
<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRoute } from 'vue-router'
import { useHead } from '#imports'

import { useBreadcrumbs } from '~/composables/useBreadcrumbs'
import { divisions, type Division } from '~/data/divisions'
import {
  getAllNews,
  type NewsItem,
  type NewsCategory
} from '~/data/news'

import NewsFilterBar from '~/components/news/NewsFilterBar.vue'
import NewsCard from '~/components/news/NewsCard.vue'
import AppBreadcrumbs from '~/components/ui/AppBreadcrumbs.vue'

/* ---------- Route / division ---------- */
const route = useRoute()
const slug = computed(() => String(route.params.slug || ''))

const division = computed<Division | undefined>(() =>
  divisions.find(d => d.slug === slug.value)
)

/* ---------- Breadcrumbs / SEO ---------- */
const { crumbs, jsonLd } = useBreadcrumbs({
  segmentLabels: { divisions: 'Divisions' },
  currentLabel: division.value?.title ?? null
})

useHead(() => ({
  title: division.value
    ? `${division.value.title} — News — AANL`
    : 'Division — News — AANL',
  script: [
    {
      type: 'application/ld+json',
      children: JSON.stringify(jsonLd.value)
    }
  ]
}))

/* ---------- Banner image (reuse division image) ---------- */
const bannerMods = import.meta.glob('~/assets/images/divisions/*', {
  eager: true,
  import: 'default'
}) as Record<string, string>

const bannerByFile = Object.fromEntries(
  Object.entries(bannerMods).map(([p, u]) => [p.split('/').pop()!, u])
)

const bannerSrc = computed(() =>
  division.value ? bannerByFile[division.value.image] || '' : ''
)

/* ---------- Raw news + division-scoped news ---------- */
const allNews = computed<NewsItem[]>(() => getAllNews())

/**
 * News that belong to the current division.
 * NOTE: news.divisionSlug must equal division.slug exactly.
 */
const divisionNews = computed<NewsItem[]>(() => {
  if (!division.value) return []
  return allNews.value.filter(n => n.divisionSlug === division.value!.slug)
})

/* ---------- Filters (same categories as global /news) ---------- */
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

type Category = (typeof categories)[number] | Extract<NewsCategory, 'Other'>

const search = ref('')
const selectedCategory = ref<'all' | Category>('all')

/**
 * Type options for this page:
 * - "division": only news of this division
 * - "all": all AANL news (still filtered by category/search)
 */
const typeOptions = [
  { value: 'division', label: 'This division' },
  { value: 'all',      label: 'All AANL news' }
] as const

type TypeValue = (typeof typeOptions)[number]['value']
const selectedType = ref<TypeValue>('division')

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

/* ---------- Filtered list (scope + category + search) ---------- */

/** First decide scope: all AANL news vs only this division. */
const scopedNews = computed<NewsItem[]>(() =>
  selectedType.value === 'all' ? allNews.value : divisionNews.value
)

/** Then apply category + search filters on top. */
const filteredNews = computed<NewsItem[]>(() => {
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

const hasNews = computed(() => filteredNews.value.length > 0)

/* ---------- QuickAccess items ---------- */
const qaItems = computed(() => [
  { key: 'employees', label: 'Employees', to: `/divisions/${slug.value}/employees` },
  { key: 'news',      label: 'News',      to: `/divisions/${slug.value}/news` },
  { key: 'seminars',  label: 'Seminars',  to: `/divisions/${slug.value}/seminars` }
])

/* ---------- Optional hooks from filter bar ---------- */
function onApply() {
  // Good place later for analytics or scroll-to-top
}

function onOpenDate() {
  // Future: open date picker, etc.
}
</script>

<template>
  <div v-if="division" class="dark:bg-gray-950">
    <!-- Banner -->
    <section class="relative isolate overflow-hidden">
      <img
        :src="bannerSrc"
        :alt="division.title"
        class="w-full h-[240px] sm:h-[300px] lg:h-[360px] object-cover"
      />
      <div
        class="absolute inset-0
               bg-[linear-gradient(0deg,rgba(0,0,0,0.55),rgba(0,0,0,0.25))]"
      />

      <div class="absolute inset-0">
        <div class="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 pt-5 sm:pt-6">
          <!-- Breadcrumb -->
         <AppBreadcrumbs
          :items="crumbs"
          variant="light-on-dark"
        />

          <!-- Title -->
          <div class="mt-28 sm:mt-24 h-full flex items-end pb-4 sm:pb-8">
            <h1 class="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              {{ division.title }} — News
            </h1>
          </div>
        </div>
      </div>
    </section>

    <!-- Content -->
    <section class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">
        <!-- Left: Filter + news list -->
        <div class="lg:col-span-8">
          <NewsFilterBar
            v-model:search="search"
            v-model:type="selectedType"
            v-model:category="selectedCategory"
            :categories="categories"
            :types="typeOptions"
            @apply="onApply"
            @open-date="onOpenDate"
          />

          <!-- News cards -->
          <section
            v-if="hasNews"
            class="grid grid-cols-1 sm:grid-cols-2 gap-5"
          >
            <NewsCard
              v-for="n in filteredNews"
              :key="n.id"
              :item="n"
              :image-src="coverSrc(n.coverImage)"
            />
          </section>

          <p
            v-else
            class="mt-6 text-sm text-gray-600 dark:text-gray-300"
          >
            No news has been published for this division yet.
          </p>
        </div>

        <!-- Right: Quick Access -->
        <aside class="lg:col-span-4">
          <CommonQuickAccess
            :items="qaItems"
            title="Quick access"
            sticky
            sticky-top="top-4"
            brand-color-class="bg-[--brand-navy]"
          />
        </aside>
      </div>
    </section>
  </div>

  <!-- Fallback if division not found -->
  <div v-else class="mx-auto max-w-3xl px-4 py-16 text-center">
    <h1 class="text-2xl font-semibold">Division not found</h1>
    <p class="mt-2 text-gray-600">
      Please check the URL or return to the
      <NuxtLink to="/divisions" class="text-[--brand-navy] hover:underline">
        Divisions
      </NuxtLink>
      page.
    </p>
  </div>
</template>
