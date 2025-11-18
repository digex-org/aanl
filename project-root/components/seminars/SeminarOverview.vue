<!-- components/seminars/SeminarOverview.vue -->
<script setup lang="ts">
import { computed } from 'vue'
import AppBreadcrumbs from '~/components/ui/AppBreadcrumbs.vue'
import type { Crumb } from '~/composables/useBreadcrumbs'
import type { SeminarItem } from '~/data/seminars'

const props = withDefaults(defineProps<{
  seminar: SeminarItem
  breadcrumbs?: Crumb[]
  /** Big title over the hero image, like "Seminars" */
  heroTitle?: string
}>(), {
  breadcrumbs: () => [],
  heroTitle: 'Seminars'
})

/* ---------- Images (hero from seminar.coverImage) ---------- */
const imageMods = import.meta.glob('~/assets/images/news/*', {
  eager: true,
  import: 'default'
}) as Record<string, string>

const imageByFile = Object.fromEntries(
  Object.entries(imageMods).map(([p, u]) => [p.split('/').pop()!, u])
)

function imgSrc(file: string): string {
  return imageByFile[file] || file
}

const heroSrc = computed(() => imgSrc(props.seminar.coverImage))

/* ---------- Body paragraphs ---------- */
const paragraphs = computed(() =>
  (props.seminar.body ?? '').split(/\n{2,}/g).filter(Boolean)
)

/* ---------- Date formatting ---------- */
function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}
</script>

<template>
  <section class="dark:bg-gray-950">
    <!-- Breadcrumbs -->
    <div class="mx-auto max-w-7xl px-4 pt-4 sm:px-6 lg:px-8">
      <AppBreadcrumbs
        v-if="breadcrumbs?.length"
        :items="breadcrumbs"
      />
    </div>

    <!-- Hero -->
    <div class="relative mt-4 isolate overflow-hidden rounded-xl bg-gray-900">
      <img
        :src="heroSrc"
        :alt="seminar.title"
        class="w-full h-[260px] sm:h-[360px] lg:h-[380px] object-cover"
        loading="eager"
        decoding="async"
        fetchpriority="high"
      />

      <div
        class="pointer-events-none absolute inset-0
               bg-[linear-gradient(180deg,rgba(0,0,0,0.55),rgba(0,0,0,0.35))]"
      />

      <div class="absolute inset-0 mb-50 sm:mb-16">
        <div class="mx-auto flex h-full max-w-7xl items-end px-4 pb-6 sm:px-6 sm:pb-8 lg:px-8">
          <h1 class="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
            {{ heroTitle }}
          </h1>
        </div>
      </div>
    </div>

    <!-- White card with seminar details -->
    <div class="relative">
      <article
        class="mx-auto max-w-3xl lg:max-w-4xl
               -mt-10 sm:-mt-14 lg:-mt-16
               relative z-10
               rounded-3xl bg-white dark:bg-gray-900
               shadow-xl ring-1 ring-black/5 dark:ring-white/10
               px-4 sm:px-8 lg:px-10 py-6 sm:py-8 lg:py-10"
      >
        <!-- Meta -->
        <header class="mb-4 sm:mb-6 space-y-1">
          <p class="text-[11px] uppercase tracking-wide text-gray-500">
            {{ formatDate(seminar.date) }}
            <span v-if="seminar.time"> · {{ seminar.time }}</span>
          </p>

          <h2 class="text-xl sm:text-2xl lg:text-[26px] font-semibold text-gray-900 dark:text-white">
            {{ seminar.title }}
          </h2>

          <p
            v-if="seminar.location"
            class="text-xs sm:text-sm text-gray-500 dark:text-gray-400"
          >
            {{ seminar.location }}
          </p>
        </header>

        <!-- Body -->
        <div
          class="space-y-4 sm:space-y-5
                 text-sm sm:text-[15px] leading-relaxed
                 text-gray-700 dark:text-gray-200"
        >
          <p
            v-for="(p, idx) in paragraphs"
            :key="idx"
          >
            {{ p }}
          </p>
        </div>
      </article>
    </div>
  </section>
</template>
