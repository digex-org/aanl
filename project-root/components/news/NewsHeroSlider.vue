<script setup lang="ts">
import { ref, computed, nextTick } from 'vue'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Pagination, A11y, Autoplay, Keyboard } from 'swiper/modules'
import type { Swiper as SwiperType } from 'swiper'
import type { NewsItem } from '~/data/news'

import 'swiper/css'
import 'swiper/css/pagination'

const props = withDefaults(defineProps<{
  items: NewsItem[]
  autoplay?: boolean
  delayMs?: number
}>(), {
  items: () => [],
  autoplay: true,
  delayMs: 7000
})

/* SSR-safe local images */
const coverMods = import.meta.glob('~/assets/images/news/*', { eager: true, import: 'default' }) as Record<string, string>
const coverByFile = Object.fromEntries(Object.entries(coverMods).map(([p, u]) => [p.split('/').pop()!, u]))
const coverSrc = (file: string) => coverByFile[file] || file
const fmtDate = (iso: string) =>
  new Date(iso).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })

/* Swiper config */
const modules = [Pagination, A11y, Autoplay, Keyboard]
const autoplay = computed(() =>
  props.autoplay && props.items.length > 1
    ? { delay: props.delayMs, disableOnInteraction: false, pauseOnMouseEnter: true }
    : false
)

/* External pagination container */
const paginationEl = ref<HTMLElement | null>(null)
const swiperRef = ref<SwiperType | null>(null)

const onSwiper = (sw: SwiperType) => {
  swiperRef.value = sw

  // Rebind pagination to the external container once it's in the DOM
  nextTick(() => {
    if (!paginationEl.value) return

    sw.params.pagination = {
      ...(sw.params.pagination as any),
      el: paginationEl.value,
      clickable: true
    }

    // Re-init pagination so Swiper stops using its internal one
    sw.pagination.destroy()
    sw.pagination.init()
    sw.pagination.render()
    sw.pagination.update()
  })
}
</script>

<template>
  <ClientOnly>
    <section v-if="items?.length" class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div class="overflow-hidden rounded-[24px] bg-white text-slate-900 ring-1 ring-black/5">
        <Swiper
          :modules="modules"
          :slides-per-view="1"
          :loop="items.length > 1"
          :autoplay="autoplay"
          :keyboard="{ enabled: true }"
          :pagination="{ clickable: true }"
          @swiper="onSwiper"
          class="!pb-0"
        >
          <SwiperSlide
            v-for="n in items"
            :key="n.id"
            class="!h-auto"
          >
            <article
              class="grid grid-cols-1 md:grid-cols-[minmax(0,1.05fr)_minmax(0,1.35fr)] md:min-h-[360px] lg:min-h-[420px]"
            >
              <!-- Left: image -->
              <div>
                <img
                  :src="coverSrc(n.coverImage)"
                  :alt="n.title"
                  class="h-64 w-full object-cover md:h-full rounded-t-[24px] md:rounded-tr-none md:rounded-l-[24px]"
                  loading="eager"
                  decoding="async"
                />
              </div>

              <!-- Right: content -->
              <div class="flex flex-col justify-center px-6 sm:px-8 py-6 sm:py-8">
                <p class="text-[11px] uppercase tracking-wide text-slate-500">
                  {{ fmtDate(n.date) }}
                </p>
                <h2 class="mt-1 text-[22px] sm:text-[24px] lg:text-[26px] font-semibold leading-snug">
                  {{ n.title }}
                </h2>
                <p class="mt-3 text-sm sm:text-[15px] text-slate-600 max-w-[60ch]">
                  {{ n.excerpt }}
                </p>

                <div class="mt-4">
                  <NuxtLink
                    :to="`/news/${n.slug}`"
                    class="inline-flex items-center gap-2 text-sm font-semibold text-[--brand-navy] hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[--brand-navy]/30 rounded-md"
                  >
                    Read more
                    <svg viewBox="0 0 20 20" class="size-4" fill="none" aria-hidden="true">
                      <path
                        d="M5 10h10M11 6l4 4-4 4"
                        stroke="currentColor"
                        stroke-width="1.8"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                  </NuxtLink>
                </div>
              </div>
            </article>
          </SwiperSlide>
        </Swiper>

        <!-- Pagination BELOW the slider, centered -->
        <div class="pt-4 pb-6 flex justify-center">
          <div
            ref="paginationEl"
            class="news-hero-pagination flex flex-wrap justify-center gap-2 sm:gap-4"
          />
        </div>
      </div>
    </section>
  </ClientOnly>
</template>

<style scoped>
/* Long pill bullets */
:global(.news-hero-pagination .swiper-pagination-bullet) {
  width: 96px;
  height: 6px;
  border-radius: 9999px;
  background-color: rgba(148, 163, 184, 0.35); /* slate-400/35 */
  opacity: 1;
  margin: 0 !important;
  transition: background-color 0.25s ease;
}

:global(.news-hero-pagination .swiper-pagination-bullet-active) {
  background-color: #1d50a2; /* brand navy */
}

/* Responsive widths */
@media (max-width: 1024px) {
  :global(.news-hero-pagination .swiper-pagination-bullet) {
    width: 72px;
  }
}

@media (max-width: 640px) {
  :global(.news-hero-pagination .swiper-pagination-bullet) {
    width: 48px;
  }
}
</style>
