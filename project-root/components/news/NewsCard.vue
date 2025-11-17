<!-- components/news/NewsCard.vue -->
<script setup lang="ts">
import { computed } from 'vue'
import type { NewsItem } from '~/data/news'

/**
 * Single news card (thumbnail + date + title).
 * Designed to be fully clickable via NuxtLink.
 */
const props = withDefaults(defineProps<{
  item: NewsItem
  /** Optional pre-resolved image URL. If not provided we resolve from assets. */
  imageSrc?: string
  /** Show short excerpt under title (optional) */
  showExcerpt?: boolean
}>(), {
  imageSrc: '',
  showExcerpt: false
})

/* SSR-safe local image resolution (if imageSrc not passed) */
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

const formattedDate = computed(() =>
  new Date(props.item.date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
)
</script>

<template>
  <article
    class="rounded-2xl bg-white text-gray-900 shadow-md ring-1 ring-black/5 overflow-hidden"
  >
    <NuxtLink
      :to="`/news/${item.slug}`"
      class="block h-full"
      :aria-label="item.title"
    >
      <!-- Image -->
      <div class="aspect-[4/3] overflow-hidden">
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
        <p class="text-[11px] uppercase tracking-wide text-gray-500">
          {{ formattedDate }}
        </p>

        <h3 class="mt-1 text-sm font-semibold leading-snug line-clamp-2">
          {{ item.title }}
        </h3>

        <p
          v-if="showExcerpt && item.excerpt"
          class="mt-2 text-sm text-gray-600 line-clamp-2"
        >
          {{ item.excerpt }}
        </p>
      </div>
    </NuxtLink>
  </article>
</template>
