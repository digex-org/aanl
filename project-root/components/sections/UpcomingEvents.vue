<script setup lang="ts">
type EventItem = {
  id: string | number
  title: string
  href?: string
  date: string        // ISO date, e.g. "2025-09-07T10:00:00+04:00"
  time?: string       // e.g. "10:00–11:30"
  blurb?: string      // optional short description
  accent?: 'blue' | 'pink' | 'orange' | 'green' // top color
}

const props = withDefaults(defineProps<{
  title?: string
  allHref?: string
  events?: EventItem[]
  iconTo?: string
  iconLabel?: string
}>(), {
  title: 'Upcoming events',
  allHref: '/events'
})

// --- Default demo data (replace with real API/CMS or pass via props) ---
const demo: EventItem[] = [
  { id: 1, title: 'Evolving Universe: Theory and Observations Starobinsky Memorial Conference', date: '2025-09-07T10:00:00+04:00', time: '10:00–11:30', accent: 'purple' as any },
  { id: 2, title: '75th anniversary of prof. Norayr Akopov', date: '2025-09-18T10:00:00+04:00', time: '10:00–11:30', accent: 'pink' as any },
  { id: 3, title: 'International Conference on Particle Physics and Cosmology dedicated to Prof. Rubakov memory', date: '2025-09-29T10:00:00+04:00', time: '10:00–11:30', accent: 'orange' as any },
  { id: 4, title: 'VI Matinyan seminar', date: '2025-10-04T10:00:00+04:00', time: '10:00–11:30', accent: 'green' as any }
]

// Use provided events or fallback
const items = computed<EventItem[]>(() => props.events?.length ? props.events : demo)

// Helpers
const monthNames = ['january', 'february', 'march', 'april', 'may', 'june', 'july', 'august', 'september', 'october', 'november', 'december']
function parts(iso: string) {
  const d = new Date(iso)
  return {
    day: String(d.getDate()),
    month: monthNames[d.getMonth()],
  }
}

// Map accent to Tailwind classes
function topAccent(accent?: EventItem['accent'], i?: number) {
  const c = accent ?? (['blue', 'pink', 'orange', 'green'] as const)[(i ?? 0) % 4]
  switch (c) {
    case 'pink': return 'before:bg-gradient-to-r before:from-pink-500 before:to-rose-400'
    case 'orange': return 'before:bg-gradient-to-r before:from-orange-400 before:to-amber-400'
    case 'green': return 'before:bg-gradient-to-r before:from-emerald-400 before:to-teal-400'
    default: return 'before:bg-gradient-to-r before:from-[#1D50A2] before:to-blue-400'
  }
}
</script>

<template>
  <section class="dark:bg-gray-950" aria-labelledby="events-title">
    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 sm:py-14 lg:py-20">
      <!-- Heading -->
      <div class="mb-6 sm:mb-8 flex items-center justify-between">
        <!-- Left: title + counter -->

        <h2 id="events-title" class="text-2xl sm:text-3xl font-bold tracking-tight text-gray-900 dark:text-white">

          <span class="relative inline-block
           after:content-[''] after:block after:h-[3px] after:bg-gray-900
           after:rounded-full after:mt-2">
            {{ title }}
          </span>
          <span class="ml-2 inline-flex items-center justify-center
             w-5 h-5 rounded-full align-super
             bg-[#1D50A2] text-white text-[10px] font-semibold leading-none
             ring-2 ring-white dark:ring-gray-950" aria-label="Total events" title="Total events">
            {{ items.length }}
          </span>

        </h2>

        <!-- Right: circular icon button -->
        <NuxtLink :to="iconTo" :aria-label="iconLabel" class="group inline-flex items-center justify-center
           w-10 h-10 rounded-full
           bg-[#1F6FD3] text-white
           ring-2 ring-white dark:ring-gray-900
           shadow-md hover:shadow-lg
           transition transform hover:-translate-y-0.5 focus-visible:outline-none
           focus-visible:ring-2 focus-visible:ring-[#1D50A2] focus-visible:ring-offset-2" title="Open events calendar">
          <IconsIconIvent class="w-8 h-8 shrink-0" />
        </NuxtLink>
      </div>



      <!-- Cards: horizontal snap on mobile, 4-col grid on desktop -->
      <div class="snap-x snap-mandatory overflow-x-auto -mx-4 px-4 sm:mx-0 sm:px-0
               flex gap-4 sm:grid sm:gap-6 sm:grid-cols-2 lg:grid-cols-4" role="list"
        aria-label="Upcoming events list">
        <article v-for="(ev, i) in items" :key="ev.id" role="listitem" :class="[
          'relative min-w-[82%] xs:min-w-[70%] sm:min-w-0',
          'rounded-xl  bg-white dark:bg-gray-900',
          'shadow-[0_1px_2px_rgba(0,0,0,0.05)] transition hover:shadow-lg hover:-translate-y-0.5',
          'snap-start',
          'before:absolute before:inset-x-0 before:top-0 before:h-[6px] before:rounded-t-2xl',
          topAccent(ev.accent, i)
        ]">
          <div class="p-4 sm:p-5">
            <!-- Date row -->
            <div class="flex items-start gap-3">
              <div class="rounded-md bg-[#1D50A2] text-white px-2.5 py-1 leading-none">
                <span class="block text-base font-bold">{{ parts(ev.date).day }}</span>
              </div>
              <div class="mt-0.5">
                <div class="text-xs font-semibold uppercase tracking-wide text-[#1D50A2]">
                  {{ parts(ev.date).month }}
                </div>
                <div class="text-[11px] text-gray-500 dark:text-gray-400">
                  {{ ev.time || '' }}
                </div>
              </div>
            </div>

            <hr class="my-3 border-gray-200/80 dark:border-white/10" />

            <!-- Title -->
            <h3 class="text-[17px] leading-snug font-semibold text-gray-900 dark:text-gray-100">
              <NuxtLink :to="ev.href || '#'"
                class="hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1D50A2] rounded">
                {{ ev.title }}
              </NuxtLink>
            </h3>

            <!-- Optional blurb -->
            <p v-if="ev.blurb" class="mt-1 text-sm text-gray-600 dark:text-gray-300 line-clamp-2">
              {{ ev.blurb }}
            </p>
          </div>
        </article>
      </div>

      <!-- Bottom-centered “All Events” -->
      <div class="mt-8 flex justify-center">
        <NuxtLink :to="allHref" class="group inline-flex items-center justify-center gap-2
                 h-[50px] rounded-[130px] px-6
                 text-[15px] font-semibold
                 text-[#1D50A2] border-2 border-[#1D50A2]
                 hover:bg-[#1D50A2] hover:text-white
                 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1D50A2] focus-visible:ring-offset-2
                 transition">
          <span>All Events</span>
          <svg class="size-4 shrink-0 transition-transform duration-200 ease-out group-hover:translate-x-1"
            viewBox="0 0 20 20" fill="none" aria-hidden="true">
            <path d="M4 10h10" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" />
            <path d="M10 5l5 5-5 5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"
              stroke-linejoin="round" />
          </svg>
        </NuxtLink>
      </div>
    </div>
  </section>
</template>
