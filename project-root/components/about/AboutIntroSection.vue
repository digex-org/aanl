<!-- components/about/AboutIntroSection.vue -->
<script setup lang="ts">
const introText = `
The A. I. Alikhanyan National Science Laboratory (AANL), also known as the Yerevan Physics Institute, is Armenia's premier research institution dedicated to advancing the frontiers of physics and related disciplines. ...
`.trim()

const heroImage = new URL('/assets/images/about/about-chalkboard.webp', import.meta.url).href
</script>

<template>
  <section class="grid grid-cols-1 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.9fr)] gap-10 items-start">
    <div>
      <h1 class="text-3xl sm:text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white">
        About
      </h1>
      <p class="mt-5 text-sm sm:text-[15px] leading-relaxed text-gray-700 dark:text-gray-200 whitespace-pre-line">
        {{ introText }}
      </p>
    </div>

    <div class="max-w-md lg:ml-auto">
      <div class="overflow-hidden rounded-3xl shadow-md ring-1 ring-black/5">
        <img
          :src="heroImage"
          alt="Scientific formulas on board"
          class="w-full h-full object-cover"
          loading="lazy"
          decoding="async"
        />
      </div>
    </div>
  </section>
</template>
