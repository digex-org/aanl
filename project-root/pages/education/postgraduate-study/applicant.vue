<!-- pages/education/postgraduate-study/applicant.vue -->
<script setup lang="ts">
import { useHead } from '#imports'

import AppBreadcrumbs from '~/components/ui/AppBreadcrumbs.vue'
import PostgraduateTabs from '~/components/education/PostgraduateTabs.vue'
import BulletList from '~/components/education/BulletList.vue'

import { POSTGRAD_TABS } from '~/data/postgraduate'
import type { Crumb } from '~/composables/useBreadcrumbs'
import { createImageResolver } from '~/utils/images'

useHead({ title: 'Postgraduate admission — Applicant — AANL' })

/* ---------- Breadcrumbs ---------- */
const crumbs: Crumb[] = [
  { label: 'Home', to: '/' },
  { label: 'Education', to: '/education' },
  { label: 'Postgraduate study', to: '/education/postgraduate-study/applicant' },
  { label: 'Applicant' }
]

/* ---------- Images ---------- */
/**
 * All images are expected in: ~/assets/images/education/*
 * Adjust file names if needed.
 */
const imgMods = import.meta.glob(
  '~/assets/images/education/*',
  { eager: true, import: 'default' }
) as Record<string, string>

const resolveImg = createImageResolver(imgMods)

// top-right hero image
const heroSrc = resolveImg('aplicant.webp')

// card images
const admissionCardImg = resolveImg('admission.webp')
const applicationFormCardImg = resolveImg('application-form.webp')
const doctoralStudiesCardImg = resolveImg('doctoral.webp')
const thirdCycleCardImg = resolveImg('pexels.webp')

/* ---------- Content: top introduction ---------- */

const introBullets = [
  'The organization of “A. I. Alikhanyan National Science Laboratory” Ph.D. and Doctorate admissions and applicants’ (researchers’) registration process.',
  'The organization of “A. I. Alikhanyan National Science Laboratory” Ph.D. students’ and applicants’ studies and annual evaluation.',
  'Development of draft orders and other legal acts related to the studies or research activities of Ph.D. students, applicants, and doctoral students.',
  'Drafting proposals aimed at reforming various regulatory orders and other legal acts related to Ph.D., Doctoral, and Applicant systems.',
  'Preparation of relevant reports, proposals, expert reports, and other documents.',
  'Drafting responses to received official letters, citizen applications, complaints, etc.'
]

/* ---------- Content: cards under the hero ---------- */

type ApplicantCard = {
  key: string
  title: string
  description: string
  imageSrc: string
  to: string
}

const cards: ApplicantCard[] = [
  {
    key: 'admission',
    title: 'Admission',
    description:
      'The admission of the full-time and part-time education of Ph.D. studies at “A. I. Alikhanyan National Science Laboratory” is organized in the frames of the RA Government-approved decision No. 238 and according to the schedule established by the RA ESCS Ministry.',
    imageSrc: admissionCardImg,
    to: '/education/postgraduate-study/admission'
  },
  {
    key: 'application-form',
    title: 'Application form',
    description:
      'At “A. I. Alikhanyan National Science Laboratory”, the registration of applicants is made in the frames of the RA Government-approved decision No. 238 and is organized twice a year: in January and in September within the specified dates.',
    imageSrc: applicationFormCardImg,
    to: '/education/postgraduate-study/application-form'
  },
  {
    key: 'doctoral-studies',
    title: 'Doctoral studies',
    description:
      'The registration for Doctorate Studies at “A. I. Alikhanyan National Science Laboratory” is organized in the frames of the RA Government-approved decision No. 238, ensuring high-level scientific research and supervision.',
    imageSrc: doctoralStudiesCardImg,
    to: '/education/postgraduate-study/doctoral-studies'
  },
  {
    key: 'third-cycle',
    title: 'Formation of Third-cycle studies',
    description:
      'At “A. I. Alikhanyan National Science Laboratory”, the registration of applicants for third-cycle (doctoral) studies is organized in accordance with national regulations, supporting the development of young researchers and highly qualified specialists.',
    imageSrc: thirdCycleCardImg,
    to: '/education/postgraduate-study/third-cycle-studies'
  }
]
</script>

<template>
  <div class="dark:bg-gray-950">
    <main class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-6 pb-16">
      <!-- Breadcrumbs -->
      <AppBreadcrumbs :items="crumbs" />

      <!-- Tabs (Applicant / Admission / Foreign citizens / Application form) -->
      <PostgraduateTabs
        :items="POSTGRAD_TABS"
        active-key="applicant"
        class="mt-4"
      />

      <!-- TOP SECTION: title + bullets (left), hero image (right) -->
      <section class="mt-8">
        <!-- Page title -->
        <header class="mb-6">
          <h1
            class="inline-block text-2xl sm:text-3xl font-bold tracking-tight
                   text-gray-900 dark:text-white
                   relative after:content-[''] after:block after:h-[3px]
                   after:bg-gray-900 after:rounded-full after:mt-2"
          >
            Postgraduate admission
          </h1>
        </header>

        <div
          class="grid gap-8 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)]
                 items-start"
        >
          <!-- Left: center activities bullets -->
          <div>
            <p class="text-sm sm:text-[15px] font-semibold text-gray-900 dark:text-white mb-3">
              The center’s activities include:
            </p>

            <BulletList
              :items="introBullets"
              size="sm"
              variant="dot"
              class="text-gray-700 dark:text-gray-200"
            />
          </div>

          <!-- Right: hero image -->
          <div
            class="rounded-3xl overflow-hidden bg-gray-100 dark:bg-gray-800
                   shadow-sm ring-1 ring-black/5 dark:ring-white/10"
          >
            <img
              :src="heroSrc"
              alt="Stack of postgraduate admission documents"
              class="w-full h-[260px] sm:h-80 lg:h-[340px] object-cover"
              loading="lazy"
              decoding="async"
            />
          </div>
        </div>
      </section>

  
    <!-- GRID OF FOUR CARDS -->
        <section class="mt-12 lg:mt-14">
        <div
            class="grid gap-8 lg:gap-10
                grid-cols-1 md:grid-cols-2"
        >
            <article
            v-for="card in cards"
            :key="card.key"
            class="flex flex-col items-center"
            >
            <!-- Image wrapper -->
            <div
                class="w-full rounded-3xl overflow-hidden
                    bg-gray-100 dark:bg-gray-800
                    shadow-sm ring-1 ring-black/5 dark:ring-white/10"
            >
                <img
                :src="card.imageSrc"
                :alt="card.title"
                class="h-full w-full object-cover"
                loading="lazy"
                decoding="async"
                />
            </div>

            <!-- Floating blue panel (narrower, overlapping image) -->
            <div class="w-full flex justify-center">
                <div
                class="relative -mt-7 w-[90%] sm:w-[86%]
                        bg-[#EAF3FF] dark:bg-[#1b2640]
                        px-6 sm:px-7 pt-5 pb-6
                        rounded-3xl shadow-md
                        ring-1 ring-black/5 dark:ring-black/40
                        flex flex-col"
                >
                <!-- Title -->
                <h2
                    class="text-sm sm:text-base font-semibold
                        text-gray-900 dark:text-white
                        text-center mb-3"
                >
                    {{ card.title }}
                </h2>

                <!-- Description -->
                <p
                    class="text-xs sm:text-[13px] leading-relaxed
                        text-gray-700 dark:text-gray-200"
                >
                    {{ card.description }}
                </p>

                <!-- CTA button -->
                <div class="mt-5 flex justify-center">
                    <NuxtLink
                    :to="card.to"
                    class="inline-flex items-center justify-center
                            rounded-full bg-[#1D50A2] text-white
                            px-8 h-11 text-xs sm:text-sm font-semibold
                            hover:bg-[#174088] transition-colors"
                    >
                    View More
                    </NuxtLink>
                </div>
                </div>
            </div>
            </article>
        </div>
        </section>

    </main>
  </div>
</template>
