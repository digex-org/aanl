<script setup lang="ts">
const props = withDefaults(defineProps<{
  /**
   * Visual variant:
   * - "card"       → white card on neutral background
   * - "soft"       → soft tinted background (for info blocks)
   * - "outlined"   → subtle border only
   */
  variant?: 'card' | 'soft' | 'outlined'
  /** When true, apply standard internal padding */
  padded?: boolean
}>(), {
  variant: 'card',
  padded: true
})

const base =
  'rounded-3xl shadow-md ring-1 ring-black/5 dark:ring-white/10 ' +
  'dark:bg-gray-900'

const variantClass = computed(() => {
  switch (props.variant) {
    case 'soft':
      return 'bg-[#EDF4FF] dark:bg-slate-900'
    case 'outlined':
      return 'bg-transparent shadow-none ring-1 ring-gray-200 dark:ring-gray-700'
    default:
      return 'bg-white'
  }
})

const paddingClass = computed(() =>
  props.padded ? 'px-5 sm:px-7 lg:px-8 py-5 sm:py-6 lg:py-7' : ''
)
</script>

<template>
  <section :class="[base, variantClass, paddingClass]">
    <slot />
  </section>
</template>
