<script setup lang="ts">
const props = withDefaults(defineProps<{
  size?: number | string
  variant?: 'outline' | 'solid'
  title?: string
  decorative?: boolean
  class?: string
}>(), {
  size: 24,
  variant: 'outline',
  decorative: true
})
</script>

<template>
  <svg
    :width="size"
    :height="size"
    viewBox="0 0 24 24"
    :class="class"
    xmlns="http://www.w3.org/2000/svg"
    :aria-hidden="decorative ? 'true' : undefined"
    :role="decorative ? undefined : 'img'"
    :aria-label="!decorative && title ? title : undefined"
  >
    <!-- Outline variant -->
    <template v-if="variant === 'outline'">
      <path
        d="M22 16.92v2a2 2 0 0 1-2.18 2 19.9 19.9 0 0 1-8.67-3.07 19.58 19.58 0 0 1-6-6A19.9 19.9 0 0 1 2.08 4.2 2 2 0 0 1 4.06 2h2a2 2 0 0 1 2 1.72c.12.9.33 1.77.62 2.6a2 2 0 0 1-.45 2.11L7.7 9.96a16 16 0 0 0 6.34 6.34l1.5-1.54a2 2 0 0 1 2.11-.45c.83.29 1.7.5 2.6.62A2 2 0 0 1 22 16.92Z"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </template>

    <!-- Solid variant -->
    <template v-else>
      <path
        fill="currentColor"
        d="M21.82 18.92c.08.57-.12 1.14-.54 1.54a2.1 2.1 0 0 1-1.46.56c-2.04 0-5.57-.86-9.2-3.09-3.57-2.2-6.12-4.96-7.74-8.23C1.1 6.55.78 4.41 1.03 3.1c.1-.54.43-1 .9-1.28.46-.27 1.02-.32 1.53-.16l2 .62c.49.15.87.54 1.01 1.03.23.81.47 1.58.74 2.32.17.45.07.96-.25 1.32L6.63 8.62c1.39 2.54 3.43 4.58 6.02 6.05l1.73-1.71c.36-.32.87-.41 1.32-.25.74.27 1.51.51 2.32.74.49.14.88.52 1.03 1.01l.62 2c.06.21.08.42.05.63Z"
      />
    </template>
  </svg>
</template>
