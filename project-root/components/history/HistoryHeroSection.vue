<!-- components/history/HistoryHeroSection.vue -->
<script setup lang="ts">
import { computed } from 'vue'
import AppBreadcrumbs from '~/components/ui/AppBreadcrumbs.vue'
import type { Crumb } from '~/composables/useBreadcrumbs'

const props = withDefaults(defineProps<{
  title?: string
  /** Breadcrumb items for top-left trail */
  breadcrumbs?: Crumb[]
  /**
   * Hero image file name in ~/assets/images/history/*
   * e.g. 'history-hero.webp'
   */
  imageFile?: string
}>(), {
  title: 'History',
  breadcrumbs: () => [],
  imageFile: 'history-hero.webp'
})

/* ---------- SSR-safe local image resolution ---------- */
const heroImageMods = import.meta.glob('~/assets/images/about/history/*', {
  eager: true,
  import: 'default'
}) as Record<string, string>

const heroImageByFile = Object.fromEntries(
  Object.entries(heroImageMods).map(([p, u]) => [p.split('/').pop()!, u])
)

const heroSrc = computed(() => heroImageByFile[props.imageFile] || props.imageFile)
</script>

<template>
  <section class="relative  isolate overflow-hidden bg-gray-900">
    <!-- Background image -->
    <img
      :src="heroSrc"
      :alt="title"
      class="w-full h-[220px] sm:h-[260px] lg:h-[300px] object-cover"
      loading="eager"
      decoding="async"
      fetchpriority="high"
    />

    <!-- Dark overlay to improve text contrast -->
    <div
      class="pointer-events-none absolute inset-0
             bg-[linear-gradient(180deg,rgba(0,0,0,0.55),rgba(0,0,0,0.35))]"
    />

    <!-- Content -->
    <div class="absolute inset-0">
      <div class="mx-auto flex h-full max-w-7xl flex-col px-4 pt-5 sm:px-6 lg:px-8">
        <!-- Breadcrumbs -->
        <div class="text-white/80">
          <AppBreadcrumbs
            v-if="breadcrumbs?.length"
            :items="breadcrumbs"
            variant="light-on-dark"
          />
        </div>

        <!-- Title -->
        <div class="mt-auto pb-6 sm:pb-8">
          <h1 class="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
            {{ title }}
          </h1>
        </div>
      </div>
    </div>
  </section>
</template>
