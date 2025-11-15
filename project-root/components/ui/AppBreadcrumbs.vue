<script setup lang="ts">
import type { Crumb } from '~/composables/useBreadcrumbs'

const props = withDefaults(defineProps<{
  items: Crumb[]
  /** show the last as plain text (current page) */
  currentIsPlain?: boolean
}>(), {
  currentIsPlain: true
})
</script>

<template>
  <nav aria-label="Breadcrumb" class="w-full">
    <ol class="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm">
      <li v-for="(c, i) in items" :key="i" class="flex items-center">
        <template v-if="i < items.length - 1 || !currentIsPlain">
          <NuxtLink
            v-if="c.to"
            :to="c.to"
            class="text-gray-600 hover:text-[--brand-navy] hover:underline dark:text-gray-300"
          >{{ c.label }}</NuxtLink>
          <span v-else class="text-gray-900 dark:text-white">{{ c.label }}</span>
        </template>
        <template v-else>
          <span class="text-gray-900 dark:text-white font-medium" aria-current="page">{{ c.label }}</span>
        </template>

        <span
          v-if="i < items.length - 1"
          class="mx-2 select-none text-gray-400"
          aria-hidden="true"
        >›</span>
      </li>
    </ol>
  </nav>
</template>
