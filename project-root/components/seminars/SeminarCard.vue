<!-- components/seminars/SeminarCard.vue -->
<script setup lang="ts">
import { computed } from 'vue'
import type { SeminarItem } from '~/data/seminars' // <- create this type similar to NewsItem

/**
 * Expected SeminarItem shape (for reference):
 *
 * export type SeminarItem = {
 *   id: string
 *   slug: string
 *   title: string
 *   excerpt: string
 *   body: string
 *   date: string        // ISO date, e.g. "2025-02-05"
 *   time?: string       // "15:00" (optional)
 *   topic?: string      // "Particle physics" (optional)
 *   coverImage: string  // file name in assets/images/seminars/*
 * }
 */

const props = withDefaults(defineProps<{
  item: SeminarItem
  /** Optional pre-resolved image URL (Nuxt assets helper, remote, etc.) */
  imageSrc?: string
  /** Show the longer excerpt body under the title */
  showExcerpt?: boolean
}>(), {
  imageSrc: '',
  showExcerpt: true
})

/* ---------- Local cover resolution (if imageSrc not passed) ---------- */
const coverMods = import.meta.glob('~/assets/images/news/*', {
  eager: true,
  import: 'default'
}) as Record<string, string>

const coverByFile = Object.fromEntries(
  Object.entries(coverMods).map(([p, u]) => [p.split('/').pop()!, u])
)

const coverSrc = computed(() =>
  props.imageSrc || coverByFile[props.item.coverImage] || props.item.coverImage
)

/* ---------- Date/time formatting ---------- */
const formattedDate = computed(() =>
  new Date(props.item.date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
)

const dateTimeLabel = computed(() => {
  if (props.item.time) {
    return `${formattedDate.value} | ${props.item.time}`
  }
  return formattedDate.value
})
</script>

<template>
  <article
    class="rounded-2xl bg-white text-gray-900 shadow-md ring-1 ring-black/5 overflow-hidden
           dark:bg-gray-900 dark:text-white dark:ring-white/10"
  >
    <NuxtLink
      :to="`/seminars/${item.slug}`"
      class="block h-full"
      :aria-label="item.title"
    >
      <!-- Image -->
      <div class="aspect-[4/3] overflow-hidden bg-gray-100 dark:bg-gray-800">
        <img
          :src="coverSrc"
          :alt="item.title"
          class="h-full w-full object-cover"
          loading="lazy"
          decoding="async"
        />
      </div>

      <!-- Text content -->
      <div class="px-4 pb-4 pt-3">
        <!-- Date + time -->
        <p class="text-[11px] font-medium uppercase tracking-wide text-[#1D50A2]">
          {{ dateTimeLabel }}
        </p>

        <!-- Title -->
        <h3 class="mt-1 text-sm sm:text-[15px] font-semibold leading-snug line-clamp-2">
          {{ item.title }}
        </h3>

        <!-- Optional excerpt -->
        <p
          v-if="showExcerpt && item.excerpt"
          class="mt-2 text-xs sm:text-sm text-gray-600 dark:text-gray-300 line-clamp-4"
        >
          {{ item.excerpt }}
        </p>
      </div>
    </NuxtLink>
  </article>
</template>
