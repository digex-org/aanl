<!-- components/sections/SectionsUpcomingEvents.vue -->
<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from '#imports'
import EventCard from '~/components/events/EventCard.vue'
import { events as source } from '~/data/events'
import type { EventItem } from '~/data/events'

const { t } = useI18n()

const props = withDefaults(defineProps<{
  title?: string
  allHref?: string
  events?: EventItem[]
  iconTo?: string
  iconLabel?: string
  showCountBadge?: boolean

  /** Customizable: section background (default keeps current behavior) */
  sectionBgClass?: string

  /** Customizable: title text + underline color */
  titleClass?: string

  /** Customizable: bottom "All Events" button colors (text/border/bg/hover/ring) */
  allButtonClass?: string

  /** How many events to show (after sorting/filtering). 0 = no limit */
  maxItems?: number

  /** When true, prefer upcoming events (date >= today) */
  onlyUpcoming?: boolean
}>(), {
  // NOTE: we do NOT set defaults for `title` / `iconLabel` here,
  // they come from i18n below so props can override them.
  allHref: '/events',
  iconTo: '/events',
  showCountBadge: true,
  sectionBgClass: 'bg-transparent dark:bg-gray-950',
  titleClass: 'text-gray-900 dark:text-white',
  allButtonClass:
    'text-[#1D50A2] border-1 border-[#1D50A2] ' +
    'hover:bg-[#1D50A2] hover:text-white ' +
    'focus-visible:ring-[#1D50A2]',
  maxItems: 4,
  onlyUpcoming: false
})

/**
 * Base list:
 * - if `events` prop provided → use that
 * - otherwise fall back to global events dataset
 */
const rawList = computed<EventItem[]>(() =>
  props.events?.length ? props.events : source
)

const items = computed<EventItem[]>(() => {
  let arr = [...rawList.value]
  if (!arr.length) return []

  // Sort all events by date (ascending)
  arr.sort((a, b) => {
    const da = new Date(a.date).getTime()
    const db = new Date(b.date).getTime()
    return da - db
  })

  const nowTs = Date.now()
  let upcoming: EventItem[] = []

  if (props.onlyUpcoming) {
    upcoming = arr.filter(ev => {
      const ts = new Date(ev.date).getTime()
      return !Number.isNaN(ts) && ts >= nowTs
    })
  }

  // If there are upcoming events, use them.
  // If NOT, gracefully fall back to the sorted full list.
  let finalList = props.onlyUpcoming && upcoming.length ? upcoming : arr

  if (props.maxItems && props.maxItems > 0) {
    finalList = finalList.slice(0, props.maxItems)
  }

  return finalList
})

// ---- i18n: section texts ----
const titleText = computed(() =>
  // allow prop override, otherwise use i18n
  props.title ?? t('events.section.title')
)

const allEventsText = computed(() =>
  t('events.section.all')
)

const iconLabelText = computed(() =>
  props.iconLabel ?? t('events.section.iconLabel')
)
</script>

<template>
  <!-- Section background is configurable -->
  <section :class="sectionBgClass" aria-labelledby="events-title">
    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 sm:py-14 lg:py-20">
      <!-- Heading -->
      <div class="mb-6 sm:mb-8 flex items-center justify-between">
        <!-- Left: title + counter -->
        <div class="mb-6 sm:mb-8">
          <h2
            id="events-title"
            class="text-2xl sm:text-3xl font-bold tracking-tight"
          >
            <span
              class="relative inline-block
                     after:content-[''] after:block after:h-[3px]
                     after:bg-current after:rounded-full after:mt-2"
              :class="titleClass"
            >
              {{ titleText }}
            </span>

            <span
              v-if="showCountBadge"
              class="ml-2 inline-flex items-center justify-center w-5 h-5 rounded-full align-super bg-[#1D50A2] text-white text-[10px] font-semibold leading-none ring-2 ring-white dark:ring-gray-950"
              aria-label="Total events shown"
              title="Total events shown"
            >
              {{ items.length }}
            </span>
          </h2>
        </div>

        <!-- Right: circular icon button -->
        <NuxtLink
          :to="iconTo"
          :aria-label="iconLabelText"
          class="group inline-flex items-center justify-center
                 w-10 h-10 rounded-full
                 bg-[#1F6FD3] text-white
                 ring-2 ring-white dark:ring-gray-900
                 shadow-md hover:shadow-lg
                 transition transform hover:-translate-y-0.5
                 focus-visible:outline-none
                 focus-visible:ring-2 focus-visible:ring-[#1D50A2]
                 focus-visible:ring-offset-2"
          :title="iconLabelText"
        >
          <IconsIconIvent class="w-8 h-8 shrink-0" />
        </NuxtLink>
      </div>

      <!-- Cards: horizontal snap on mobile, grid on desktop -->
      <div
        class="snap-x snap-mandatory overflow-x-auto -mx-4 px-4 sm:mx-0 sm:px-0
               flex gap-4 sm:grid sm:gap-6 sm:grid-cols-2 lg:grid-cols-4"
        role="list"
        aria-label="Upcoming events list"
      >
        <div
          v-for="(ev, i) in items"
          :key="ev.id"
          role="listitem"
          class="relative min-w-[82%] xs:min-w-[70%] sm:min-w-0 snap-start"
        >
          <EventCard :event="ev" :index="i" />
        </div>
      </div>

      <!-- Bottom-centered “All Events” -->
      <div class="mt-8 flex justify-center">
        <NuxtLink
          :to="allHref"
          class="group inline-flex items-center justify-center gap-2
                 h-10 rounded-[130px] px-4
                 text-[15px] font-semibold
                 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2
                 transition"
          :class="allButtonClass"
        >
          <span>{{ allEventsText }}</span>
          <svg
            width="26"
            height="15"
            viewBox="0 0 26 15"
            fill="none"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            class="shrink-0"
          >
            <path
              d="M25.7071 8.07112C26.0976 7.6806 26.0976 7.04743 25.7071 6.65691L19.3431 0.292946C18.9526 -0.0975785 18.3195 -0.0975785 17.9289 0.292946C17.5384 0.68347 17.5384 1.31664 17.9289 1.70716L23.5858 7.36401L17.9289 13.0209C17.5384 13.4114 17.5384 14.0446 17.9289 14.4351C18.3195 14.8256 18.9526 14.8256 19.3431 14.4351L25.7071 8.07112ZM0 8.36401L25 8.36401V6.36401L0 6.36401L0 8.36401Z"
              fill="currentColor"
            />
          </svg>
        </NuxtLink>
      </div>
    </div>
  </section>
</template>
