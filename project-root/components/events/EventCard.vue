<!-- components/events/EventCard.vue -->
<script setup lang="ts">
import { computed } from 'vue'
import type { EventItem } from '~/data/events'

const props = defineProps<{
  event: EventItem
  index?: number
}>()

const monthNames = [
  'january',
  'february',
  'march',
  'april',
  'may',
  'june',
  'july',
  'august',
  'september',
  'october',
  'november',
  'december'
]

function parts(iso: string) {
  const d = new Date(iso)
  return {
    day: String(d.getDate()),
    month: monthNames[d.getMonth()]
  }
}

// Map accent to Tailwind classes
function topAccent(accent?: EventItem['accent'], i?: number) {
  const c = accent ?? (['blue', 'pink', 'orange', 'green'] as const)[(i ?? 0) % 4]
  switch (c) {
    case 'pink':
      return 'before:bg-gradient-to-r before:from-pink-500 before:to-rose-400'
    case 'orange':
      return 'before:bg-gradient-to-r before:from-orange-400 before:to-amber-400'
    case 'green':
      return 'before:bg-gradient-to-r before:from-emerald-400 before:to-teal-400'
    default:
      return 'before:bg-gradient-to-r before:from-[#1D50A2] before:to-blue-400'
  }
}

/**
 * Always produce an absolute URL for NuxtLink.
 * - If event.href starts with "/", keep it.
 * - If it’s like "events/slug", prefix with "/".
 */
const toUrl = computed(() => {
  const href = props.event.href || ''
  if (!href) return '#'
  return href.startsWith('/') ? href : `/${href}`
})
</script>

<template>
  <article
    :class="[
      'relative rounded-xl bg-white dark:bg-gray-900',
      'shadow-[0_1px_2px_rgba(0,0,0,0.05)] transition hover:shadow-lg hover:-translate-y-0.5',
      'before:absolute before:inset-x-0 before:top-0 before:h-1.5 before:rounded-t-2xl',
      topAccent(event.accent, index)
    ]"
  >
    <div class="p-4 min-h-63 sm:p-5 relative min-w-[82%] xs:min-w-[70%] sm:min-w-0">
      <!-- Date row -->
      <div class="flex items-start gap-3">
        <div class="rounded-md bg-[#1D50A2] text-white px-2.5 py-1 leading-none">
          <span class="block text-base font-bold">
            {{ parts(event.date).day }}
          </span>
        </div>
        <div class="mt-0.5">
          <div class="text-xs font-semibold uppercase tracking-wide text-[#1D50A2]">
            {{ parts(event.date).month }}
          </div>
          <div class="text-[11px] text-gray-500 dark:text-gray-400">
            {{ event.time || '' }}
          </div>
        </div>
      </div>

      <hr class="my-3 border-gray-200/80 dark:border-white/10" />

      <!-- Title -->
      <h3 class="text-[17px] leading-snug font-semibold text-gray-900 dark:text-gray-100">
        <NuxtLink
          :to="toUrl"
          class="hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1D50A2] rounded"
        >
          {{ event.title }}
        </NuxtLink>
      </h3>

      <!-- Optional blurb -->
      <p
        v-if="event.blurb"
        class="mt-1 text-sm text-gray-600 dark:text-gray-300 line-clamp-2"
      >
        {{ event.blurb }}
      </p>
    </div>
  </article>
</template>
