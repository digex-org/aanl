<!-- pages/divisions/[slug].vue -->
<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRoute } from 'vue-router'
import { useHead } from '#imports'

import { useBreadcrumbs } from '~/composables/useBreadcrumbs'
import { divisions, type Division } from '~/data/divisions'
import UiSwiper from '~/components/common/UiSwiper.vue'
import AppBreadcrumbs from '~/components/ui/AppBreadcrumbs.vue'
/* ---------- Route / entity ---------- */
const route = useRoute()
const slug = computed(() => String(route.params.slug || ''))

const division = computed<Division | undefined>(() =>
  divisions.find(d => d.slug === slug.value)
)

/* ---------- Breadcrumbs (top-left on banner) ---------- */
const { crumbs, jsonLd } = useBreadcrumbs({
  segmentLabels: { divisions: 'Divisions' },
  currentLabel: division.value?.title ?? null
})

/* ---------- Head / SEO ---------- */
useHead(() => ({
  title: division.value ? `${division.value.title} — AANL` : 'Division — AANL',
  script: [{ type: 'application/ld+json', children: JSON.stringify(jsonLd.value) }]
}))

/* ---------- Assets: banner + related images ---------- */
const mods = import.meta.glob('~/assets/images/divisions/*', {
  eager: true,
  import: 'default'
}) as Record<string, string>
const byFile = Object.fromEntries(Object.entries(mods).map(([p, u]) => [p.split('/').pop()!, u]))

const bannerSrc = computed(() => (division.value && byFile[division.value.image]) || '')
const relatedSrc = (file: string) => byFile[file] || ''

/* ---------- Demo body copy (replace with CMS) ---------- */
const bodyCopy = computed(() =>
  `AANL Experimental Physics Division (EPD) has a long lasting tradition of research in high energy experimental physics in a wide range of topics. During 1970–1991s, the Yerevan electron synchrotron (ARUS) operated productively and many significant results were obtained. Physicists of EPD succeeded in receiving a number of important results which allowed to promote the understanding of hadron and nuclei structure and fundamental properties. The reputation of the institute as accelerator physics and accelerator center helps to preserve and develop international cooperation with scientific centers in the USA, Germany, Switzerland and others, fully incorporating EPD in their experimental research programs.

Current programs include low-energy nuclear physics investigations on the electron linear accelerator LUE-75 and proton cyclotron C18/18, nuclear reaction studies, detector calibrations and test-beams, and research of materials science.`
)

/* ---------- Quick Access (collapsible) ---------- */


const basePath = computed(() => `/divisions/${slug.value}`)

const qaItems = computed(() => [
  { key: 'employees', label: 'Employees', to: { path: `${basePath.value}/employees` } },
  { key: 'news',      label: 'News',      to: { path: `${basePath.value}/news` } },      // create this page if you need it
  { key: 'seminars',  label: 'Seminars',  to: { path: `${basePath.value}/seminars` } },  // create this page if you need it
])
/* ---------- Collaborations (sample) ---------- */
type Collab = { text: string; links?: Array<{ label: string; href: string }> }
const collaborations = ref<Collab[]>([
  { text: 'High energy experimental physics / collaboration with', links: [
    { label: 'CERN–LHC', href: 'https://home.cern' }, { label: 'ATLAS', href: 'https://atlas.cern' },
    { label: 'ALICE', href: 'https://alice.cern' }, { label: 'CMS', href: 'https://cms.cern' }, { label: 'AMBER', href: 'https://amber.web.cern.ch' }
  ]},
  { text: 'Hadron physics based on HERMES and H1 data / collaboration with', links: [{ label: 'DESY', href: 'https://www.desy.de' }]},
  { text: 'Very high energy gamma ray astrophysics / collaboration with', links: [
    { label: 'HESS', href: 'https://www.mpi-hd.mpg.de/hfm/HESS' }, { label: 'CTA', href: 'https://www.cta-observatory.org' }
  ]},
  { text: 'Drell–Yan / Sivers function — collaboration with', links: [
    { label: 'FermiLab', href: 'https://www.fnal.gov' }, { label: 'SpinQuest', href: 'https://spinquest.fnal.gov' }
  ]},
  { text: 'JLab (Halls A, B, C, D)', links: [{ label: 'JLab', href: 'https://www.jlab.org' }]},
  { text: 'Fission and fragmentation of nuclei with real photon beams / collaboration with', links: [
    { label: 'ELI-NP', href: 'https://www.eli-np.ro' }, { label: 'HİyS', href: 'https://hlys.org' }
  ]},
  { text: 'Joint Institute for Nuclear Research (Dubna, Russia)', links: [{ label: 'JINR', href: 'https://www.jinr.ru' }]},
  { text: 'University of Glasgow, Scotland', links: [{ label: 'University of Glasgow', href: 'https://www.gla.ac.uk' }]},
  { text: 'ELI-NP Center, Bucharest, Romania', links: [{ label: 'ELI-NP Center', href: 'https://www.eli-np.ro' }]},
  { text: 'Gutenberg University, Mainz, Germany', links: [{ label: 'Gutenberg University', href: 'https://www.uni-mainz.de' }]},
  { text: 'Tohoku University, Japan', links: [{ label: 'Tohoku University', href: 'https://www.tohoku.ac.jp' }]}
])

/* ---------- Related ---------- */
const related = computed(() => divisions.filter(d => d.slug !== slug.value).slice(0, 8))

/* UiSwiper breakpoints (can be overridden per use) */
const relatedBreakpoints = {
  320:  { slidesPerView: 1.12, spaceBetween: 16 },
  480:  { slidesPerView: 1.5,  spaceBetween: 16 },
  640:  { slidesPerView: 2,    spaceBetween: 18 },
  768:  { slidesPerView: 3,    spaceBetween: 20 },
  1024: { slidesPerView: 4,    spaceBetween: 24 }
}
</script>

<template>
  <div v-if="division" class="dark:bg-gray-950">
    <!-- Banner -->
    <section class="relative isolate overflow-hidden">
      <img :src="bannerSrc" :alt="division.title" class="w-full h-[240px] sm:h-[300px] lg:h-[360px] object-cover" />
      <div class="absolute inset-0 bg-[linear-gradient(0deg,rgba(0,0,0,0.55),rgba(0,0,0,0.25))]"></div>

      <!-- Breadcrumb + Title -->
      <div class="absolute inset-0">
        <!-- breadcrumb (top-left) -->
        <div class="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 pt-5 sm:pt-6">
        <AppBreadcrumbs
          :items="crumbs"
          variant="light-on-dark"
        />

          <!-- title aligned to bottom-left -->
          <div class="mt-28 sm:mt-24 h-full flex items-end pb-4 sm:pb-8">
            <h1 class="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              {{ division.title }}
            </h1>
          </div>
        </div>
      </div>
    </section>

    <!-- Two-column content -->
    <section class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
        <!-- Left: main body -->
        <div class="lg:col-span-8">
          <article class="prose prose-slate max-w-none dark:prose-invert">
            <p class="text-[15px] sm:text-base leading-7 text-gray-700 dark:text-gray-300 whitespace-pre-line">
              {{ bodyCopy }}
            </p>
          </article>
        </div>

        <!-- Right: Quick Access -->
        <aside class="lg:col-span-4">
          <CommonQuickAccess
            :items="qaItems"
            title="Quick access"
            sticky
            sticky-top="top-4"
            brand-color-class="bg-[--brand-navy]"
          />
        </aside>
      </div>
    </section>

    <!-- Collaborations -->
    <section class="dark:bg-gray-950">
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-6">
        <div class="rounded-1xl border border-black/5 dark:border-white/10 bg-white dark:bg-gray-900 shadow-sm p-4 sm:p-6 lg:p-8">
          <h2 class="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">Collaborations</h2>

          <div class="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-4">
            <div v-for="(c, idx) in collaborations" :key="idx" class="flex items-start gap-3">
              <span class="size-6 text-[#1D50A2] text-center mb-5 shrink-0 grid">→</span>
              <p class="text-sm sm:text-[15px] text-gray-800 dark:text-gray-200">
                <span class="font-medium">{{ c.text }}</span>
                <template v-if="c.links?.length">
                  <template v-for="(l, i) in c.links" :key="l.href">
                    <a :href="l.href" target="_blank" rel="noopener" class="text-[#1D50A2] hover:underline ml-1">{{ l.label }}</a><span v-if="i < c.links.length - 1">,</span>
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

        <div class="rounded-1xl border border-black/5 dark:border-white/10 bg-white dark:bg-gray-900 shadow-sm p-5 sm:p-7 lg:p-8">
          <div class="flex items-start justify-between gap-6">
            <div>
              <h2 class="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">Career And Education Opportunities</h2>
              <p class="mt-2 text-sm sm:text-[15px] text-gray-700 dark:text-gray-300 max-w-4xl">
                Prospective students and researchers can apply for PhD and junior researcher positions… exchange studies and summer schools.
              </p>
            </div>
            <NuxtLink
              to="/careers"
              class="shrink-0 inline-flex items-center justify-center h-[44px] rounded-[130px] px-6
                     text-[15px] font-semibold text-white bg-[--brand-navy] hover:bg-[#174088]
                     focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[--brand-navy]/60"
            >
              Learn More
            </NuxtLink>
          </div>
        </div>
      </div>
    </section>

    <!-- Related divisions (UiSwiper) -->
    <section class="pb-12">
      <div class="mx-auto max-w-7xl px-2 sm:px-4 lg:px-6">
        <UiSwiper
          :items="related"
          :breakpoints="relatedBreakpoints"
          :show-nav="false"
          :show-progress="true"
          wrapper-class="mt-5 px-2"
          progress-max-width-class="max-w-md"
          :get-key="(d) => d.slug"
        >
          <template #default="{ item: d }">
            <article class="h-full rounded-xl bg-white dark:bg-gray-900 shadow-sm ring-1 ring-black/5 dark:ring-white/10 overflow-hidden">
              <NuxtLink :to="`/divisions/${d.slug}`" class="block h-full">
                <img :src="relatedSrc(d.image)" :alt="d.title" class="w-full h-40 sm:h-44 md:h-48 object-cover" loading="lazy" decoding="async" />
                <div class="p-4">
                  <h3 class="text-[16px] font-semibold text-gray-900 dark:text-gray-100">{{ d.title }}</h3>
                  <p class="mt-1 text-sm text-gray-600 dark:text-gray-300 line-clamp-3">{{ d.excerpt }}</p>
                </div>
              </NuxtLink>
            </article>
          </template>
        </UiSwiper>
      </div>
    </section>
  </div>

  <!-- Fallback if slug not found -->
  <div v-else class="mx-auto max-w-3xl px-4 py-16 text-center">
    <h1 class="text-2xl font-semibold">Division not found</h1>
    <p class="mt-2 text-gray-600">
      Please check the URL or return to the
      <NuxtLink to="/divisions" class="text-[--brand-navy] hover:underline">Divisions</NuxtLink> page.
    </p>
  </div>
</template>

<style scoped>
/* Prose spacing */
.prose p + p { margin-top: 1rem; }
</style>
