<!-- components/news/NewsCard.vue -->
<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from '#imports'
import type { NewsItem } from '~/data/news'

/**
 * Single news card (thumbnail + date + title + optional excerpt).
 * - Fully clickable via NuxtLink
 * - i18n-aware title & excerpt (fallback to NewsItem fields)
 * - Locale-aware date formatting
 */
const props = withDefaults(defineProps<{
  item: NewsItem
  /** Optional pre-resolved image URL. If not provided we resolve from assets. */
  imageSrc?: string
  /** Show short excerpt under title (optional, default: false) */
  showExcerpt?: boolean
}>(), {
  imageSrc: '',
  showExcerpt: false
})

const { t, locale } = useI18n()

/* ---------- i18n-aware title & excerpt ---------- */
/**
 * news.items.<slug>.title / excerpt in:
 *   locales/en/news.json
 *   locales/hy/news.json
 * with graceful fallback to item.title / item.excerpt.
 */
const translatedTitle = computed(() => {
  const key = `news.items.${props.item.slug}.title`
  const translated = t(key)
  return translated === key ? props.item.title : translated
})

const translatedExcerpt = computed(() => {
  if (!props.item.excerpt) return ''
  const key = `news.items.${props.item.slug}.excerpt`
  const translated = t(key)
  return translated === key ? props.item.excerpt : translated
})

/* ---------- SSR-safe local image resolution ---------- */
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

/* ---------- Locale-aware date label ---------- */
const formattedDate = computed(() => {
  const d = new Date(props.item.date)
  const loc = locale.value === 'hy' ? 'hy-AM' : 'en-US'

  return d.toLocaleDateString(loc, {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric'
  })
})
</script>

<template>
  <article
    class="group h-full rounded-2xl bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-50
           shadow-md ring-1 ring-black/5 dark:ring-white/10
           overflow-hidden transition
           hover:shadow-xl hover:-translate-y-0.5"
  >
    <NuxtLink
      :to="`/news/${item.slug}`"
      class="block h-full focus-visible:outline-none focus-visible:ring-2
             focus-visible:ring-[#1D50A2] focus-visible:ring-offset-2
             focus-visible:ring-offset-white dark:focus-visible:ring-offset-gray-900"
      :aria-label="translatedTitle"
    >
      <!-- Image -->
      <div class="aspect-[4/3] overflow-hidden">
        <img
          :src="coverSrc"
          :alt="translatedTitle"
          class="h-full w-full object-cover
                 transition-transform duration-300
                 group-hover:scale-[1.03]"
          loading="lazy"
          decoding="async"
        />
      </div>

      <!-- Text content -->
      <div class="px-4 pb-4 pt-3">
        <p class="text-[11px] uppercase tracking-wide text-gray-500 dark:text-gray-400">
          {{ formattedDate }}
        </p>

        <h3
          class="mt-1 text-sm sm:text-[15px] font-semibold leading-snug
                 text-gray-900 dark:text-gray-50 line-clamp-2"
        >
          {{ translatedTitle }}
        </h3>

        <p
          v-if="showExcerpt && translatedExcerpt"
          class="mt-2 text-sm text-gray-600 dark:text-gray-300 line-clamp-2"
        >
          {{ translatedExcerpt }}
        </p>
      </div>
    </NuxtLink>
  </article>
</template>
