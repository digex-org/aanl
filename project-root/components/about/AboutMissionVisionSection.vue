<!-- components/about/AboutMissionVisionSection.vue -->
<script setup lang="ts">
const mission = `Our mission is to conduct cutting-edge research in experimental and theoretical physics...`
const vision  = `At AANL, our vision is to drive innovation, sustainability, and excellence in every project...`
</script>

<template>
  <section class="grid grid-cols-1 md:grid-cols-2 gap-8">
    <article class="rounded-3xl dark:bg-gray-900 ring-1 ring-black/5 dark:ring-white/10 p-6 sm:p-7">
      <h2 class="text-xl font-semibold text-gray-900 dark:text-white">Mission</h2>
      <p class="mt-3 text-sm sm:text-[15px] leading-relaxed text-gray-700 dark:text-gray-200">
        {{ mission }}
      </p>
      <NuxtLink
        to="/mission" 
        class="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-[#1D50A2] hover:text-[#174088]"
      >
        More
        <svg viewBox="0 0 20 20" class="size-4" fill="none">
          <path d="M5 10h10M11 6l4 4-4 4" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </NuxtLink>
    </article>

    <article class="rounded-3xl dark:bg-gray-900  ring-1 ring-black/5 dark:ring-white/10 p-6 sm:p-7">
      <h2 class="text-xl font-semibold text-gray-900 dark:text-white">Vision</h2>
      <p class="mt-3 text-sm sm:text-[15px] leading-relaxed text-gray-700 dark:text-gray-200">
        {{ vision }}
      </p>
      <NuxtLink
        to="/vision"
        class="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-[#1D50A2] hover:text-[#174088]"
      >
        More
        <svg viewBox="0 0 20 20" class="size-4" fill="none">
          <path d="M5 10h10M11 6l4 4-4 4" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </NuxtLink>
    </article>
  </section>
</template>
