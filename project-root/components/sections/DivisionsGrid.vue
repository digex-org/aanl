<script setup lang="ts">
import { divisions as source, type Division } from '~/data/divisions'

const props = withDefaults(defineProps<{
  title?: string
  items?: Division[]
  allButtonClass?: string
  allHref?: string
  showAllButton?: boolean
}>(), { 
  title: 'Divisions',
  allHref: '/divisions',
  showAllButton: true,
   allButtonClass:
    'text-[#1D50A2] border-1 border-[#1D50A2] ' +
    'hover:bg-[#1D50A2] hover:text-white ' +
    'focus-visible:ring-[#1D50A2]',
 })

const list = computed(() => props.items?.length ? props.items : source)
</script>

<template>
  <section class="dark:bg-gray-950" aria-labelledby="divisions-title">
    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 sm:py-14 lg:py-20">
      <div class="mb-6 sm:mb-8">
        <h2
          id="divisions-title"
          class="inline-block text-2xl sm:text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white
                 relative after:content-[''] after:block after:h-[3px] after:bg-gray-900 after:rounded-full after:mt-2"
        >
          {{ title }}
        </h2>
      </div>

      <div
        class="grid gap-4 sm:gap-5 lg:gap-6
               grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
      >
        <div v-for="d in list" :key="d.slug" class="h-full">
          <DivisionsDivisionCard :item="d" />
        </div>
      </div>

      <!-- Bottom-centered “All Divisions -->
      <div v-if="showAllButton" class="mt-8 flex justify-center">
        <NuxtLink
          :to="allHref"
                class="group inline-flex items-center justify-center gap-2
                      w-[155px] h-10 rounded-[130px] px-1
                      text-[15px] font-semibold
                      focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2
                      transition"
                :class="allButtonClass"
        >
          <span>See More</span>
          <svg
            width="26"
            height="15"
            viewBox="0 0 26 15"
            fill="none"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            class="shrink-0"
          >
            <path
              d="M25.7071 8.07112C26.0976 7.6806 26.0976 7.04743 25.7071 6.65691L19.3431 0.292946C18.9526 -0.0975785 18.3195 -0.0975785 17.9289 0.292946C17.5384 0.68347 17.5384 1.31664 17.9289 1.70716L23.5858 7.36401L17.9289 13.0209C17.5384 13.4114 17.5384 14.0446 17.9289 14.4351C18.3195 14.8256 18.9526 14.8256 19.3431 14.4351L25.7071 8.07112ZM0 8.36401L25 8.36401V6.36401L0 6.36401L0 8.36401Z"
              fill="currentColor"
            />
          </svg>
        </NuxtLink>
      </div>

    </div>
  </section>
</template>
