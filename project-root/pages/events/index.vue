<!-- pages/events/index.vue -->
<script setup lang="ts">
import { useHead } from '#imports'

import AppBreadcrumbs from '~/components/ui/AppBreadcrumbs.vue'
import EventsGrid from '~/components/events/EventsGrid.vue'
import type { Crumb } from '~/composables/useBreadcrumbs'

useHead({ title: 'Events — AANL' })

const crumbs: Crumb[] = [
  { label: 'Home', to: '/' },
  { label: 'Events' }
]
</script>

<template>
  <div class="dark:bg-gray-950">
    <main class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-6 pb-16">
      <!-- Breadcrumbs -->
      <AppBreadcrumbs :items="crumbs" />

      <!-- Page title + short intro -->
      <section class="mt-8 mb-2">
        <header class="mb-4">
          <h1
            class="inline-block text-2xl sm:text-3xl font-bold tracking-tight
                   text-gray-900 dark:text-white
                   relative after:content-[''] after:block after:h-[3px]
                   after:bg-gray-900 after:rounded-full after:mt-2"
          >
            Events
          </h1>
        </header>

        <p class="text-sm sm:text-[15px] text-gray-600 dark:text-gray-300 max-w-3xl">
          Explore all upcoming seminars, conferences, commemorative meetings and other
          scientific events at A. I. Alikhanyan National Science Laboratory.
        </p>
      </section>

      <!-- Main events listing (grid with EventCard items) -->
      <EventsGrid title="All upcoming events" />
    </main>
  </div>
</template>
