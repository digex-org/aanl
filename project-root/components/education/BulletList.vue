<script setup lang="ts">
type BulletItem =
  | string
  | {
      text: string
      href?: string
    }

const props = withDefaults(defineProps<{
  items: BulletItem[]
  /**
   * dot   – small filled circle
   * check – checkmark icon
   * dash  – simple dash bullet
   */
  variant?: 'dot' | 'check' | 'dash'
  /** Font size / spacing preset */
  size?: 'sm' | 'base'
  /** Extra classes for the <ul> */
  listClass?: string
}>(), {
  variant: 'dot',
  size: 'base',
  listClass: ''
})

function getText(item: BulletItem) {
  return typeof item === 'string' ? item : item.text
}

function getHref(item: BulletItem) {
  return typeof item === 'string' ? undefined : item.href
}

const sizeClasses = computed(() => {
  return props.size === 'sm'
    ? 'text-xs sm:text-[13px] space-y-1.5'
    : 'text-sm sm:text-[15px] space-y-2'
})
</script>

<template>
  <ul
    class="text-gray-700 dark:text-gray-200"
    :class="[sizeClasses, listClass]"
  >
    <li
      v-for="(item, index) in items"
      :key="index"
      class="flex gap-3"
    >
      <!-- Bullet icon -->
      <span class="mt-1 flex h-4 w-4 flex-none items-center justify-center">
        <!-- Dot -->
        <span
          v-if="variant === 'dot'"
          class="h-1.5 w-1.5 rounded-full bg-[#1D50A2]"
        />
        <!-- Dash -->
        <span
          v-else-if="variant === 'dash'"
          class="h-[2px] w-3 rounded bg-[#1D50A2]"
        />
        <!-- Check -->
        <svg
          v-else
          viewBox="0 0 16 16"
          class="h-3.5 w-3.5 text-[#1D50A2]"
          aria-hidden="true"
        >
          <path
            d="M4 8.5 6.5 11 12 5"
            fill="none"
            stroke="currentColor"
            stroke-width="1.6"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </span>

      <!-- Text -->
      <span class="flex-1">
        <a
          v-if="getHref(item)"
          :href="getHref(item)"
          class="underline decoration-[#1D50A2]/60 underline-offset-2 hover:text-[#1D50A2]"
        >
          {{ getText(item) }}
        </a>
        <span v-else>
          {{ getText(item) }}
        </span>
      </span>
    </li>
  </ul>
</template>
