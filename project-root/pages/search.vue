<!-- pages/search.vue -->
<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, useHead } from '#imports'

import AppBreadcrumbs from '~/components/ui/AppBreadcrumbs.vue'
import type { Crumb } from '~/composables/useBreadcrumbs'

import { getAllNews, type NewsItem } from '~/data/news'
import { events } from '~/data/events'
import { divisions } from '~/data/divisions'

type ResultType = 'News' | 'Event' | 'Division'

type ResultItem = {
  id: string
  title: string
  href: string
  type: ResultType
  description?: string
}

const route = useRoute()

/**
 * Current search query from ?q=
 */
const q = computed(() => String(route.query.q || '').trim())

useHead(() => ({
  title: q.value
    ? `Search results for "${q.value}" — AANL`
    : 'Search — AANL'
}))

/**
 * Flat data sources
 * (can later be replaced by API/CMS calls)
 */
const allNews: NewsItem[] = getAllNews()

/**
 * Build an index of items we can search through
 */
const index = computed<ResultItem[]>(() => [
  // News
  ...allNews.map((n) => ({
    id: `news-${n.slug}`,
    title: n.title,
    href: `/news/${n.slug}`,
    type: 'News' as const,
    description: n.excerpt || ''
  })),

  // Events
  ...events.map((e) => ({
    id: `event-${e.slug}`,
    title: e.title,
    href: `/events/${e.slug}`,
    type: 'Event' as const,
    description: e.blurb || ''
  })),

  // Divisions
  ...divisions.map((d) => ({
    id: `division-${d.slug}`,
    title: d.title,
    href: `/divisions/${d.slug}`,
    type: 'Division' as const,
    description: d.description || ''
  }))
])

/**
 * Filter index by query
 */
const results = computed<ResultItem[]>(() => {
  if (!q.value) return []

  const term = q.value.toLowerCase()

  return index.value.filter((item) => {
    const title = item.title.toLowerCase()
    const desc = item.description ? item.description.toLowerCase() : ''
    return title.includes(term) || (!!desc && desc.includes(term))
  })
})

const crumbs: Crumb[] = [
  { label: 'Home', to: '/' },
  { label: 'Search' }
]
</script>

<template>
  <div class="dark:bg-gray-950">
    <main class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-6 pb-16">
      <AppBreadcrumbs :items="crumbs" />

      <section class="mt-6">
        <!-- Page title -->
        <header class="mb-6">
          <h1
            class="inline-block text-2xl sm:text-3xl font-bold tracking-tight
                   text-gray-900 dark:text-white
                   relative after:content-[''] after:block after:h-[3px]
                   after:bg-gray-900 after:rounded-full after:mt-2"
          >
            Search
          </h1>
        </header>

        <!-- Query summary -->
        <p class="text-sm text-gray-600 dark:text-gray-300 mb-4">
          <span v-if="q">
            Showing {{ results.length }} result{{ results.length === 1 ? '' : 's' }}
            for <span class="font-semibold">&ldquo;{{ q }}&rdquo;</span>.
          </span>
          <span v-else>
            Type a query in the search bar to find news, events, and divisions.
          </span>
        </p>

        <!-- Results list -->
        <div v-if="results.length" class="space-y-4">
          <article
            v-for="item in results"
            :key="item.id"
            class="rounded-2xl border border-gray-200 dark:border-white/10
                   bg-white dark:bg-gray-900 px-4 sm:px-6 py-4 sm:py-5
                   hover:border-[#1D50A2]/70 hover:shadow-md transition"
          >
            <p class="text-xs font-semibold uppercase tracking-wide text-[#1D50A2] mb-1">
              {{ item.type }}
            </p>

            <h2 class="text-base sm:text-lg font-semibold text-gray-900 dark:text-white">
              <NuxtLink
                :to="item.href"
                class="hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1D50A2] rounded"
              >
                {{ item.title }}
              </NuxtLink>
            </h2>

            <p
              v-if="item.description"
              class="mt-1 text-sm text-gray-600 dark:text-gray-300 line-clamp-2"
            >
              {{ item.description }}
            </p>
          </article>
        </div>

        <!-- Empty state when there is a query but no matches -->
        <div v-else-if="q" class="mt-8 text-sm text-gray-600 dark:text-gray-300">
          No results found. Try another keyword or a shorter phrase.
        </div>
      </section>
    </main>
  </div>
</template>
