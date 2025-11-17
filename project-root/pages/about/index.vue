<!-- pages/about.vue -->
<script setup lang="ts">
import AboutIntroSection from '~/components/about/AboutIntroSection.vue'
import AboutMissionVisionSection from '~/components/about/AboutMissionVisionSection.vue'
import AboutHistorySection from '~/components/about/AboutHistorySection.vue'

useHead({ title: 'About — AANL' })
</script>

<template>
  <div class="min-h-screen  dark:bg-gray-950">
    <main class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14 space-y-20">

      <!-- GRID: left (about), right (mission+vision) -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-20 items-start">

        <!-- LEFT COLUMN -->
        <div class="space-y-10">
          <AboutIntroSection />
         
        </div>

        <!-- RIGHT COLUMN -->
        <div class="space-y-12">
          <AboutMissionVisionSection />
        </div>

      </div>
      <AboutHistorySection  />
    </main>
  </div>
</template>
