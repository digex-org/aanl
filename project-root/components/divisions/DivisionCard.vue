<script setup lang="ts">
import type { Division } from '~/data/divisions'

const props = defineProps<{ item: Division }>()

/* resolve image from assets */
const mods = import.meta.glob('~/assets/images/divisions/*', { eager: true, import: 'default' }) as Record<string,string>
const byFile = Object.fromEntries(Object.entries(mods).map(([p,u]) => [p.split('/').pop()!, u]))
const src = computed(() => byFile[props.item.image] || '')

/* map to TOP BORDER color classes (not overlay) */
function topBorderColor(a?: Division['accent']) {
  switch (a) {
    case 'pink':   return 'border-t-rose-500'
    case 'orange': return 'border-t-amber-400'
    case 'green':  return 'border-t-emerald-500'
    case 'purple': return 'border-t-fuchsia-500'
    case 'teal':   return 'border-t-teal-400'
    default:       return 'border-t-[#1D50A2]' // brand blue
  }
}
</script>

<template>
  <article
    :class="[
      // card
      'group relative flex flex-col h-full overflow-hidden rounded-[14px]',
      'bg-white dark:bg-gray-900',
      'shadow-[0_4px_24px_rgba(0,0,0,0.08)] hover:shadow-[0_10px_32px_rgba(0,0,0,0.12)] transition-shadow',
      // SOLID header line as TOP BORDER (6px)
      'border-t-[6px]',
      topBorderColor(item.accent)
    ]"
  >
    <NuxtLink :to="`/divisions/${item.slug}`" class="flex flex-col flex-1 focus:outline-none">
      <figure class="overflow-hidden">
        <img
          :src="src"
          :alt="item.title"
          class="w-full h-[168px] sm:h-[180px] object-cover
                 transition-transform duration-300 group-hover:scale-[1.02]"
          loading="lazy" decoding="async"
        />
      </figure>

      <div class="p-4 sm:p-5 flex-1">
        <h3 class="text-[16.5px] sm:text-[17px] font-semibold leading-snug text-gray-900 dark:text-gray-100">
          {{ item.title }}
        </h3>
        <p class="mt-2 text-sm leading-6 text-gray-600 dark:text-gray-300 line-clamp-6">
          {{ item.excerpt }}
        </p>
      </div>
    </NuxtLink>

    <!-- keyboard focus ring -->
    <span
      class="pointer-events-none absolute inset-0 rounded-[14px]
             focus-within:ring-2 focus-within:ring-[#1D50A2]
             focus-within:ring-offset-2 focus-within:ring-offset-white
             dark:focus-within:ring-offset-gray-900"
      aria-hidden="true"
    />
  </article>
</template>
