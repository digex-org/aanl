<!-- components/icons/IconBackToTop.vue -->
<script setup lang="ts">
const props = withDefaults(defineProps<{
  /** px value or any CSS size (e.g., 24, "1.5rem") */
  size?: number | string
  /** stroke width for the outline paths */
  strokeWidth?: number
  /** "arrow" (default) or "circle" (arrow in a circle) */
  variant?: 'arrow' | 'circle'
  /** a11y: title for screen readers when decorative=false */
  title?: string
  /** if true, hides from screen readers */
  decorative?: boolean
  /** optional classes to pass through */
  class?: string
}>(), {
  size: 24,
  strokeWidth: 2,
  variant: 'arrow',
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
    <!-- Optional circle container -->
    <circle v-if="variant === 'circle'" cx="12" cy="12" r="10" />

    <!-- Up arrow (same geometry you used inline) -->
    <path d="M12 19V5" />
    <path d="M5 12l7-7 7 7" />
  </svg>
</template>
