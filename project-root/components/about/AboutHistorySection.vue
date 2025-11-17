<script setup lang="ts">
import { ref, computed } from 'vue'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Navigation, A11y, Keyboard } from 'swiper/modules'
import type { Swiper as SwiperType } from 'swiper'

import 'swiper/css'

type HistorySlide = {
  year: number
  title: string
  body: string
  /** file name in ~/assets/images/about/history */
  image: string
}

/* ---------- Props (optional external data) ---------- */
const props = withDefaults(defineProps<{
  items?: HistorySlide[]
}>(), {
  items: () => []
})

/* ---------- Default slides (you can extend) ---------- */
const defaultSlides: HistorySlide[] = [
  {
    year: 1943,
    title: 'A. I. Alikhanyan National Science Laboratory (AANL)',
    body: `The Yerevan Institute of Physics (YerPhI) was founded by renowned
physicists Abraham and Artem Alikhanyan in 1943. The origins of the institute
lie in the study of cosmic rays, and for this purpose two cosmic ray research
stations were built on Mount Aragats: Aragats (3200m) and New Amberd (2000m).`,
    image: 'brothers-alikhanyan.webp'
  },
    {
    year: 1943,
    title: 'A. I. Alikhanyan National Science Laboratory (AANL)',
    body: `The Yerevan Institute of Physics (YerPhI) was founded by renowned
physicists Abraham and Artem Alikhanyan in 1943. The origins of the institute
lie in the study of cosmic rays, and for this purpose two cosmic ray research
stations were built on Mount Aragats: Aragats (3200m) and New Amberd (2000m).`,
    image: 'brothers-alikhanyan.webp'
  },
  // add 1962, 1967, 1970, ... as you get the content/images
]

const slides = computed<HistorySlide[]>(() =>
  props.items?.length ? props.items : defaultSlides
)

/* ---------- Swiper setup ---------- */
const modules = [Navigation, A11y, Keyboard]
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
    class="rounded-3xl bg-[#0B1843] text-white px-4 sm:px-6 lg:px-8 py-8 sm:py-10 lg:py-12"
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
        :key="slide.year"
        type="button"
        class="relative pb-1 border-b-2 border-transparent text-white/70 hover:text-white"
        :class="index === activeIndex
          ? 'font-semibold text-white border-white'
          : 'border-transparent'"
        @click="goTo(index)"
      >
        {{ slide.year }}
      </button>
    </div>

    <!-- Swiper -->
    <Swiper
      v-if="slides.length"
      :modules="modules"
      :slides-per-view="1"
      :space-between="24"
      :keyboard="{ enabled: true }"
      :a11y="{ enabled: true }"
      :navigation="{
        prevEl: '.about-history__prev',
        nextEl: '.about-history__next'
      }"
      @swiper="onSwiper"
      @slideChange="onSlideChange"
    >
      <SwiperSlide
        v-for="slide in slides"
        :key="slide.year"
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

          <!-- Text + nav -->
          <div class="flex flex-col justify-between">
            <div>
              <h3 class="text-lg sm:text-xl font-semibold leading-snug">
                {{ slide.title }}
              </h3>
              <p
                class="mt-3 text-sm sm:text-[15px] leading-relaxed text-white/80"
              >
                {{ slide.body }}
              </p>
            </div>

            <div class="mt-6 flex gap-3">
              <!-- Prev -->
              <button
                type="button"
                class="about-history__prev inline-flex items-center justify-center
                       w-9 h-9 rounded-full
                       bg-white/10 text-white
                       hover:bg-white/20 transition"
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

              <!-- Next -->
              <button
                type="button"
                class="about-history__next inline-flex items-center justify-center
                       w-9 h-9 rounded-full
                       bg-white text-[#1D50A2]
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
        </div>
      </SwiperSlide>
    </Swiper>
  </section>
</template>
