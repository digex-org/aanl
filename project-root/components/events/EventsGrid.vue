<!-- components/events/EventsGrid.vue -->
<script setup lang="ts">
import { computed } from 'vue'
import EventCard from '~/components/events/EventCard.vue'
import { events as source } from '~/data/events'
import type { EventItem } from '~/data/events'

const props = withDefaults(defineProps<{
  title?: string
  items?: EventItem[]
  /** Show small count badge next to title */
  showCountBadge?: boolean
  /** If true, sort events by date ascending (upcoming first) */
  sortByDate?: boolean
}>(), {
  title: 'Events',
  showCountBadge: true,
  sortByDate: true
})

const rawList = computed<EventItem[]>(() =>
  props.items?.length ? props.items : source
)

/**
 * Optionally sort by date (ISO string) for a more "professional"
 * upcoming-events feeling.
 */
const list = computed<EventItem[]>(() => {
  if (!props.sortByDate) return rawList.value

  return [...rawList.value].sort((a, b) => {
    const da = new Date(a.date).getTime()
    const db = new Date(b.date).getTime()
    return da - db
  })
})
</script>

<template>
  <section class="dark:bg-gray-950" aria-labelledby="events-grid-title">
    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 sm:py-14 lg:py-20">
      <!-- Heading -->
      <div class="mb-6 sm:mb-8">
         <h2
          id="events-title"
          class="text-2xl sm:text-3xl font-bold tracking-tight"
       
        >
          <span
            class="relative inline-block
                   after:content-[''] after:block after:h-[3px]
                   after:bg-current after:rounded-full after:mt-2"
          >
            {{ title }}
          </span>

          <span
           v-if="showCountBadge"
              class="ml-2 inline-flex items-center justify-center w-5 h-5 rounded-full align-super bg-[#1D50A2] text-white text-[10px] font-semibold leading-none ring-2 ring-white dark:ring-gray-950"
            aria-label="Total events shown"
            title="Total events shown"
          >
            {{ list.length }}
          </span>
        </h2>
      </div>


      <!-- Grid of event cards -->
      <div
        class="grid gap-4 sm:gap-5 lg:gap-6
               grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
      >
        <div
          v-for="(ev, index) in list"
          :key="ev.id"
          class="h-full"
        >
          <EventCard
            :event="ev"
            :index="index"
            class="h-full"
          />
        </div>
      </div>
    </div>
  </section>
</template>
