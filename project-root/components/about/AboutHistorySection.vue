<!-- components/about/AboutHistorySection.vue -->
<script setup lang="ts">
import { computed, ref } from 'vue'
import UiSwiper from '~/components/common/UiSwiper.vue'
import { ABOUT_HISTORY, type HistoryItem } from '~/data/about-history'

const years = ABOUT_HISTORY.map(h => h.year)
const activeYear = ref<number>(years[0])

const activeIndex = computed(() =>
  ABOUT_HISTORY.findIndex(h => h.year === activeYear.value)
)

function onYearClick(year: number) {
  activeYear.value = year
}
</script>

<template>
  <section class="rounded-[32px] bg-[#0B1843] text-white px-5 sm:px-8 py-7 sm:py-9">
    <header class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-6">
      <h2 class="text-2xl sm:text-3xl font-bold tracking-tight">
        History
      </h2>
      <!-- years row -->
      <div class="flex flex-wrap gap-3 text-sm">
        <button
          v-for="year in years"
          :key="year"
          type="button"
          class="pb-1 border-b-2 transition"
          :class="year === activeYear
            ? 'border-white text-white font-semibold'
            : 'border-transparent text-white/70 hover:text-white/90'"
          @click="onYearClick(year)"
        >
          {{ year }}
        </button>
      </div>
    </header>

    <UiSwiper
      :items="ABOUT_HISTORY"
      :show-nav="true"
      :show-progress="false"
      wrapper-class="mt-4"
    >
      <template #default="{ item }: { item: HistoryItem }">
        <div class="grid grid-cols-1 md:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] gap-6">
          <div class="overflow-hidden rounded-3xl bg-black/20">
            <img
              :src="new URL(`~/assets/images/history/${item.image}`, import.meta.url).href"
              :alt="item.title"
              class="w-full h-full object-cover"
              loading="lazy"
              decoding="async"
            />
          </div>
          <div class="flex flex-col justify-center">
            <p class="text-sm uppercase tracking-wide text-white/70">{{ item.year }}</p>
            <h3 class="mt-1 text-xl font-semibold">{{ item.title }}</h3>
            <p class="mt-3 text-sm sm:text-[15px] leading-relaxed text-white/90">
              {{ item.body }}
            </p>
          </div>
        </div>
      </template>
    </UiSwiper>
  </section>
</template>
