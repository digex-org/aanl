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
      <rect
        x="2" y="5" width="20" height="14" rx="2"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linejoin="round"
      />
      <path
        d="M22 8L12 14 2 8"
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
        d="M4 5h16a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2Zm8.53 7.16L21 8.61V7.9a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v.71l8.47 3.55a1.6 1.6 0 0 0 1.06 0Z"
      />
    </template>
  </svg>
</template>
