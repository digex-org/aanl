<script setup lang="ts">
import { useRoute } from 'vue-router'
import { computed, ref } from 'vue'
import { divisions, type Division } from '~/data/divisions'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Navigation, Pagination, A11y } from 'swiper/modules'
import type { Swiper as SwiperType } from 'swiper'

/** find current division by slug */
const route = useRoute()
const slug = computed(() => String(route.params.slug || ''))
const division = computed<Division | undefined>(() =>
    divisions.find(d => d.slug === slug.value)
)

/** head */
useHead(() => ({
    title: division.value ? `${division.value.title} — AANL` : 'Division — AANL'
}))

/** resolve banner image from assets */
const mods = import.meta.glob('~/assets/images/divisions/*', {
    eager: true,
    import: 'default'
}) as Record<string, string>
const byFile = Object.fromEntries(Object.entries(mods).map(([p, u]) => [p.split('/').pop()!, u]))
const bannerSrc = computed(() => (division.value && byFile[division.value.image]) || '')

/** demo long text — replace with CMS copy per division */
const bodyCopy = computed(() =>
    `AANL Experimental Physics Division (EPD) has a long lasting tradition of research in high energy experimental physics in a wide range of topics. During 1970–1991s, the Yerevan electron synchrotron (ARUS) operated productively and many significant results were obtained. Physicists of EPD succeeded in receiving a number of important results which allowed to promote the understanding of hadron and nuclei structure and fundamental properties. The reputation of the institute as accelerator physics and accelerator center helps to preserve and develop international cooperation with scientific centers in the USA, Germany, Switzerland and others, fully incorporating EPD in their experimental research programs.

Current programs include low-energy nuclear physics investigations on the electron linear accelerator LUE-75 and proton cyclotron C18/18, nuclear reaction studies, detector calibrations and test-beams, and research of materials science.`
)

/** quick access (collapsible) */
const qaOpen = ref({ employees: false, news: false, seminars: false })
const qaItems = [
    { key: 'employees', label: 'Employees', to: `/divisions/${slug.value}/employees` },
    { key: 'news', label: 'News', to: `/divisions/${slug.value}/news` },
    { key: 'seminars', label: 'Seminars', to: `/divisions/${slug.value}/seminars` }
] as const

/** collaborations list (sample; swap with your real data per division) */
type Collab = { text: string; links?: Array<{ label: string; href: string }> }
const collaborations = ref<Collab[]>([
    {
        text: 'High energy experimental physics / collaboration with', links: [
            { label: 'CERN–LHC', href: 'https://home.cern' }, { label: 'ATLAS', href: 'https://atlas.cern' },
            { label: 'ALICE', href: 'https://alice.cern' }, { label: 'CMS', href: 'https://cms.cern' }, { label: 'AMBER', href: 'https://amber.web.cern.ch' }
        ]
    },
    {
        text: 'Hadron physics based on HERMES and H1 data / collaboration with', links: [
            { label: 'DESY', href: 'https://www.desy.de' }
        ]
    },
    {
        text: 'Very high energy gamma ray astrophysics / collaboration with', links: [
            { label: 'HESS', href: 'https://www.mpi-hd.mpg.de/hfm/HESS' }, { label: 'CTA', href: 'https://www.cta-observatory.org' }
        ]
    },
    {
        text: 'Drell–Yan / Sivers function — collaboration with', links: [
            { label: 'FermiLab', href: 'https://www.fnal.gov' }, { label: 'SpinQuest', href: 'https://spinquest.fnal.gov' }
        ]
    },
    { text: 'JLab (Halls A, B, C, D)', links: [{ label: 'JLab', href: 'https://www.jlab.org' }] },
    {
        text: 'Fission and fragmentation of nuclei with real photon beams / collaboration with', links: [
            { label: 'ELI-NP', href: 'https://www.eli-np.ro' }, { label: 'HİyS', href: 'https://hlys.org' }
        ]
    },
    {
        text: 'Joint Institute for Nuclear Research (Dubna, Russia)', links: [
            { label: 'JINR', href: 'https://www.jinr.ru' }
        ]
    },
    {
        text: 'University of Glasgow, Scotland', links: [
            { label: 'University of Glasgow', href: 'https://www.gla.ac.uk' }
        ]
    },
    {
        text: 'ELI-NP Center, Bucharest, Romania', links: [
            { label: 'ELI-NP Center', href: 'https://www.eli-np.ro' }
        ]
    },
    {
        text: 'Gutenberg University, Mainz, Germany', links: [
            { label: 'Gutenberg University', href: 'https://www.uni-mainz.de' }
        ]
    },
    {
        text: 'Tohoku University, Japan', links: [
            { label: 'Tohoku University', href: 'https://www.tohoku.ac.jp' }
        ]
    }
])

/** related divisions (exclude current) */
const related = computed(() =>
    divisions.filter(d => d.slug !== slug.value).slice(0, 8)
)
/** resolve related image */
const relatedSrc = (file: string) => byFile[file] || ''

/** scroll helpers for the related carousel */
const trackRef = ref<HTMLElement | null>(null)

const modules = [Navigation, Pagination, A11y]
const swiperBreakpoints = {
  320:{slidesPerView:1.12,spaceBetween:16},
  480:{slidesPerView:1.5,spaceBetween:16},
  640:{slidesPerView:2,spaceBetween:18},
  768:{slidesPerView:3,spaceBetween:20},
  1024:{slidesPerView:4,spaceBetween:24},
}
const swiperRef = ref<SwiperType | null>(null)

function onSwiper(sw: SwiperType) {
  swiperRef.value = sw
}

function onProgressClick(e: MouseEvent) {
  const el = e.currentTarget as HTMLElement
  if (!el || !swiperRef.value) return
  const rect = el.getBoundingClientRect()
  const x = e.clientX - rect.left
  const ratio = Math.min(1, Math.max(0, x / rect.width)) // 0..1

  const sw = swiperRef.value
  // number of snap positions (pages)
  const snaps = sw.snapGrid.length
  if (snaps <= 1) return
  const target = Math.round((snaps - 1) * ratio)
  sw.slideTo(target)
}
</script>

<template>
    <div v-if="division" class="dark:bg-gray-950">
        <!-- Banner -->
        <section class="relative isolate overflow-hidden">
            <img :src="bannerSrc" :alt="division.title"
                class="w-full h-[240px] sm:h-[300px] lg:h-[360px] object-cover" />
            <!-- overlay for readability -->
            <div class="absolute inset-0 bg-[linear-gradient(0deg,rgba(0,0,0,0.55),rgba(0,0,0,0.25))]"></div>

            <div class="absolute inset-0 flex items-end">
                <div class="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 pb-6 sm:pb-8">
                    <nav class="text-white/80 text-sm mb-2">
                        <NuxtLink to="/divisions" class="hover:underline">Divisions</NuxtLink>
                        <span class="mx-2">›</span>
                        <span class="opacity-90">{{ division.title }}</span>
                    </nav>
                    <h1 class="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                        {{ division.title }}
                    </h1>
                </div>
            </div>
        </section>

        <!-- Two-column content -->
        <section class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
            <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
                <!-- Left: main body -->
                <div class="lg:col-span-8">
                    <article class="prose prose-slate max-w-none dark:prose-invert">
                        <p
                            class="text-[15px] sm:text-base leading-7 text-gray-700 dark:text-gray-300 whitespace-pre-line">
                            {{ bodyCopy }}
                        </p>
                    </article>
                </div>

                <!-- Right: Quick Access -->
                <aside class="lg:col-span-4">
                    <div
                        class="rounded-2xl bg-[#F2F5FA] dark:bg-gray-900/60 border border-black/5 dark:border-white/10 shadow-sm p-4 sticky top-4">
                        <div class="flex items-center justify-between">
                            <h3 class="text-gray-900 dark:text-white font-semibold">Quick access</h3>
                            <button
                                class="size-6 grid place-items-center rounded-md text-gray-600 dark:text-gray-300 hover:bg-black/5 dark:hover:bg-white/10"
                                @click="qaOpen.employees = qaOpen.news = qaOpen.seminars = false" title="Collapse all"
                                aria-label="Collapse all">×</button>
                        </div>

                        <ul class="mt-3 divide-y divide-black/5 dark:divide-white/10">
                            <li v-for="q in qaItems" :key="q.key" class="py-2">
                                <button type="button"
                                    class="flex w-full items-center justify-between text-left font-medium text-sm text-gray-800 dark:text-gray-200"
                                    @click="qaOpen[q.key] = !qaOpen[q.key]" :aria-expanded="qaOpen[q.key]">
                                    <span>{{ q.label }}</span>
                                    <span
                                        class="ml-3 inline-grid size-5 place-items-center rounded-md bg-white dark:bg-gray-800 ring-1 ring-black/10 dark:ring-white/10">
                                        <span v-if="!qaOpen[q.key]">+</span>
                                        <span v-else>−</span>
                                    </span>
                                </button>

                                <div v-show="qaOpen[q.key]" class="mt-2 pl-2">
                                    <NuxtLink :to="q.to"
                                        class="inline-flex items-center gap-2 text-[#1D50A2] hover:underline text-sm">
                                        Open {{ q.label }}
                                        <svg class="size-4" viewBox="0 0 20 20" fill="none">
                                            <path d="M4 10h10" stroke="currentColor" stroke-width="1.8"
                                                stroke-linecap="round" />
                                            <path d="M10 5l5 5-5 5" stroke="currentColor" stroke-width="1.8"
                                                stroke-linecap="round" stroke-linejoin="round" />
                                        </svg>
                                    </NuxtLink>
                                </div>
                            </li>
                        </ul>
                    </div>
                </aside>
            </div>
        </section>

        <!-- Collaborations -->
        <section class="dark:bg-gray-950">
            <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-6">
                <div
                    class="rounded-1xl border border-black/5 dark:border-white/10 bg-white dark:bg-gray-900 shadow-sm p-4 sm:p-6 lg:p-8">
                    <h2 class="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">Collaborations</h2>

                    <div class="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-4">
                        <div v-for="(c, idx) in collaborations" :key="idx" class="flex items-start gap-3">
                            <span  class="size-6 text-center mb-5 shrink-0 grid  text-[#1D50A2]">→</span>
                            <p class="text-sm sm:text-[15px] text-gray-800 dark:text-gray-200">
                                <span class="font-medium">{{ c.text }}</span>
                                <template v-if="c.links?.length">
                                    <template v-for="(l, i) in c.links" :key="l.href">
                                        <a :href="l.href" target="_blank" rel="noopener"
                                            class="text-[#1D50A2] hover:underline ml-1">{{ l.label }}</a><span
                                            v-if="i < c.links.length - 1">,</span>
                                    </template>
                                </template>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- Career & Education Opportunities -->
        <section class="relative">
            <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
                <div class="h-[3px] w-full bg-gradient-to-r from-emerald-400 via-blue-500 to-fuchsia-500"></div>

                <div
                    class="rounded-1xl border border-black/5 dark:border-white/10 bg-white dark:bg-gray-900 shadow-sm p-5 sm:p-7 lg:p-8">
                    <div class="flex items-start justify-between gap-6">
                        <div>
                            <h2 class="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">Career And Education
                                Opportunities</h2>
                            <p class="mt-2 text-sm sm:text-[15px] text-gray-700 dark:text-gray-300 max-w-4xl">
                                Prospective students and researchers can apply for PhD and junior researcher positions
                                in
                                experimental programs on LUE-75 and the C18/18 cyclotron. Joint programs with
                                <span class="text-[#1D50A2]">CERN</span>, <span class="text-[#1D50A2]">JLab</span>,
                                <span class="text-[#1D50A2]">FermiLab</span>, and <span
                                    class="text-[#1D50A2]">BNL</span> are
                                available, including exchange studies and summer schools.
                            </p>
                        </div>
                        <NuxtLink to="/careers" class="shrink-0 inline-flex items-center justify-center h-[44px] rounded-[130px] px-6
                     text-[15px] font-semibold text-white bg-[#1D50A2] hover:bg-[#174088]
                     focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1D50A2]/60">
                            Learn More
                        </NuxtLink>
                    </div>
                </div>
            </div>
        </section>

<!-- Related divisions (Swiper) -->
<section class="pb-12">
  <div class="mx-auto max-w-7xl px-2 sm:px-4 lg:px-6">
    <!-- Positioned wrapper controls progress line + arrows -->
    <div class="related-swiper relative mt-5 overflow-hidden px-2 pb-8">
      <ClientOnly>
            <Swiper
            :modules="modules"
            :breakpoints="swiperBreakpoints"
            :watchSlidesProgress="true"
            :watchOverflow="true"
            :navigation="{ nextEl: '.rel-next', prevEl: '.rel-prev' }"
            :pagination="{ el: '.rel-progress', type: 'progressbar' }"
            :a11y="{ enabled: true }"
            @swiper="onSwiper"
            >
          <SwiperSlide
            v-for="d in related"
            :key="d.slug"
            class="!h-auto"
          >
            <article
              class="h-full rounded-xl bg-white dark:bg-gray-900 shadow-sm
                     ring-1 ring-black/5 dark:ring-white/10 overflow-hidden"
            >
              <NuxtLink :to="`/divisions/${d.slug}`" class="block h-full">
                <img
                  :src="relatedSrc(d.image)"
                  :alt="d.title"
                  class="w-full h-40 sm:h-44 md:h-48 object-cover"
                  loading="lazy" decoding="async"
                />
                <div class="p-4">
                  <h3 class="text-[16px] font-semibold text-gray-900 dark:text-gray-100">
                    {{ d.title }}
                  </h3>
                  <p class="mt-1 text-sm text-gray-600 dark:text-gray-300 line-clamp-3">
                    {{ d.excerpt }}
                  </p>
                </div>
              </NuxtLink>
            </article>
          </SwiperSlide>

          <!-- arrows (hidden on <640px) -->
          <!-- <button
            class="rel-prev hidden sm:flex absolute left-1 top-1/2 -translate-y-1/2
                   size-9 md:size-10 items-center justify-center
                   rounded-full bg-white/90 dark:bg-gray-900/90
                   ring-1 ring-black/10 dark:ring-white/10 shadow-md
                   hover:bg-white dark:hover:bg-gray-800
                   focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[--brand-navy] z-10"
            aria-label="Previous related division"
          >
            <svg viewBox="0 0 20 20" class="size-5" fill="none">
              <path d="M12 5l-5 5 5 5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </button>

          <button
            class="rel-next hidden sm:flex absolute right-1 top-1/2 -translate-y-1/2
                   size-9 md:size-10 items-center justify-center
                   rounded-full bg-white/90 dark:bg-gray-900/90
                   ring-1 ring-black/10 dark:ring-white/10 shadow-md
                   hover:bg-white dark:hover:bg-gray-800
                   focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[--brand-navy] z-10"
            aria-label="Next related division"
          >
            <svg viewBox="0 0 20 20" class="size-5" fill="none">
              <path d="M8 5l5 5-5 5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </button> -->
        </Swiper>

        <!-- centered progress line -->
        <div class="rel-progress swiper-pagination cursor-pointer" @click="onProgressClick"></div>

      </ClientOnly>
    </div>
  </div>
</section>


    </div>

    <!-- fallback if slug not found -->
    <div v-else class="mx-auto max-w-3xl px-4 py-16 text-center">
        <h1 class="text-2xl font-semibold">Division not found</h1>
        <p class="mt-2 text-gray-600">Please check the URL or return to the <NuxtLink to="/divisions"
                class="text-[#1D50A2] hover:underline">Divisions</NuxtLink> page.</p>
    </div>
</template>

<style scoped>
/* optional: smooth typography width */
.prose p+p {
    margin-top: 1rem;
}
</style>
