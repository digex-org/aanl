<script setup lang="ts">
import type { PostgraduateTabKey, PostgraduateTab } from '~/data/postgraduate'

const props = defineProps<{
  items: PostgraduateTab[]
  activeKey: PostgraduateTabKey
}>()
</script>

<template>
  <nav
    aria-label="Postgraduate navigation"
    class="mt-6 mb-8"
  >
    <div
      class="inline-flex flex-wrap gap-2 rounded-full bg-[#0B1843]/5 p-1
             ring-1 ring-gray-200"
    >
      <NuxtLink
        v-for="tab in items"
        :key="tab.key"
        :to="tab.to"
        class="px-4 sm:px-5 h-9 inline-flex items-center justify-center rounded-full
               text-xs sm:text-sm font-medium transition-colors"
        :class="tab.key === activeKey
          ? 'bg-[#0B1843] text-white shadow-sm'
          : 'text-gray-700 hover:bg-gray-100'"
      >
        {{ tab.label }}
      </NuxtLink>
    </div>
  </nav>
</template>
