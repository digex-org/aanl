<script setup lang="ts">
import { computed } from 'vue'
import { useHead } from '#imports'

import AppBreadcrumbs from '~/components/ui/AppBreadcrumbs.vue'
import PostgraduateTabs from '~/components/education/PostgraduateTabs.vue'
import EducationSectionShell from '~/components/education/EducationSectionShell.vue'
import NumberedList from '~/components/education/NumberedList.vue'
import InfoCallout from '~/components/education/InfoCallout.vue'
import BulletList from '~/components/education/BulletList.vue'

import { POSTGRAD_TABS } from '~/data/postgraduate'
import type { Crumb } from '~/composables/useBreadcrumbs'
import { createImageResolver } from '~/utils/images'

useHead({ title: 'Admission to postgraduate studies — AANL' })

/* ---------- Breadcrumbs ---------- */
const crumbs: Crumb[] = [
  { label: 'Home', to: '/' },
  { label: 'Education', to: '/education' },
  { label: 'Postgraduate study', to: '/education/postgraduate-study/applicant' },
  { label: 'Admission' }
]

/* ---------- Images ---------- */
const imgMods = import.meta.glob(
  '~/assets/images/education/*',
  { eager: true, import: 'default' }
) as Record<string, string>

const resolveImg = createImageResolver(imgMods)

const heroSrc = computed(() => resolveImg('pexels.webp'))          // top left image
const requiredDocsImg = computed(() => resolveImg('admission.webp'))

/* ---------- Content data ---------- */

const introText = `The admission of the full-time and part-time education of Ph.D. studies at “A. I. Alikhanyan National Science Laboratory” is organized in the frames of the RA Government-approved decision No. 238 of February 25, 2016, on the “Procedure for the admission and education of post-graduate, doctoral students, and applicant registration in the Republic of Armenia” and according to the schedule established by the RA ESCS Ministry for each academic year.`

const partTimeTitle =
  'Part-time Ph.D. studies admission for 2024/2025 academic year'

const partTimeParagraphs = [
  `Yerevan State University announces the admission of part-time Ph.D. studies on a tuition-free and payable basis for the 2024–2025 academic year.`,
  `The requested documents for admission for part-time studies (tuition-free and on a payable basis) shall be submitted from August 26 to September 16, 2024.`,
  `Distribution of student allowances by majors for full tuition fee reimbursement (free) and on a payable basis Ph.D. spots is available here.`
]

const requiredDocs = [
  'Application to the “A. I. Alikhanyan National Science Laboratory” rector (from the applicant or authorized person).',
  'Copies of diplomas and their supplements (Bachelor’s, Master’s).',
  'The certificate of the passed “Foreign language” subject or a corresponding reference.',
  'A scientific article or a scientific abstract from the chosen major.',
  'CV with 3 photos (3×4 size).',
  'Personal record sheet.',
  'Copies of passport and social card.',
  'A copy of the labor book (if available).'
]

const attentionIntro =
  'For the certificate of the “Foreign Language” subject, an internal threshold has been defined with a point evaluation.'

const languageScores = [
  'English (TOEFL, IBT): 46 points and IELTS: 5.5 points.',
  'French (TCF): 200 points.',
  'German (On Daf): 60 points.'
]

const attentionOutro =
  'Applicants whose professional subjects are English, French, or German shall take an exam in another foreign language.'

const examScheduleText =
  'The schedule of professional entrance exams for free and paid distance learning postgraduate studies for the 2024/2025 academic year is down.'

const questionnairesRows = [
  { code: 'A.01.01', specialty: 'Mathematical analysis' },
  { code: 'A.01.05', specialty: 'Theory of Probabilities and Mathematical Statistics' },
  { code: 'A.01.07', specialty: 'Computational Mathematics' }
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
        active-key="admission"
        class="mt-4"
      />

      <!-- TITLE + INTRO CARD -->
      <section class="mt-8">
        <header class="mb-5">
          <h1
            class="inline-block text-2xl sm:text-3xl font-bold tracking-tight
                   text-gray-900 dark:text-white
                   relative after:content-[''] after:block after:h-[3px]
                   after:bg-gray-900 after:rounded-full after:mt-2"
          >
            Admission to postgraduate studies
          </h1>
        </header>

        <!-- Full-width intro text (matches first section in design) -->
        <EducationSectionShell variant="outlined" class="w-200">
          <p class="text-sm sm:text-[15px] leading-relaxed text-gray-700 dark:text-gray-200">
            {{ introText }}
          </p>
        </EducationSectionShell>
      </section>

      <!-- IMAGE (LEFT) + PART-TIME TEXT (RIGHT) -->
      <section class="mt-10 lg:mt-12">
        <EducationSectionShell variant="card">
          <div
            class="grid gap-6 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)]
                   lg:gap-10 items-start"
          >

            <!-- Image -->
            <div
              class="rounded-3xl overflow-hidden bg-gray-100 dark:bg-gray-800
                     shadow-sm ring-1 ring-black/5 dark:ring-white/10"
            >
            <img
                :src="heroSrc"
                alt="Admission documents"
                class="h-full w-full rounded-3xl object-cover"
                loading="lazy"
                decoding="async"
            />
            </div>

             <!-- Text -->
            <div>
              <h2 class="text-sm sm:text-base font-semibold text-gray-900 dark:text-white mb-3">
                 {{ partTimeTitle }}
              </h2>
            <p v-for="(p, idx) in partTimeParagraphs" :key="idx">
              {{ p }}
            </p>
            </div>
          </div>
        </EducationSectionShell>
      </section>

      <!-- REQUIRED DOCUMENTS (blue block with image on the right) -->
      <section class="mt-10 lg:mt-12">
        <EducationSectionShell variant="soft">
          <div
            class="grid gap-6 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)]
                   lg:gap-10 items-start"
          >
            <!-- Text side -->
            <div>
              <h2 class="text-base sm:text-lg font-semibold text-gray-900 dark:text-white mb-3">
                Required documents
              </h2>

              <p class="text-xs sm:text-[13px] text-gray-700 dark:text-gray-200 mb-4">
                In order to be admitted to postgraduate studies on a free and paid basis,
                both on-site and distance learning, the applicant must submit the
                following documents to the A. I. Alikhanyan National Science Laboratory
                Doctoral Education Center within the specified period:
              </p>

              <NumberedList
                :items="requiredDocs"
                variant="white-on-brand"
              />
            </div>

            <!-- Image side -->
            <div
              class="rounded-3xl overflow-hidden bg-gray-100 dark:bg-gray-800
                     shadow-sm ring-1 ring-black/5 dark:ring-white/10"
            >
              <img
                :src="requiredDocsImg"
                alt="Required documents stack"
                class="h-full w-full object-cover"
                loading="lazy"
                decoding="async"
              />
            </div>
          </div>
        </EducationSectionShell>
      </section>

      <!-- ATTENTION + EXAM SCHEDULE -->
      <section
        class="mt-10 lg:mt-12 grid gap-6 lg:grid-cols-2"
      >
        <!-- Attention (callout) -->
        <InfoCallout
          variant="info"
          eyebrow="Attention!"
          title="Foreign language certificate requirements"
        >
          <p class="text-xs sm:text-[13px] leading-relaxed">
            {{ attentionIntro }}
          </p>

          <p class="mt-2 text-xs sm:text-[13px] leading-relaxed">
            The required minimum scores for specific languages are:
          </p>

          <BulletList
            class="mt-2"
            :items="languageScores"
            variant="dash"
            size="sm"
          />

          <p class="mt-2 text-xs sm:text-[13px] leading-relaxed">
            {{ attentionOutro }}
          </p>
        </InfoCallout>

        <!-- Schedule of comprehensive exams -->
        <EducationSectionShell variant="card">
          <h2 class="text-sm sm:text-base font-semibold text-gray-900 dark:text-white mb-2">
            Schedule of Comprehensive Exams for Ph.D. admission
          </h2>
          <p class="text-xs sm:text-[13px] leading-relaxed text-gray-700 dark:text-gray-200 mb-4">
            {{ examScheduleText }}
          </p>

          <a
            href="http://www.mfa.am"
            target="_blank"
            rel="noopener"
            class="inline-flex items-center gap-2 rounded-full border border-[#1D50A2]
                   px-4 py-2 text-xs sm:text-sm font-semibold text-[#1D50A2]
                   hover:bg-[#1D50A2] hover:text-white transition-colors"
          >
            <span class="inline-block h-2 w-2 rounded-full bg-[#1D50A2]" />
            <span>http://www.mfa.am</span>
          </a>

          <p class="mt-3 text-xs sm:text-[13px] text-gray-600 dark:text-gray-300">
            Please bring your ID to the exam.
          </p>
        </EducationSectionShell>
      </section>

      <!-- QUESTIONNAIRES TABLE -->
      <section class="mt-10 lg:mt-12">
        <EducationSectionShell variant="outlined" >
          <!-- Outer rounded block (card + table) -->
          <div
            class="overflow-hidden rounded-3xl border border-gray-100 dark:border-gray-700
                   shadow-sm bg-white dark:bg-gray-900"
          >
            <!-- Blue title bar (matches design) -->
            <div
              class="bg-[#1D50A2] text-white text-center
                     px-4 py-3 sm:py-4 text-xs sm:text-sm font-semibold"
            >
              Postgraduate admission professional exam questionnaires
              for 2023–2024 academic year
            </div>

            <!-- Table -->
            <table class="w-full text-xs sm:text-sm">
              <!-- Header row: light blue background -->
              <thead class="bg-[#F3F7FF] text-[#1D50A2]">
                <tr>
                  <th
                    class="w-32 px-6 py-3 text-left font-semibold"
                  >
                    Code       
                  </th>
                  <th
                    class="px-6 py-3 text-center font-semibold"
                  >
                    Specialty
                  </th>
                </tr>
              </thead>

              <tbody
                class="divide-y divide-gray-100 dark:divide-gray-700"
              >
                <tr
                  v-for="row in questionnairesRows"
                  :key="row.code"
                  class="hover:bg-gray-50 dark:hover:bg-gray-800"
                >
                  <!-- Code as blue link -->
                  <td class="px-6 py-3">
                    <a
                      href="#"
                      class="text-[#1D50A2] font-medium hover:underline"
                    >
                      {{ row.code }}
                    </a>
                  </td>

                  <!-- Specialty centered -->
                  <td
                    class="px-6 py-3 text-center text-gray-900 dark:text-gray-100"
                  >
                    {{ row.specialty }}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </EducationSectionShell>
      </section>

    </main>
  </div>
</template>
