<!-- pages/about.vue -->
<script setup lang="ts">
import AboutIntroSection from '~/components/about/AboutIntroSection.vue'
import AboutMissionVisionSection from '~/components/about/AboutMissionVisionSection.vue'

useHead({ title: 'About — AANL' })
</script>

<template>
  <div class="min-h-screen bg-[#F3F4F6] dark:bg-gray-950">
    <main class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 sm:py-14 lg:py-16 space-y-16 lg:space-y-20">
      <AboutIntroSection />
      <AboutMissionVisionSection />

    </main>
  </div>
</template>
