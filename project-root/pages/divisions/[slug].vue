<script setup lang="ts">
import { divisions } from '~/data/divisions'

const route = useRoute()
const division = divisions.find(d => d.slug === route.params.slug)

if (!division) {
  throw createError({ statusCode: 404, statusMessage: 'Division not found' })
}

useSeoMeta({
  title: `${division.title} — AANL`,
  description: division.excerpt
})

const mods = import.meta.glob('~/assets/images/divisions/*', { eager: true, import: 'default' }) as Record<string,string>
const byFile = Object.fromEntries(Object.entries(mods).map(([p,u]) => [p.split('/').pop()!, u]))
const cover = byFile[division.image] || ''
</script>

<template>
  <section class="bg-white dark:bg-gray-950">
    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 sm:py-14 lg:py-20">
      <NuxtLink to="/divisions" class="text-sm text-[#1D50A2] font-semibold hover:underline">← Back to divisions</NuxtLink>

      <h1 class="mt-3 text-3xl sm:text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white">
        {{ division.title }}
      </h1>

      <figure class="mt-6 rounded-2xl overflow-hidden ring-1 ring-gray-200/80 dark:ring-white/10">
        <img :src="cover" :alt="division.title" class="w-full h-auto object-cover" />
      </figure>

      <p class="mt-6 text-gray-700 dark:text-gray-300 text-base leading-7 max-w-3xl">
        {{ division.excerpt }}
      </p>

      <!-- Add rich content here -->
    </div>
  </section>
</template>
