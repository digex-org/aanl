<script setup lang="ts">
const props = withDefaults(defineProps<{
  size?: number | string
  variant?: 'solid' | 'outline'
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
    <!-- Solid pin -->
    <template v-if="variant === 'solid'">
      <path
        fill="currentColor"
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M12 2.25a7.25 7.25 0 0 0-7.25 7.25c0 4.87 5.56 10.34 6.93 11.62a.99.99 0 0 0 1.64 0c1.37-1.28 6.93-6.75 6.93-11.62A7.25 7.25 0 0 0 12 2.25Zm0 4.5a2.75 2.75 0 1 1 0 5.5 2.75 2.75 0 0 1 0-5.5Z"
      />
    </template>

    <!-- Outline pin -->
    <template v-else>
      <path
        d="M12 21s-7-6.2-7-11A7 7 0 0 1 19 10c0 4.8-7 11-7 11Z"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <circle
        cx="12" cy="10" r="3"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
      />
    </template>
  </svg>
</template>
