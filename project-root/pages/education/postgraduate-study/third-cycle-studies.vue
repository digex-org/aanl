<!-- pages/education/postgraduate-study/third-cycle-studies.vue -->
<script setup lang="ts">
import { useHead } from '#imports'

import AppBreadcrumbs from '~/components/ui/AppBreadcrumbs.vue'
import PostgraduateTabs from '~/components/education/PostgraduateTabs.vue'
import { POSTGRAD_TABS } from '~/data/postgraduate'
import type { Crumb } from '~/composables/useBreadcrumbs'

useHead({ title: 'Formation of Third-cycle studies — AANL' })

const crumbs: Crumb[] = [
  { label: 'Home', to: '/' },
  { label: 'Education', to: '/education' },
  {
    label: 'Postgraduate study',
    to: '/education/postgraduate-study/applicant'
  },
  { label: 'Formation of Third-cycle studies' }
]

/* ---------- Images (SSR-safe) ---------- */
const imageMods = import.meta.glob(
  '~/assets/images/education/postgraduate/*',
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

const goals: string[] = [
  'Aligning doctoral education at AANL with the principles of the European Higher Education Area and the third cycle of higher education.',
  'Ensuring transparency of learning outcomes, workload and quality assurance mechanisms in doctoral programs.',
  'Strengthening the link between education, research and innovation through competitive research projects.'
]

const structurePoints: string[] = [
  'Structured doctoral programs that combine individual research with coursework, seminars and transferable skills training.',
  'Annual progress reviews and intermediate attestation of doctoral candidates by committees of experts.',
  'Integration of doctoral candidates into research groups, international collaborations and mobility schemes.'
]

const qualityAssurance: string[] = [
  'Clear criteria for the selection and evaluation of supervisors.',
  'Regular monitoring of doctoral candidates’ progress and workload.',
  'External peer review of programs and thesis evaluations where appropriate.'
]
</script>

<template>
  <div class="dark:bg-gray-950">
    <main
      class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-6 pb-16"
    >
      <!-- Breadcrumbs -->
      <AppBreadcrumbs :items="crumbs" />

      <!-- Tabs -->
      <PostgraduateTabs
        :items="POSTGRAD_TABS"
        active-key="applicant" 
      />

      <!-- Heading + hero -->
      <section class="mt-8">
        <header class="mb-4 sm:mb-6">
          <h1
            class="inline-block text-2xl sm:text-3xl font-bold tracking-tight
                   text-gray-900 dark:text-white
                   relative
                   after:content-[''] after:block after:h-[3px]
                   after:bg-gray-900 after:rounded-full after:mt-2"
          >
            Formation of Third-cycle studies
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
              The formation of Third-cycle studies at the A. I. Alikhanyan National
              Science Laboratory is guided by international best practices in doctoral
              education. The Laboratory aims to create a modern environment where
              doctoral candidates receive structured research training, acquire
              transferable skills and participate in competitive scientific projects.
            </p>
            <p>
              Third-cycle studies are implemented in cooperation with universities and
              partner institutions, ensuring that doctoral graduates are well prepared
              for careers in academia, research organizations, high-tech industry and
              public sector institutions.
            </p>
          </div>

          <!-- Hero image -->
          <div
            class="rounded-3xl overflow-hidden bg-gray-100 dark:bg-gray-800
                   shadow-md ring-1 ring-black/5 dark:ring-white/10"
          >
            <img
              :src="imgSrc('postgraduate-third-cycle-hero.webp')"
              alt="Third-cycle doctoral studies"
              class="w-full h-full object-cover"
              loading="lazy"
              decoding="async"
            />
          </div>
        </div>
      </section>

      <!-- Goals -->
      <section
        class="mt-10 rounded-3xl bg-white dark:bg-gray-900 shadow-md
               ring-1 ring-black/5 dark:ring-white/10 px-5 sm:px-7 py-5 sm:py-6"
      >
        <h2 class="text-base sm:text-lg font-semibold text-gray-900 dark:text-white mb-3">
          Goals of forming Third-cycle studies
        </h2>
        <ul class="space-y-2 text-sm sm:text-[15px] text-gray-700 dark:text-gray-200">
          <li
            v-for="(item, i) in goals"
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

      <!-- Structure + Quality assurance -->
      <section
        class="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8"
      >
        <!-- Structure -->
        <article
          class="rounded-3xl bg-white dark:bg-gray-900 shadow-md
                 ring-1 ring-black/5 dark:ring-white/10 px-5 sm:px-7 py-5 sm:py-6"
        >
          <h2 class="text-base sm:text-lg font-semibold text-gray-900 dark:text-white mb-3">
            Structure of Third-cycle studies
          </h2>
          <ul class="space-y-2 text-sm sm:text-[15px] text-gray-700 dark:text-gray-200">
            <li
              v-for="(item, i) in structurePoints"
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
        </article>

        <!-- Quality assurance -->
        <article
          class="rounded-3xl bg-white dark:bg-gray-900 shadow-md
                 ring-1 ring-black/5 dark:ring-white/10 px-5 sm:px-7 py-5 sm:py-6"
        >
          <h2 class="text-base sm:text-lg font-semibold text-gray-900 dark:text-white mb-3">
            Quality assurance and evaluation
          </h2>
          <ul class="space-y-2 text-sm sm:text-[15px] text-gray-700 dark:text-gray-200">
            <li
              v-for="(item, i) in qualityAssurance"
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
            These mechanisms ensure that the quality of doctoral training is maintained
            at an internationally competitive level and that the degrees awarded by
            AANL remain highly recognized.
          </p>
        </article>
      </section>

      <!-- Final note -->
      <section
        class="mt-8 rounded-3xl bg-[#EDF4FF] dark:bg-slate-900
               px-4 sm:px-8 lg:px-10 py-6 sm:py-8 lg:py-9"
      >
        <h2 class="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white mb-3">
          Cooperation and mobility
        </h2>
        <p
          class="text-sm sm:text-[15px] leading-relaxed
                 text-gray-700 dark:text-gray-200"
        >
          Third-cycle studies at AANL are closely connected with international
          research infrastructure. Doctoral candidates are encouraged to participate in
          joint programs, cotutelle schemes and research exchanges, thereby increasing
          the visibility of Armenian science and integrating into the global scientific
          community.
        </p>
      </section>
    </main>
  </div>
</template>
