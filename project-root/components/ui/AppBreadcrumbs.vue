<!-- components/ui/AppBreadcrumbs.vue -->
<script setup lang="ts">
import { computed } from 'vue'
import type { Crumb } from '~/composables/useBreadcrumbs'

const props = withDefaults(defineProps<{
  items: Crumb[]
  /** show the last as plain text (current page) */
  currentIsPlain?: boolean
  /** visual style: default (on light) or light-on-dark (on dark banners) */
  variant?: 'default' | 'light-on-dark'
}>(), {
  currentIsPlain: true,
  variant: 'default'
})

const isLightOnDark = computed(() => props.variant === 'light-on-dark')
</script>

<template>
  <nav aria-label="Breadcrumb" class="w-full">
    <ol class="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm">
      <li v-for="(c, i) in items" :key="i" class="flex items-center">
        <!-- Links / intermediate items -->
        <template v-if="i < items.length - 1 || !currentIsPlain">
          <NuxtLink
            v-if="c.to"
            :to="c.to"
            :class="[
              'hover:underline',
              isLightOnDark
                ? 'text-white hover:text-white'
                : 'text-gray-600 hover:text-[--brand-navy] dark:text-gray-300'
            ]"
          >
            {{ c.label }}
          </NuxtLink>

          <span
            v-else
            :class="isLightOnDark ? 'text-white' : 'text-gray-900 dark:text-white'"
          >
            {{ c.label }}
          </span>
        </template>

        <!-- Current page -->
        <template v-else>
          <span
            class="font-medium"
            :class="isLightOnDark ? 'text-white' : 'text-gray-900 dark:text-white'"
            aria-current="page"
          >
            {{ c.label }}
          </span>
        </template>

        <!-- Separator -->
        <span
          v-if="i < items.length - 1"
          :class="isLightOnDark ? 'mx-2 text-white select-none' : 'mx-2 text-gray-400 select-none'"
          aria-hidden="true"
        >
          ›
        </span>
      </li>
    </ol>
  </nav>
</template>
