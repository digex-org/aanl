<!-- components/about/AboutDirectorateSection.vue -->
<script setup lang="ts">
import { DIRECTORATE } from '~/data/about-directorate'
import PersonCard from '~/components/people/PersonCard.vue'

const photoMods = import.meta.glob('~/assets/images/directorate/*', {
  eager: true,
  import: 'default'
}) as Record<string, string>

const photoByFile = Object.fromEntries(
  Object.entries(photoMods).map(([p, u]) => [p.split('/').pop()!, u])
)

const photoSrc = (file: string) => photoByFile[file] || file
</script>

<template>
  <section class="space-y-6">
    <header class="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
      <div class="max-w-xl">
        <h2 class="text-2xl sm:text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
          Directorate
        </h2>
        <p class="mt-2 text-sm sm:text-[15px] text-gray-700 dark:text-gray-200">
          The Directorate of the Armenian National Laboratory (AANL) oversees the strategic planning,
          administration, and coordination of the laboratory’s operations.
        </p>
      </div>

      <NuxtLink
        to="/governance/directorate"
        class="inline-flex items-center gap-2 rounded-full border border-[#1D50A2] px-4 py-2 text-sm font-semibold text-[#1D50A2] hover:bg-[#1D50A2] hover:text-white"
      >
        More
      </NuxtLink>
    </header>

    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      <PersonCard
        v-for="m in DIRECTORATE"
        :key="m.id"
        :name="m.name"
        :role="m.role"
        :credentials="undefined"
        :photo-src="photoSrc(m.photo)"
      />
    </div>
  </section>
</template>
