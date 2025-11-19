<script setup lang="ts">
const props = withDefaults(defineProps<{
  title?: string
  /**
   * info     – neutral blue
   * accent   – stronger brand block (hero-like)
   * warning  – yellow-ish note
   */
  variant?: 'info' | 'accent' | 'warning'
  /** Optional small label above title ("Important", "Note", etc.) */
  eyebrow?: string
}>(), {
  variant: 'info',
  title: '',
  eyebrow: ''
})

const wrapperClasses = computed(() => {
  switch (props.variant) {
    case 'accent':
      return 'bg-[#0B1843] text-white'
    case 'warning':
      return 'bg-[#FFF7E0] text-gray-900'
    default:
      return 'bg-[#EDF4FF] text-gray-900'
  }
})

const iconClasses = computed(() => {
  switch (props.variant) {
    case 'accent':
      return 'bg-white/10 text-white'
    case 'warning':
      return 'bg-white text-[#C27803]'
    default:
      return 'bg-white text-[#1D50A2]'
  }
})
</script>

<template>
  <section
    class="rounded-2xl border border-transparent px-4 py-4 sm:px-5 sm:py-4"
    :class="wrapperClasses"
  >
    <div class="flex items-start gap-3 sm:gap-4">
      <!-- Icon -->
      <div
        class="mt-0.5 flex h-9 w-9 flex-none items-center justify-center rounded-full shadow-sm"
        :class="iconClasses"
        aria-hidden="true"
      >
        <!-- You can replace this with a dedicated icon later -->
        <span class="text-sm font-semibold">i</span>
      </div>

      <!-- Content -->
      <div class="flex-1 space-y-2 text-xs sm:text-[13px] leading-relaxed">
        <div v-if="eyebrow || title">
          <p
            v-if="eyebrow"
            class="text-[11px] uppercase tracking-wide opacity-80"
          >
            {{ eyebrow }}
          </p>
          <h3
            v-if="title"
            class="text-sm sm:text-[15px] font-semibold"
          >
            {{ title }}
          </h3>
        </div>

        <!-- Slot for arbitrary rich content: text, lists, links, etc. -->
        <div class="space-y-2">
          <slot />
        </div>
      </div>
    </div>
  </section>
</template>
