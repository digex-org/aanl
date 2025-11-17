<!-- pages/divisions/[slug]/news.vue -->
<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useHead } from '#imports'

import { useBreadcrumbs } from '~/composables/useBreadcrumbs'
import { divisions, type Division } from '~/data/divisions'
import { getDivisionNews, type NewsItem } from '~/data/news'

const route = useRoute()
const slug = computed(() => String(route.params.slug || ''))

const division = computed<Division | undefined>(() =>
  divisions.find(d => d.slug === slug.value)
)

/* breadcrumbs reusing your helper */
const { crumbs, jsonLd } = useBreadcrumbs({
  segmentLabels: { divisions: 'Divisions' },
  currentLabel: division.value?.title ?? null
})

useHead(() => ({
  title: division.value
    ? `${division.value.title} — News — AANL`
    : 'Division — News — AANL',
  script: [{ type: 'application/ld+json', children: JSON.stringify(jsonLd.value) }]
}))

/* banner image same as division page */
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

/* news for this division */
const news = computed<NewsItem[]>(() =>
  division.value ? getDivisionNews(division.value.slug) : []
)

/* news images */
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

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

/* QuickAccess items – same pattern as other division subpages */
const qaItems = computed(() => [
  { key: 'employees', label: 'Employees', to: `/divisions/${slug.value}/employees` },
  { key: 'news',      label: 'News',      to: `/divisions/${slug.value}/news` },
  { key: 'seminars',  label: 'Seminars',  to: `/divisions/${slug.value}/seminars` }
])
</script>

<template>
  <div v-if="division" class="dark:bg-gray-950">
    <!-- Banner (same as other division pages) -->
    <section class="relative isolate overflow-hidden">
      <img :src="bannerSrc" :alt="division.title" class="w-full h-[240px] sm:h-[300px] lg:h-[360px] object-cover" />
      <div class="absolute inset-0 bg-[linear-gradient(0deg,rgba(0,0,0,0.55),rgba(0,0,0,0.25))]"></div>

      <div class="absolute inset-0">
        <div class="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 pt-5 sm:pt-6">
          <nav aria-label="Breadcrumb">
            <ol class="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm">
              <li v-for="(c, i) in crumbs" :key="i" class="flex items-center">
                <NuxtLink
                  v-if="c.to"
                  :to="c.to"
                  class="text-white/80 hover:text-white hover:underline"
                >
                  {{ c.label }}
                </NuxtLink>
                <span
                  v-else
                  class="text-white font-medium"
                  aria-current="page"
                >
                  {{ c.label }}
                </span>
                <span
                  v-if="i < crumbs.length - 1"
                  class="mx-2 text-white/70 select-none"
                  aria-hidden="true"
                >›</span>
              </li>
            </ol>
          </nav>

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
        <!-- News list -->
        <div class="lg:col-span-8 space-y-4">
          <article
            v-for="n in news"
            :key="n.id"
            class="rounded-2xl bg-white dark:bg-gray-900 shadow-md ring-1 ring-black/5 dark:ring-white/10 overflow-hidden"
          >
            <NuxtLink :to="`/news/${n.slug}`" class="block h-full">
              <div class="h-40 sm:h-44 overflow-hidden">
                <img
                  :src="coverSrc(n.coverImage)"
                  :alt="n.title"
                  class="h-full w-full object-cover"
                  loading="lazy"
                  decoding="async"
                />
              </div>
              <div class="px-4 pb-4 pt-3 text-gray-900 dark:text-white">
                <p class="text-[11px] uppercase tracking-wide text-gray-500">
                  {{ formatDate(n.date) }}
                </p>
                <h2 class="mt-1 text-sm sm:text-base font-semibold leading-snug">
                  {{ n.title }}
                </h2>
                <p class="mt-2 text-xs sm:text-sm text-gray-600 dark:text-gray-300 line-clamp-2">
                  {{ n.excerpt }}
                </p>
              </div>
            </NuxtLink>
          </article>

          <p v-if="!news.length" class="text-gray-600 dark:text-gray-300 text-sm">
            No news has been published for this division yet.
          </p>
        </div>

        <!-- Quick Access -->
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

  <div v-else class="mx-auto max-w-3xl px-4 py-16 text-center">
    <h1 class="text-2xl font-semibold">Division not found</h1>
    <p class="mt-2 text-gray-600">
      Please check the URL or return to the
      <NuxtLink to="/divisions" class="text-[--brand-navy] hover:underline">Divisions</NuxtLink> page.
    </p>
  </div>
</template>
