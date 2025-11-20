<!-- pages/events/[slug].vue -->
<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useHead } from '#imports'

import AppBreadcrumbs from '~/components/ui/AppBreadcrumbs.vue'
import type { Crumb } from '~/composables/useBreadcrumbs'
import { events, type EventItem } from '~/data/events'

/* ---------- Route / current event ---------- */
const route = useRoute()
const slug = computed(() => String(route.params.slug || ''))

const event = computed<EventItem | undefined>(() =>
  events.find(e => e.slug === slug.value)
)

/* ---------- Breadcrumbs ---------- */
const crumbs = computed<Crumb[]>(() => [
  { label: 'Home', to: '/' },
  { label: 'Events', to: '/events' },
  { label: event.value?.title ?? 'Event' }
])

/* ---------- SEO ---------- */
useHead(() => ({
  title: event.value
    ? `${event.value.title} — Events — AANL`
    : 'Event — AANL'
}))

/* ---------- Date helpers ---------- */
const monthNames = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December'
]

const dayMonthYear = computed(() => {
  if (!event.value) return ''
  const d = new Date(event.value.date)
  const day = d.getDate()
  const month = monthNames[d.getMonth()]
  const year = d.getFullYear()
  return `${day} ${month} ${year}`
})

const dayNumber = computed(() => {
  if (!event.value) return ''
  return String(new Date(event.value.date).getDate())
})

const monthLabel = computed(() => {
  if (!event.value) return ''
  return monthNames[new Date(event.value.date).getMonth()]
})

/* ---------- Accent → hero top bar gradient ---------- */
function accentGradient(e?: EventItem) {
  const accent = e?.accent ?? 'blue'

  switch (accent) {
    case 'pink':
      return 'from-pink-600 via-rose-500 to-rose-400'
    case 'orange':
      return 'from-orange-500 via-amber-400 to-amber-300'
    case 'green':
      return 'from-emerald-500 via-teal-400 to-teal-300'
    case 'blue':
    default:
      return 'from-[#0B1840] via-[#163770] to-[#1D50A2]'
  }
}
</script>

<template>
  <!-- If event exists -->
  <div v-if="event" class="dark:bg-gray-950">
    <main class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-6 pb-16">
      <!-- Breadcrumbs -->
      <AppBreadcrumbs :items="crumbs" />

      <!-- HERO: gradient card with date + title -->
      <section class="mt-6">
        <div
          class="relative overflow-hidden rounded-3xl text-white
                 shadow-lg ring-1 ring-black/10 dark:ring-black/40
                 bg-gradient-to-r"
          :class="accentGradient(event)"
        >
          <!-- Subtle overlay -->
          <div class="absolute inset-0 bg-black/15 mix-blend-multiply" aria-hidden="true" />

          <div class="relative px-6 py-7 sm:px-8 sm:py-9 lg:px-10">
            <div class="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
              <!-- Left: date + title -->
              <div class="flex items-start gap-4">
                <!-- Date badge -->
                <div class="rounded-xl bg-white/10 px-3.5 py-2 text-center leading-tight">
                  <div class="text-xl sm:text-2xl font-extrabold">
                    {{ dayNumber }}
                  </div>
                  <div class="text-[11px] uppercase tracking-wide font-semibold opacity-90">
                    {{ monthLabel }}
                  </div>
                </div>

                <!-- Title + meta -->
                <div>
                  <p class="text-xs sm:text-[13px] font-semibold uppercase tracking-wide text-white/80">
                    Upcoming event
                  </p>
                  <h1
                    class="mt-1 text-2xl sm:text-3xl lg:text-[30px]
                           font-extrabold leading-snug sm:leading-snug"
                  >
                    {{ event.title }}
                  </h1>

                  <div class="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs sm:text-[13px] text-white/85">
                    <span>{{ dayMonthYear }}</span>
                    <span v-if="event.time" class="inline-flex items-center gap-1">
                      <span class="h-1 w-1 rounded-full bg-white/70" />
                      <span>{{ event.time }}</span>
                    </span>
                  </div>
                </div>
              </div>

              <!-- Right: optional CTA (e.g. registration / calendar) -->
              <div class="flex flex-col items-start sm:items-end gap-2 text-xs sm:text-[13px]">
                <NuxtLink
                  to="/events"
                  class="inline-flex items-center justify-center rounded-full
                         bg-white/10 px-4 h-9 text-[13px] font-semibold
                         hover:bg-white/20 border border-white/30
                         transition-colors"
                >
                  All events
                </NuxtLink>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- CONTENT CARD -->
      <section class="mt-8">
        <article
          class="mx-auto max-w-3xl lg:max-w-4xl
                 rounded-3xl bg-white dark:bg-gray-900
                 shadow-xl ring-1 ring-black/5 dark:ring-white/10
                 px-5 sm:px-7 lg:px-10 py-6 sm:py-7 lg:py-8"
        >
          <!-- Lead paragraph -->
          <p
            v-if="event.blurb"
            class="text-sm sm:text-[15px] leading-relaxed text-gray-700 dark:text-gray-200"
          >
            {{ event.blurb }}
          </p>

          <!-- Placeholder if no extra content yet -->
          <p
            v-else
            class="text-sm sm:text-[15px] leading-relaxed text-gray-700 dark:text-gray-200"
          >
            Detailed information about this event will be published soon.
          </p>

          <!-- Here you can later add structured sections (agenda, speakers, location, etc.) -->
        </article>
      </section>
    </main>
  </div>

  <!-- Fallback if event not found -->
  <div v-else class="mx-auto max-w-3xl px-4 py-16 text-center dark:bg-gray-950">
    <h1 class="text-2xl font-semibold text-gray-900 dark:text-white">
      Event not found
    </h1>
    <p class="mt-2 text-sm text-gray-600 dark:text-gray-300">
      Please check the URL or return to the
      <NuxtLink to="/events" class="text-[--brand-navy] hover:underline">
        Events
      </NuxtLink>
      page.
    </p>
  </div>
</template>
