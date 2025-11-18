<!-- components/about/AboutHistorySection.vue -->
<script setup lang="ts">
import { ref, computed } from 'vue'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { A11y, Keyboard } from 'swiper/modules'
import type { Swiper as SwiperType } from 'swiper'

import { ABOUT_HISTORY, type HistoryItem } from '~/data/about-history'

import 'swiper/css'

const props = withDefaults(defineProps<{
  /** Optional override – if not provided, ABOUT_HISTORY is used */
  items?: HistoryItem[]
}>(), {
  items: () => []
})

/* ---------- Slides from data/about-history.ts ---------- */
const slides = computed<HistoryItem[]>(() =>
  props.items?.length ? props.items : ABOUT_HISTORY
)

/* ---------- Swiper setup (navigation handled manually) ---------- */
const modules = [A11y, Keyboard]
const swiperRef = ref<SwiperType | null>(null)
const activeIndex = ref(0)

function onSwiper(sw: SwiperType) {
  swiperRef.value = sw
}

function onSlideChange(sw: SwiperType) {
  activeIndex.value = sw.activeIndex
}

function goTo(index: number) {
  if (!swiperRef.value) return
  swiperRef.value.slideTo(index)
}

function goPrev() {
  swiperRef.value?.slidePrev()
}

function goNext() {
  swiperRef.value?.slideNext()
}

/* ---------- SSR-safe local images ---------- */
/* NOTE: files live in assets/images/history/* as in your data file */
const historyImageMods = import.meta.glob('~/assets/images/about/history/*', {
  eager: true,
  import: 'default'
}) as Record<string, string>

const historyImageByFile = Object.fromEntries(
  Object.entries(historyImageMods).map(([p, u]) => [p.split('/').pop()!, u])
)

function imgSrc(file: string): string {
  return historyImageByFile[file] || file
}
</script>

<template>
  <section
    class="rounded-3xl bg-[#0B1843] text-white px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-10"
    aria-labelledby="about-history-title"
  >
    <!-- Heading -->
    <header class="mb-6 sm:mb-8">
      <h2
        id="about-history-title"
        class="text-2xl sm:text-3xl font-bold tracking-tight"
      >
        <span
          class="relative inline-block
                 after:block after:h-[3px] after:bg-white
                 after:rounded-full after:mt-2"
        >
          History
        </span>
      </h2>
    </header>

    <!-- Year tabs -->
    <div
      v-if="slides.length"
      class="flex flex-wrap gap-x-8 gap-y-3 text-sm sm:text-base mb-6 sm:mb-8"
    >
      <button
        v-for="(slide, index) in slides"
        :key="`${slide.year}-${index}`"
        type="button"
        class="relative cursor-pointer pb-1 border-b-2 text-white/70 hover:text-white"
        :class="index === activeIndex
          ? 'font-semibold text-white border-white'
          : 'border-transparent'"
        @click="goTo(index)"
      >
        {{ slide.year }}
      </button>
    </div>

    <!-- Swiper + external navigation -->
    <div v-if="slides.length" class="space-y-4 sm:space-y-6">
      <Swiper
        :modules="modules"
        :slides-per-view="1"
        :space-between="24"
        :keyboard="{ enabled: true }"
        :a11y="{ enabled: true }"
        @swiper="onSwiper"
        @slideChange="onSlideChange"
      >
        <SwiperSlide
          v-for="slide in slides"
          :key="`${slide.year}-${slide.title}`"
        >
          <div
            class="grid grid-cols-1 md:grid-cols-[minmax(0,1.1fr)_minmax(0,1.1fr)]
                   gap-6 sm:gap-8 items-stretch"
          >
            <!-- Image -->
            <div class="overflow-hidden rounded-2xl bg-black/30">
              <img
                :src="imgSrc(slide.image)"
                :alt="slide.title"
                class="w-full h-full object-cover"
                loading="lazy"
                decoding="async"
              />
            </div>

            <!-- Text -->
            <div class="flex flex-col mt-6">
              <h3 class="text-lg sm:text-xl font-semibold leading-snug">
                {{ slide.title }}
              </h3>
              <p
                class="mt-3 text-sm sm:text-[15px] leading-relaxed text-white/80"
              >
                {{ slide.body }}
              </p>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>

      <!-- External prev/next controls (bottom-right) -->
      <div class="flex justify-end gap-3 pt-1">
        <button
          type="button"
          class="inline-flex items-center justify-center
                 w-9 h-9 rounded-full cursor-pointer
                 bg-white/10 text-white
                 hover:bg-white text-[#1D50A2] transition"
          aria-label="Previous period"
          @click="goPrev"
        >
          <svg viewBox="0 0 20 20" class="w-4 h-4">
            <path
              d="M12 5 7 10l5 5"
              stroke="currentColor"
              stroke-width="1.8"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </button>

        <button
          type="button"
          class="inline-flex cursor-pointer items-center justify-center
                 w-9 h-9 rounded-full
                 bg-white/10 text-white
                 hover:bg-gray-100 transition"
          aria-label="Next period"
          @click="goNext"
        >
          <svg viewBox="0 0 20 20" class="w-4 h-4">
            <path
              d="M8 5l5 5-5 5"
              stroke="currentColor"
              stroke-width="1.8"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </button>
      </div>
    </div>
  </section>
</template>
