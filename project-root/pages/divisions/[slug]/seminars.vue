<!-- pages/divisions/[slug]/seminars.vue -->
<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRoute } from 'vue-router'
import { useHead } from '#imports'

import { useBreadcrumbs } from '~/composables/useBreadcrumbs'
import { divisions, type Division } from '~/data/divisions'
import {
  getAllSeminars,
  type SeminarItem,
  type SeminarCategory
} from '~/data/seminars'

import NewsFilterBar from '~/components/news/NewsFilterBar.vue'
import SeminarCard from '~/components/seminars/SeminarCard.vue'
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
    ? `${division.value.title} — Seminars — AANL`
    : 'Division — Seminars — AANL',
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

/* ---------- Raw seminars + division-scoped seminars ---------- */
const allSeminars = computed<SeminarItem[]>(() => getAllSeminars())

/**
 * Seminars that belong to the current division.
 * NOTE: seminar.divisionSlug must equal division.slug exactly.
 */
const divisionSeminars = computed<SeminarItem[]>(() => {
  if (!division.value) return []
  return allSeminars.value.filter(s => s.divisionSlug === division.value!.slug)
})

/* ---------- Filters (categories from data/seminars.ts) ---------- */
const categories = [
  'Particle physics',
  'Astrophysics',
  'Nuclear physics',
  'Cosmic rays',
  'Condensed matter',
  'Education & outreach',
  'Other'
] as const

type Category = (typeof categories)[number] | SeminarCategory

const search = ref('')
const selectedCategory = ref<'all' | Category>('all')

/**
 * Type options for this page:
 * - "division": only seminars of this division
 * - "all": all AANL seminars (still filtered by category/search)
 */
const typeOptions = [
  { value: 'division', label: 'This division' },
  { value: 'all',      label: 'All seminars' }
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

/** First decide scope: all AANL seminars vs only this division. */
const scopedSeminars = computed<SeminarItem[]>(() =>
  selectedType.value === 'all' ? allSeminars.value : divisionSeminars.value
)

/** Then apply category + search filters on top. */
const filteredSeminars = computed<SeminarItem[]>(() => {
  const q = search.value.trim().toLowerCase()

  return scopedSeminars.value.filter((s) => {
    const matchesCategory =
      selectedCategory.value === 'all' || s.category === selectedCategory.value

    const matchesSearch =
      !q ||
      s.title.toLowerCase().includes(q) ||
      (s.excerpt ?? '').toLowerCase().includes(q)

    return matchesCategory && matchesSearch
  })
})

const hasSeminars = computed(() => filteredSeminars.value.length > 0)

/* ---------- QuickAccess items ---------- */
const qaItems = computed(() => [
  { key: 'employees', label: 'Employees', to: `/divisions/${slug.value}/employees` },
  { key: 'news',      label: 'News',      to: `/divisions/${slug.value}/news` },
  { key: 'seminars',  label: 'Seminars',  to: `/divisions/${slug.value}/seminars` }
])

/* ---------- Optional hooks from filter bar ---------- */
function onApply() {
  // Later: analytics / scroll-to-top, etc.
}

function onOpenDate() {
  // Later: open date range picker, etc.
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
          <!-- Breadcrumbs -->
          <AppBreadcrumbs
            :items="crumbs"
            variant="light-on-dark"
          />

          <!-- Title -->
          <div class="mt-28 sm:mt-24 h-full flex items-end pb-4 sm:pb-8">
            <h1 class="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              {{ division.title }} — Seminars
            </h1>
          </div>
        </div>
      </div>
    </section>

    <!-- Content -->
    <section class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">
        <!-- Left: Filter + seminar list -->
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

          <!-- Seminar cards -->
          <section
            v-if="hasSeminars"
            class="grid grid-cols-1 sm:grid-cols-2 gap-5"
          >
            <SeminarCard
              v-for="s in filteredSeminars"
              :key="s.id"
              :item="s"
              :image-src="coverSrc(s.coverImage)"
            />
          </section>

          <p
            v-else
            class="mt-6 text-sm text-gray-600 dark:text-gray-300"
          >
            No seminars have been published for this division yet.
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
