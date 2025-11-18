<!-- components/about/AboutIntroSection.vue -->
<script setup lang="ts">
import aboutChalkboard from '~/assets/images/about/about-chalkboard.webp'

const text = `
The A. I. Alikhanyan National Science Laboratory (AANL), also known as the Yerevan Physics Institute, is Armenia's premier research institution dedicated to advancing the frontiers of physics and related disciplines. Established in 1943 by brothers Artem and Abraham Alikhanyan, AANL has been at the forefront of scientific discovery, contributing significantly to both national and international scientific communities.
`.trim()

// Static import is hashed & SSR-safe
const img = aboutChalkboard as string
</script>

<template>
  <section class="space-y-6">
    <!-- Title -->
    <h1
      class="inline-block text-2xl sm:text-3xl font-extrabold tracking-tight
             text-gray-900 dark:text-white
             relative after:content-[''] after:block after:h-[3px]
             after:bg-gray-900 after:rounded-full after:mt-2"
    >
      About
    </h1>

    <!-- Paragraph -->
    <p class="text-[15px] leading-relaxed text-gray-700 dark:text-gray-300 whitespace-pre-line">
      {{ text }}
    </p>

    <!-- Image -->
    <div class="mt-6 overflow-hidden rounded-3xl shadow-lg ring-1 ring-black/5 dark:ring-white/10">
      <img
        :src="img"
        alt="About AANL"
        class="w-full h-auto object-cover"
        loading="lazy"
        decoding="async"
      />
    </div>
  </section>
</template>
