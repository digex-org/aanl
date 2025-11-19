<!-- pages/education/index.vue -->
<script setup lang="ts">
import { computed } from 'vue'
import { useHead } from '#imports'

import AppBreadcrumbs from '~/components/ui/AppBreadcrumbs.vue'
import type { Crumb } from '~/composables/useBreadcrumbs'
import { createImageResolver } from '~/utils/images'

useHead({ title: 'Education — AANL' })

/* ---------- Breadcrumbs ---------- */
const crumbs: Crumb[] = [
  { label: 'Home', to: '/' },
  { label: 'Education' }
]

/* ---------- Images ---------- */
const imgMods = import.meta.glob(
  '~/assets/images/education/*',
  { eager: true, import: 'default' }
) as Record<string, string>

const resolveImg = createImageResolver(imgMods)

// Adjust filenames to your actual assets
const heroSrc = computed(() => resolveImg('admission.webp'))

/* ---------- Top article content (like seminars inner page) ---------- */

const introBlocks = [
  `Postgraduate and continuing education at “A. I. Alikhanyan National Science Laboratory” is
  organized in accordance with the RA Government-approved decision No. 238 of February 25, 2016
  on the “Procedure for the admission and education of post-graduate, doctoral students,
  and applicant registration in the Republic of Armenia”.`,

  `Through its postgraduate programmes, AANL supports the training of highly qualified researchers,
  provides access to unique experimental infrastructure, and encourages active participation in
  international collaborations in high-energy physics, astrophysics, nuclear physics, and related fields.`,

  `On this page you can explore key education directions of the Laboratory — from postgraduate
  admission and application procedures to doctoral and third-cycle studies.`
]

/* ---------- Cards (same pattern as applicant.vue floating panels) ---------- */

type EducationCard = {
  key: string
  title: string
  description: string
  imageFile: string
  to: string
}

const cards: EducationCard[] = [
  {
    key: 'postgraduate-admission',
    title: 'Postgraduate admission',
    description:
      'Learn about the structure of postgraduate studies at AANL, admission rules, timelines, and the main responsibilities of the Postgraduate Education Center.',
    imageFile: 'aplicant.webp', // graduation cap image
    to: '/education/postgraduate-study/applicant'
  },
  {
    key: 'admission-procedure',
    title: 'Admission procedure',
    description:
      'Detailed information on part-time and full-time Ph.D. studies, required documents, timelines and admission conditions for the 2024/2025 academic year.',
    imageFile: 'admission.webp',
    to: '/education/postgraduate-study/admission'
  },
  {
    key: 'application-form',
    title: 'Application form',
    description:
      'How to register as an applicant, submission deadlines, tuition fees, and the list of required documents for admission to AANL postgraduate programmes.',
    imageFile: 'books.webp',
    to: '/education/postgraduate-study/application-form'
  },
  {
    key: 'doctoral-third-cycle',
    title: 'Doctoral & third-cycle studies',
    description:
      'Information about doctoral studies and third-cycle programmes, scientific supervision, research topics, and requirements for defending a dissertation.',
    imageFile: 'books.webp',
    to: '/education/postgraduate-study/doctoral-studies'
  }
]
</script>

<template>
  <div class="dark:bg-gray-950">
    <main class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-6 pb-16">
      <!-- Breadcrumbs -->
      <AppBreadcrumbs :items="crumbs" />

      <!-- HERO + OVERLAPPING ARTICLE (same idea as seminars inner page) -->
      <section class="mt-6">
        <div class="mx-auto max-w-7xl">
          <!-- Hero banner -->
          <div class="relative isolate overflow-hidden rounded-xl bg-gray-900">
            <img
              :src="heroSrc"
              alt="Education at AANL"
              class="w-full h-[260px] sm:h-[340px] lg:h-[360px] object-cover"
              loading="eager"
              decoding="async"
              fetchpriority="high"
            />

            <!-- Gradient overlay -->
            <div
              class="absolute inset-0
                     bg-[linear-gradient(180deg,rgba(0,0,0,0.55),rgba(0,0,0,0.35))]"
            />

            <!-- Title inside hero -->
            <div class="absolute inset-0">
              <div
                class="mx-auto flex h-full max-w-7xl items-end
                       px-4 sm:px-6 lg:px-8 pb-6 sm:pb-8"
              >
                <h1
                  class="text-3xl sm:text-4xl font-extrabold tracking-tight
                         text-white"
                >
                  Education
                </h1>
              </div>
            </div>
          </div>

          <!-- Overlapping article card -->
          <div class="relative">
            <article
              class="mx-auto max-w-3xl lg:max-w-4xl
                     -mt-10 sm:-mt-14 lg:-mt-16
                     relative z-10
                     rounded-3xl bg-white dark:bg-gray-900
                     shadow-xl ring-1 ring-black/5 dark:ring-white/10
                     px-4 sm:px-8 lg:px-10 py-6 sm:py-8 lg:py-9"
            >
              <div
                class="space-y-5 sm:space-y-6
                       text-sm sm:text-[15px] leading-relaxed
                       text-gray-700 dark:text-gray-200"
              >
                <p
                  v-for="(para, idx) in introBlocks"
                  :key="idx"
                >
                  {{ para }}
                </p>
              </div>
            </article>
          </div>
        </div>
      </section>

      <!-- GRID OF FOUR CARDS (same floating blue panels as applicant.vue) -->
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
              class="w-full max-h-80 rounded-2xl overflow-hidden
                     bg-gray-100 dark:bg-gray-800
                     shadow-sm ring-1 ring-black/5 dark:ring-white/10"
            >
              <img
                :src="resolveImg(card.imageFile)"
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
