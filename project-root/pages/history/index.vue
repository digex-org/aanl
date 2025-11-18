<!-- pages/history/index.vue -->
<script setup lang="ts">
import { useHead } from '#imports'

import AboutHistorySection from '~/components/about/AboutHistorySection.vue'
import AppBreadcrumbs from '~/components/ui/AppBreadcrumbs.vue'
import { ABOUT_HISTORY } from '~/data/about-history'

useHead({ title: 'History — AANL' })

const crumbs = [
  { label: 'Home', to: '/' },
  { label: 'About', to: '/about' },
  { label: 'History' } // current page
]
</script>

<template>
  <div class="min-h-screen bg-[#F3F4F6] dark:bg-gray-950">
    <main
      class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8
             py-10 sm:py-14 lg:py-16 space-y-10 lg:space-y-14"
    >
      <!-- Header + breadcrumbs -->
      <header class="space-y-4">
        <AppBreadcrumbs :items="crumbs" />

        <div class="max-w-3xl">
          <h1
            class="inline-block text-2xl sm:text-3xl lg:text-4xl font-extrabold
                   tracking-tight text-gray-900 dark:text-white
                   relative
                   after:content-[''] after:block after:h-[3px]
                   after:bg-gray-900 dark:after:bg-white
                   after:rounded-full after:mt-2"
          >
            History
          </h1>

          <p
            class="mt-4 text-sm sm:text-[15px] leading-relaxed
                   text-gray-700 dark:text-gray-300"
          >
            Since its founding in 1943, the A. I. Alikhanyan National Science
            Laboratory has played a key role in the development of physics and
            related disciplines in Armenia and worldwide. Explore the key
            milestones that shaped the laboratory’s scientific journey.
          </p>
        </div>
      </header>

      <!-- Main history block (same visual style as on About page) -->
      <AboutHistorySection :items="ABOUT_HISTORY" />
    </main>
  </div>
</template>
