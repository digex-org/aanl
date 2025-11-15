<!-- components/common/UiSwiper.vue -->
<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Navigation, Pagination, A11y } from 'swiper/modules'
import type { Swiper as SwiperType } from 'swiper'

/**
 * A generic, reusable Swiper wrapper with:
 * - responsive breakpoints
 * - optional nav arrows
 * - centered, clickable progress line
 * - slot-based slide rendering
 */
const props = withDefaults(defineProps<{
  /** Data items to render as slides */
  items: any[]
  /** Unique key getter (defaults to index) */
  getKey?: (item: any, index: number) => string | number
  /** Swiper breakpoints (sane defaults provided) */
  breakpoints?: Record<string, any>
  /** Enable/disable navigation arrows */
  showNav?: boolean
  /** Show the progressbar and make it clickable */
  showProgress?: boolean
  /** Extra class for the outer wrapper */
  wrapperClass?: string
  /** Constrain progress line width (e.g. 'max-w-md') */
  progressMaxWidthClass?: string
}>(), {
  getKey: (_item, i) => i,
  breakpoints: () => ({
    320:  { slidesPerView: 1.12, spaceBetween: 16 },
    480:  { slidesPerView: 1.5,  spaceBetween: 16 },
    640:  { slidesPerView: 2,    spaceBetween: 18 },
    768:  { slidesPerView: 3,    spaceBetween: 20 },
    1024: { slidesPerView: 4,    spaceBetween: 24 }
  }),
  showNav: false,
  showProgress: true,
  wrapperClass: '',
  progressMaxWidthClass: 'max-w-md'
})

const modules = [Navigation, Pagination, A11y]
const swiperRef = ref<SwiperType | null>(null)

function onSwiper(sw: SwiperType) {
  swiperRef.value = sw
}

/** Click-to-seek on the progress line */
function onProgressClick(e: MouseEvent) {
  if (!props.showProgress || !swiperRef.value) return
  const el = e.currentTarget as HTMLElement
  const rect = el.getBoundingClientRect()
  const ratio = Math.min(1, Math.max(0, (e.clientX - rect.left) / rect.width))
  const sw = swiperRef.value
  const snaps = sw.snapGrid.length
  if (snaps > 1) sw.slideTo(Math.round((snaps - 1) * ratio))
}

onMounted(() => {
  // Defensive: re-size Swiper if parent layout shifts
  swiperRef.value?.update()
})
</script>

<template>
  <div class="ui-swiper relative overflow-hidden pb-8" :class="wrapperClass">
    <ClientOnly>
      <Swiper
        :modules="modules"
        :breakpoints="breakpoints"
        :watchSlidesProgress="true"
        :watchOverflow="true"
        :navigation="showNav ? { nextEl: '.ui-swiper__next', prevEl: '.ui-swiper__prev' } : false"
        :pagination="showProgress ? { el: '.ui-swiper__progress', type: 'progressbar' } : false"
        :a11y="{ enabled: true }"
        @swiper="onSwiper"
      >
        <SwiperSlide
          v-for="(item, i) in items"
          :key="getKey(item, i)"
          class="!h-auto"
        >
          <!-- Consumer renders slide content -->
          <slot :item="item" :index="i" />
        </SwiperSlide>

        <!-- Optional arrows (kept inside wrapper to avoid horizontal scrollbars) -->
        <button
          v-if="showNav"
          class="ui-swiper__prev hidden sm:flex absolute left-1 top-1/2 -translate-y-1/2
                 size-9 md:size-10 items-center justify-center rounded-full
                 bg-white/90 dark:bg-gray-900/90 ring-1 ring-black/10 dark:ring-white/10 shadow-md
                 hover:bg-white dark:hover:bg-gray-800 focus-visible:outline-none
                 focus-visible:ring-2 focus-visible:ring-[--brand-navy] z-10"
          aria-label="Previous"
        >
          <svg viewBox="0 0 20 20" class="size-5" fill="none">
            <path d="M12 5l-5 5 5 5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>

        <button
          v-if="showNav"
          class="ui-swiper__next hidden sm:flex absolute right-1 top-1/2 -translate-y-1/2
                 size-9 md:size-10 items-center justify-center rounded-full
                 bg-white/90 dark:bg-gray-900/90 ring-1 ring-black/10 dark:ring-white/10 shadow-md
                 hover:bg-white dark:hover:bg-gray-800 focus-visible:outline-none
                 focus-visible:ring-2 focus-visible:ring-[--brand-navy] z-10"
          aria-label="Next"
        >
          <svg viewBox="0 0 20 20" class="size-5" fill="none">
            <path d="M8 5l5 5-5 5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>
      </Swiper>

      <!-- Centered, clickable progress line -->
      <div v-if="showProgress" class="mt-6 flex justify-center">
        <div
          class="ui-swiper__progress swiper-pagination w-full  rounded-full cursor-pointer "
          :class="progressMaxWidthClass"
          @click="onProgressClick"
        ></div>
      </div>
    </ClientOnly>
  </div>
</template>

<style scoped>
/* Progressbar look */
:global(.ui-swiper .swiper-pagination-progressbar) {
  position: relative; /* keep it in flow, not overlayed */
  width: 100%;
  height: 6px;
  border-radius: 9999px;
  background-color: rgb(229 231 235 / 0.6); /* gray-200/60 */
}
:global(.dark .ui-swiper .swiper-pagination-progressbar) {
  background-color: rgb(255 255 255 / 0.10);
}
:global(.ui-swiper .swiper-pagination-progressbar-fill) {
  background-color: var(--brand-navy, #1D50A2);
  border-radius: 9999px;
}

/* Avoid phantom horizontal scrollbars */
.ui-swiper { overflow: hidden; }
</style>
