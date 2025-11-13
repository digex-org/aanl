<script setup lang="ts">
const props = withDefaults(defineProps<{
  size?: number | string
  strokeWidth?: number
  title?: string            // a11y label (if decorative=false)
  decorative?: boolean      // true = aria-hidden
  class?: string
}>(), {
  size: 24,
  strokeWidth: 2,
  decorative: true
})
</script>

<template>
  <svg
    :width="size"
    :height="size"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    :stroke-width="strokeWidth"
    stroke-linecap="round"
    stroke-linejoin="round"
    :aria-hidden="decorative ? 'true' : undefined"
    :role="decorative ? undefined : 'img'"
    :aria-label="!decorative && title ? title : undefined"
    :class="class"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="11" cy="11" r="7" />
    <path d="M20 20l-3.5-3.5" />
  </svg>
</template>
