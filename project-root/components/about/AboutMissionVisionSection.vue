<!-- components/about/AboutMissionVisionSection.vue -->
<script setup lang="ts">
const mission = `
Our mission is to conduct cutting-edge research in experimental and theoretical physics, foster innovation in quantum technologies, and explore the mysteries of cosmology and astrophysics. We are committed to providing high-quality education and training to the next generation of scientists through our graduate and postgraduate programs.
`.trim()

const vision = `
At AANL, our vision is to drive innovation, sustainability, and excellence in every project we undertake. We strive to create impactful solutions that contribute to the development of industries and communities, setting a benchmark for quality and reliability. Our commitment is to empower progress and inspire a brighter future through collaboration, cutting-edge technology, and a deep understanding of our clients' needs.
`.trim()
</script>

<template>
  <section class="space-y-12">

    <!-- Mission -->
    <div>
      <h2 class="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-white">Mission</h2>

      <p class="mt-3 text-[15px] leading-relaxed text-gray-700 dark:text-gray-300">
        {{ mission }}
      </p>

      <NuxtLink
        to="/mission"
        class="inline-flex items-center gap-2 mt-5 px-5 py-2 rounded-full border border-[#1D50A2] text-[#1D50A2] font-medium hover:bg-[#1D50A2]/10 transition"
      >
        More
        <svg viewBox="0 0 20 20" class="w-4 h-4">
          <path d="M5 10h10M11 6l4 4-4 4" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </NuxtLink>
    </div>

    <!-- Vision -->
    <div>
      <h2 class="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-white">Vision</h2>

      <p class="mt-3 text-[15px] leading-relaxed text-gray-700 dark:text-gray-300">
        {{ vision }}
      </p>

      <NuxtLink
        to="/vision"
        class="inline-flex items-center gap-2 mt-5 px-5 py-2 rounded-full border border-[#1D50A2] text-[#1D50A2] font-medium hover:bg-[#1D50A2]/10 transition"
      >
        More
        <svg viewBox="0 0 20 20" class="w-4 h-4">
          <path d="M5 10h10M11 6l4 4-4 4" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </NuxtLink>
    </div>

  </section>
</template>
