<!-- pages/news/[slug].vue -->
<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useHead } from '#imports'
import { getNewsBySlug, getAllNews, type NewsItem } from '~/data/news'

const route = useRoute()
const slug = computed(() => String(route.params.slug || ''))

const item = computed<NewsItem | undefined>(() => getNewsBySlug(slug.value))
const allNews = computed(() => getAllNews())

// simple related list – 4 other recent news
const related = computed(() =>
  allNews.value.filter(n => n.slug !== slug.value).slice(0, 4)
)

// cover + gallery images
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
useHead(() => ({
  title: item.value ? `${item.value.title} — News — AANL` : 'News — AANL'
}))
</script>

<template>
  <div v-if="item" class="bg-[#F3F4F6] dark:bg-gray-950 min-h-screen">
    <!-- Hero image -->
    <section class="bg-white dark:bg-gray-900">
      <div class="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 pt-6 sm:pt-8">
        <NuxtLink
          to="/news"
          class="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-700"
        >
          <span class="inline-flex items-center justify-center size-6 rounded-full bg-gray-100">
            ‹
          </span>
          <span>News</span>
        </NuxtLink>
      </div>

      <div class="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
        <div class="overflow-hidden rounded-3xl shadow-lg ring-1 ring-black/5">
          <img
            :src="imgSrc(item.coverImage)"
            :alt="item.title"
            class="w-full h-[260px] sm:h-[320px] lg:h-[380px] object-cover"
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
        class="-mt-10 sm:-mt-16 relative z-10 rounded-3xl bg-white dark:bg-gray-900 shadow-xl ring-1 ring-black/5 dark:ring-white/10 px-4 sm:px-8 lg:px-10 py-6 sm:py-8"
      >
        <p class="text-[11px] uppercase tracking-wide text-gray-500">
          {{ formatDate(item.date) }}
        </p>
        <h1 class="mt-1 text-2xl sm:text-3xl lg:text-[32px] font-semibold text-gray-900 dark:text-white">
          {{ item.title }}
        </h1>

        <div class="mt-4 space-y-4 text-sm sm:text-[15px] leading-relaxed text-gray-700 dark:text-gray-200">
          <p v-for="(p, idx) in paragraphs" :key="idx">
            {{ p }}
          </p>
        </div>

        <!-- Gallery -->
        <div
          v-if="item.gallery?.length"
          class="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4"
        >
          <div
            v-for="(g, idx) in item.gallery"
            :key="idx"
            class="overflow-hidden rounded-2xl"
          >
            <img
              :src="imgSrc(g)"
              :alt="`${item.title} image ${idx + 1}`"
              class="w-full h-40 sm:h-44 object-cover"
              loading="lazy"
              decoding="async"
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

      <!-- Upcoming events (simple static layout – adapt to your real events data) -->
      <section class="mt-10 rounded-3xl bg-[#001645] text-white px-4 sm:px-8 py-6 sm:py-8">
        <div class="flex items-center justify-between gap-4">
          <h2 class="text-xl sm:text-2xl font-semibold">Upcoming events</h2>
          <button
            type="button"
            class="inline-flex items-center justify-center size-9 rounded-full bg-white/10 hover:bg-white/20"
          >
            <svg viewBox="0 0 20 20" class="size-4" aria-hidden="true">
              <rect
                x="3"
                y="4"
                width="14"
                height="13"
                rx="2"
                stroke="currentColor"
                stroke-width="1.6"
                fill="none"
              />
              <path d="M7 2v4M13 2v4M4 9h12" stroke="currentColor" stroke-width="1.6" />
            </svg>
          </button>
        </div>

        <!-- replace cards with real events later -->
        <div
          class="mt-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-gray-900"
        >
          <div
            v-for="idx in 4"
            :key="idx"
            class="rounded-2xl bg-white px-4 py-3 text-xs sm:text-sm"
          >
            <p class="text-[11px] uppercase tracking-wide text-gray-500">
              September {{ 5 + idx }}, 10:00–11:30
            </p>
            <p class="mt-1 font-semibold text-gray-900 line-clamp-2">
              Example upcoming event title {{ idx }}
            </p>
          </div>
        </div>

        <div class="mt-5 flex justify-center">
          <NuxtLink
            to="/events"
            class="inline-flex items-center gap-2 rounded-full border border-white/40 px-4 py-1.5 text-sm"
          >
            All Events
            <span>→</span>
          </NuxtLink>
        </div>
      </section>

      <!-- Related topics / news -->
      <section class="mt-10 mb-8">
        <h2 class="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-white">
          Related Topics
        </h2>

        <div class="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <article
            v-for="n in related"
            :key="n.id"
            class="rounded-2xl bg-white dark:bg-gray-900 shadow-md ring-1 ring-black/5 dark:ring-white/10 overflow-hidden"
          >
            <NuxtLink :to="`/news/${n.slug}`" class="block h-full">
              <div class="h-32 overflow-hidden">
                <img
                  :src="imgSrc(n.coverImage)"
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
                <h3 class="mt-1 text-sm font-semibold leading-snug line-clamp-2">
                  {{ n.title }}
                </h3>
              </div>
            </NuxtLink>
          </article>
        </div>
      </section>
    </main>
  </div>

  <!-- Fallback if slug not found -->
  <div v-else class="mx-auto max-w-3xl px-4 py-16 text-center">
    <h1 class="text-2xl font-semibold">News item not found</h1>
    <p class="mt-2 text-gray-600">
      Please check the URL or return to the
      <NuxtLink to="/news" class="text-[--brand-navy] hover:underline">News</NuxtLink>
      page.
    </p>
  </div>
</template>
