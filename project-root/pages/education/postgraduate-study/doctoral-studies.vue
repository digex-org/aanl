<!-- pages/education/postgraduate-study/doctoral-studies.vue -->
<script setup lang="ts">
import { useHead } from '#imports'

import AppBreadcrumbs from '~/components/ui/AppBreadcrumbs.vue'
import PostgraduateTabs from '~/components/education/PostgraduateTabs.vue'
import { POSTGRAD_TABS } from '~/data/postgraduate'
import type { Crumb } from '~/composables/useBreadcrumbs'

useHead({ title: 'Doctoral studies — AANL' })

const crumbs: Crumb[] = [
  { label: 'Home', to: '/' },
  { label: 'Education', to: '/education' },
  {
    label: 'Postgraduate study',
    to: '/education/postgraduate-study/applicant'
  },
  { label: 'Doctoral studies' }
]

/* ---------- Images (SSR-safe) ---------- */
const imageMods = import.meta.glob(
  '~/assets/images/education/*',
  {
    eager: true,
    import: 'default'
  }
) as Record<string, string>

const imageByFile = Object.fromEntries(
  Object.entries(imageMods).map(([p, u]) => [p.split('/').pop()!, u])
)

function imgSrc(file: string): string {
  return imageByFile[file] || file
}

/* ---------- Content lists ---------- */

const aims: string[] = [
  'Development of highly qualified researchers capable of conducting independent scientific work in priority fields of physics and related disciplines.',
  'Formation of a new generation of scientists who can integrate into international research collaborations.',
  'Supporting the development of applied solutions that contribute to the technological and economic progress of the Republic of Armenia.'
]

const admissionRequirements: string[] = [
  'Master’s degree (or equivalent) in a relevant field, with sufficient academic performance.',
  'A clearly formulated research proposal that aligns with the scientific priorities of the A. I. Alikhanyan National Science Laboratory.',
  'Positive recommendation from the prospective scientific supervisor and the relevant professional chair.',
  'Successful completion of entrance exams in the chosen specialty and foreign language, in accordance with current regulations.'
]

const researchDirections: string[] = [
  'High-energy and particle physics.',
  'Nuclear physics and nuclear technologies.',
  'Astroparticle physics and cosmology.',
  'Cosmic-ray physics and space weather.',
  'Detector development, data acquisition systems, and scientific computing.'
]
</script>

<template>
  <div class="dark:bg-gray-950">
    <main
      class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-6 pb-16"
    >
      <!-- Breadcrumbs -->
      <AppBreadcrumbs :items="crumbs" />

      <!-- Top tabs -->
      <PostgraduateTabs
        :items="POSTGRAD_TABS"
        active-key="applicant" 
      />

      <!-- Heading + hero section -->
      <section class="mt-8">
        <header class="mb-4 sm:mb-6">
          <h1
            class="inline-block text-2xl sm:text-3xl font-bold tracking-tight
                   text-gray-900 dark:text-white
                   relative
                   after:content-[''] after:block after:h-[3px]
                   after:bg-gray-900 after:rounded-full after:mt-2"
          >
            Doctoral studies
          </h1>
        </header>

        <div
          class="grid gap-6 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)]
                 lg:gap-10 items-start"
        >
          <!-- Text -->
          <div
            class="space-y-3 text-sm sm:text-[15px] leading-relaxed
                   text-gray-700 dark:text-gray-200"
          >
            <p>
              Doctoral studies at the A. I. Alikhanyan National Science Laboratory
              are aimed at training highly qualified researchers in high-energy physics,
              nuclear physics, astrophysics and related scientific fields. The program
              is implemented in close cooperation with local and international
              research centers.
            </p>
            <p>
              Doctoral candidates work within scientific groups of the Laboratory,
              participate in ongoing experiments, and are involved in the full cycle
              of research: from the formulation of the scientific problem and
              experimental design to data analysis and publication of results in
              peer-reviewed journals.
            </p>
          </div>

          <!-- Hero image card -->
          <div
            class="rounded-3xl overflow-hidden bg-gray-100 dark:bg-gray-800
                   shadow-md ring-1 ring-black/5 dark:ring-white/10"
          >
            <img
              :src="imgSrc('postgraduate-doctoral-hero.webp')"
              alt="Doctoral studies at AANL"
              class="w-full h-full object-cover"
              loading="lazy"
              decoding="async"
            />
          </div>
        </div>
      </section>

      <!-- Aims of the doctoral program -->
      <section
        class="mt-10 rounded-3xl bg-white dark:bg-gray-900 shadow-md
               ring-1 ring-black/5 dark:ring-white/10 px-5 sm:px-7 py-5 sm:py-6"
      >
        <h2 class="text-base sm:text-lg font-semibold text-gray-900 dark:text-white mb-3">
          Aims of the doctoral program
        </h2>
        <ul class="space-y-2 text-sm sm:text-[15px] text-gray-700 dark:text-gray-200">
          <li
            v-for="(item, i) in aims"
            :key="i"
            class="flex gap-3"
          >
            <span
              class="mt-1 h-2 w-2 rounded-full bg-[#1D50A2] dark:bg-blue-400
                     flex-none"
            />
            <span>{{ item }}</span>
          </li>
        </ul>
      </section>

      <!-- Admission requirements + Research directions -->
      <section
        class="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8"
      >
        <!-- Admission requirements -->
        <article
          class="rounded-3xl bg-white dark:bg-gray-900 shadow-md
                 ring-1 ring-black/5 dark:ring-white/10 px-5 sm:px-7 py-5 sm:py-6"
        >
          <h2 class="text-base sm:text-lg font-semibold text-gray-900 dark:text-white mb-3">
            Admission requirements
          </h2>
          <ol class="space-y-2 text-sm sm:text-[15px] text-gray-700 dark:text-gray-200">
            <li
              v-for="(item, i) in admissionRequirements"
              :key="i"
              class="flex gap-3"
            >
              <span
                class="flex h-6 w-6 flex-none items-center justify-center rounded-full
                       bg-[#1D50A2] text-white text-xs font-semibold shadow-sm"
              >
                {{ i + 1 }}
              </span>
              <span>{{ item }}</span>
            </li>
          </ol>
        </article>

        <!-- Research directions -->
        <article
          class="rounded-3xl bg-white dark:bg-gray-900 shadow-md
                 ring-1 ring-black/5 dark:ring-white/10 px-5 sm:px-7 py-5 sm:py-6"
        >
          <h2 class="text-base sm:text-lg font-semibold text-gray-900 dark:text-white mb-3">
            Main research directions
          </h2>
          <ul class="space-y-2 text-sm sm:text-[15px] text-gray-700 dark:text-gray-200">
            <li
              v-for="(item, i) in researchDirections"
              :key="i"
              class="flex gap-3"
            >
              <span
                class="mt-1 h-2 w-2 rounded-full bg-[#1D50A2] dark:bg-blue-400
                       flex-none"
              />
              <span>{{ item }}</span>
            </li>
          </ul>

          <p class="mt-3 text-sm sm:text-[15px] text-gray-700 dark:text-gray-200">
            Doctoral candidates may also participate in large-scale international
            collaborations (CERN, DESY, etc.), with the possibility of long-term
            research visits and joint supervision.
          </p>
        </article>
      </section>

      <!-- Duration & supervision -->
      <section
        class="mt-8 rounded-3xl bg-[#EDF4FF] dark:bg-slate-900
               px-4 sm:px-8 lg:px-10 py-6 sm:py-8 lg:py-9"
      >
        <h2 class="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white mb-3">
          Duration, supervision and thesis defence
        </h2>
        <div
          class="space-y-3 text-sm sm:text-[15px] leading-relaxed
                 text-gray-700 dark:text-gray-200"
        >
          <p>
            The standard duration of doctoral studies is up to four years.
            Each doctoral candidate is assigned a scientific supervisor and, if
            necessary, a co-supervisor from partner universities or research
            centers.
          </p>
          <p>
            The doctoral thesis is defended before a specialized council in
            accordance with the regulations of the Supreme Certifying Commission
            and internal rules of the Laboratory. Successful defence grants the
            scientific degree of Doctor of Philosophy (PhD) in the corresponding
            specialty.
          </p>
        </div>
      </section>
    </main>
  </div>
</template>
