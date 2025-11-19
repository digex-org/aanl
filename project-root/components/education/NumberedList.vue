<script setup lang="ts">
const props = withDefaults(defineProps<{
  /** List items (simple text for now) */
  items: string[]
  /** Starting number (1-based) */
  start?: number
  /**
   * Visual style of the circular counter
   * - solid-brand      → brand background, white text
   * - soft-brand       → light brand background, brand text
   * - white-on-brand   → white badge, brand text
   */
  variant?: 'solid-brand' | 'soft-brand' | 'white-on-brand'
  /** Extra classes for the list text (optional) */
  textClass?: string
}>(), {
  start: 1,
  variant: 'solid-brand',
  textClass: ''
})

const badgeClass = computed(() => {
  switch (props.variant) {
    case 'soft-brand':
      return 'bg-[#EDF4FF] text-[#1D50A2]'
    case 'white-on-brand':
      return 'bg-white text-[#1D50A2]'
    default:
      return 'bg-[#1D50A2] text-white'
  }
})
</script>

<template>
  <ol
    class="space-y-2 text-xs sm:text-[13px] text-gray-700 dark:text-gray-200"
    :class="textClass"
  >
    <li
      v-for="(item, index) in items"
      :key="index"
      class="flex gap-3"
    >
      <span
        class="mt-1 flex h-6 w-6 flex-none items-center justify-center
               rounded-full text-[11px] font-semibold shadow-sm"
        :class="badgeClass"
      >
        {{ start + index }}
      </span>
      <span class="flex-1">
        {{ item }}
      </span>
    </li>
  </ol>
</template>
