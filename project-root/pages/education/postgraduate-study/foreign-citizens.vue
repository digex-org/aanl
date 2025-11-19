<script setup lang="ts">
import { useHead } from '#imports'
import AppBreadcrumbs from '~/components/ui/AppBreadcrumbs.vue'
import PostgraduateTabs from '~/components/education/PostgraduateTabs.vue'
import EducationSectionShell from '~/components/education/EducationSectionShell.vue'
import { POSTGRAD_TABS } from '~/data/postgraduate'
import type { Crumb } from '~/composables/useBreadcrumbs'
import NumberedList from '~/components/education/NumberedList.vue'

import { createImageResolver } from '~/utils/images'

useHead({ title: 'Application form — Postgraduate study — AANL' })

/* ---------- Breadcrumbs ---------- */
const crumbs: Crumb[] = [
  { label: 'Home', to: '/' },
  { label: 'Education', to: '/education' },
  { label: 'foreign Citizens', to: '/education/postgraduate-study/foreign-citizens' },
  { label: 'Application form' }
]

/* ---------- Images ---------- */
const imgMods = import.meta.glob(
  '~/assets/images/education/*',
  { eager: true, import: 'default' }
) as Record<string, string>

const resolveImg = createImageResolver(imgMods)

const heroSrc = computed(() => resolveImg('application-form.webp'))
const requiredDocsImg = computed(() => resolveImg('doctoral.webp'))
const languageImg = computed(() => resolveImg('study.webp'))

/* ---------- Content ---------- */

const introText = `At “A. I. Alikhanyan National Science Laboratory”, the registration of applicants is done in the frames of the RA Government approved decision No. 238 of February 25, 2016, on the “Procedure for the admission and education of post-graduate, doctoral students, and applicant registration in the Republic of Armenia” and is organized twice a year: in January from 11 to 30 and in September from 1 to 20. The duration of the studies does not exceed 5 years and is carried out on a paid basis.`

const admissionBlock = {
  title: 'Admission of applicants for the 2024–2025 academic year',
  text: `“A. I. Alikhanyan National Science Laboratory” announces the admission of applicants for the 2024–2025 academic year. The duration of the studies does not exceed 5 years and is carried out on a payable basis (Tuition fee is 500 000 AMD, for “A. I. Alikhanyan National Science Laboratory employees 250 000 AMD). The required documents should be submitted from September 2–20 (included), 2024.`
}

const requirements = [
  'A scientific article or scientific abstract from the chosen profession.',
  'A positive recommendation from the professional chair and the written consent of the potential scientific supervisor.',
  'Exam in a foreign language.'
]

const requiredDocs = [
  'Application to “A. I. Alikhanyan National Science Laboratory” rector (from the applicant or his/her authorized person).',
  'Copies of diplomas and their mark sheets (Bachelor’s, Master’s).',
  'A scientific article or scientific abstract from the chosen profession.',
  'Personal data sheet with 3 photos (3×4 size).',
  'Copies of passport and social card.',
  'Autobiography.',
  'A copy of the employment record book (if available).'
]

const languageLines = [
  'For the certificate of the “Foreign Language” subject, an internal threshold has been defined with a point evaluation.',
  'The required minimum score for specific languages are:',
  'English (TOEFL, IBT): 46 and “IELTS”: 5.5 points,',
  'French (TCF): 200 points,',
  'German (On Daf): 60 points.',
  'Applicants whose professional subjects are English, French, or German shall take an exam in another foreign language.'
]
</script>

<template>
  <div class="dark:bg-gray-950">
    <main class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-6 pb-16">
      <!-- Breadcrumbs -->
      <AppBreadcrumbs :items="crumbs" />

      <!-- Tabs -->
      <PostgraduateTabs
        :items="POSTGRAD_TABS"
        active-key="foreign-citizens"
        class="mt-4"
      />

      <!-- Page title & hero -->
      <section class="mt-8">
        <header class="mb-5">
          <h1
            class="inline-block text-2xl sm:text-3xl font-bold tracking-tight
                   text-gray-900 dark:text-white
                   relative after:content-[''] after:block after:h-[3px]
                   after:bg-gray-900 after:rounded-full after:mt-2"
          >
            Application form
          </h1>
        </header>

        <div
          class="grid gap-6 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)]
                 lg:gap-10 items-start"
        >
          <EducationSectionShell variant="outlined">
            <p class="text-sm sm:text-[15px] leading-relaxed text-gray-700 dark:text-gray-200">
              {{ introText }}
            </p>
          </EducationSectionShell>

          <EducationSectionShell variant="outlined" :padded="false">
            <img
              :src="heroSrc"
              alt="Signing application form"
              class="h-full w-full object-cover"
              loading="lazy"
              decoding="async"
            />
          </EducationSectionShell>
        </div>
      </section>

      <!-- Admission + Requirements (two white cards) -->
      <section
        class="mt-10 lg:mt-12 grid gap-6 lg:grid-cols-2"
      >
        <EducationSectionShell variant="soft" >
          <h2 class="text-sm sm:text-base  font-semibold text-gray-900 dark:text-white mb-2">
            {{ admissionBlock.title }}
          </h2>
          <p class="text-xs sm:text-[13px] leading-relaxed text-gray-700 dark:text-gray-200">
            {{ admissionBlock.text }}
          </p>
        </EducationSectionShell>

        <EducationSectionShell variant="card">
          <h2 class="text-sm sm:text-base font-semibold text-gray-900 dark:text-white mb-2">
            Requirements
          </h2>
            <NumberedList
            :items="requirements"
            variant="soft-brand"
            />

        </EducationSectionShell>
      </section>

      <!-- Required documents (blue panel with image) -->
      <section class="mt-10 lg:mt-12">
        <EducationSectionShell variant="soft">
          <div
            class="grid gap-6 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)]
                   lg:gap-10 items-start"
          >
            <!-- Image -->
            <div
              class="rounded-3xl overflow-hidden bg-gray-100 dark:bg-gray-800
                     shadow-sm ring-1 ring-black/5 dark:ring-white/10"
            >
              <img
                :src="requiredDocsImg"
                alt="Documents stack"
                class="h-full w-full object-cover"
                loading="lazy"
                decoding="async"
              />
            </div>

            <!-- Text -->
            <div>
              <h2 class="text-sm sm:text-base font-semibold text-gray-900 dark:text-white mb-3">
                Required documents
              </h2>
                <NumberedList
                :items="requiredDocs"
                variant="soft-brand"
                />

            </div>
          </div>
        </EducationSectionShell>
      </section>

      <!-- Foreign language proficiency block -->
      <section class="mt-10 lg:mt-12">
        <EducationSectionShell variant="card">
          <div
            class="grid gap-6 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)]
                   lg:gap-10 items-start"
          >
            <!-- Text -->
            <div>
              <h2 class="text-sm sm:text-base font-semibold text-gray-900 dark:text-white mb-3">
                Foreign Language Proficiency Examination Schedule
              </h2>
              <p
                v-for="(line, idx) in languageLines"
                :key="idx"
                class="text-xs sm:text-[13px] leading-relaxed text-gray-700 dark:text-gray-200"
              >
                {{ line }}
              </p>
            </div>

            <!-- Image -->
            <div
              class="rounded-3xl overflow-hidden bg-gray-100 dark:bg-gray-800
                     shadow-sm ring-1 ring-black/5 dark:ring-white/10"
            >
              <img
                :src="languageImg"
                alt="Stack of language books"
                class="max-h-100 w-full object-cover"
                loading="lazy"
                decoding="async"
              />
            </div>
          </div>
        </EducationSectionShell>
      </section>
    </main>
  </div>
</template>
