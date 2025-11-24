<!-- pages/about/board-of-trustees.vue -->
<script setup lang="ts">
import { computed } from 'vue'
import { useHead } from '#imports'

import PersonCard from '~/components/people/PersonCard.vue'
import AppBreadcrumbs from '~/components/ui/AppBreadcrumbs.vue'
import type { Crumb } from '~/composables/useBreadcrumbs'

useHead({
  title: 'Board of trustees — AANL'
})

/* -------------------------------------------------------
 * Breadcrumbs (About > Board of trustees)
 * ----------------------------------------------------- */
const crumbs: Crumb[] = [
  { label: 'About', to: '/about' },
  { label: 'Board of trustees', to: null }
]

/* -------------------------------------------------------
 * Data – Board members
 * You can move this to data/board-of-trustees.ts later.
 * ----------------------------------------------------- */
type BoardPerson = {
  id: string
  name: string
  role?: string
  credentials?: string
  photo: string
  email?: string
  linkedin?: string
  facebook?: string
}

const BOARD_MEMBERS: BoardPerson[] = [
  {
    id: 'hrachya-marukyan',
    name: 'Hrachya Marukyan',
    role: 'Chairman of the board of trustees',
    credentials: 'Candidate of chemical sciences',
    photo: 'hrachya.webp',
    email: '',
    linkedin: '',
    facebook: ''
  },
  {
    id: 'ruben-mkrtchyan',
    name: 'Ruben Mkrtchyan',
    role: 'AANL leading scientist',
    credentials: 'Doctor of Sciences in Physics and Mathematics',
    photo: 'ruben.webp'
  },
  {
    id: 'khachatur-nerkararyan',
    name: 'Khachatur Nerkararyan',
    role: 'Director of A. I. Alikhanyan National Science Laboratory Institute of Physics',
    credentials: 'Doctor of Physical and Mathematical Sciences, professor',
    photo: 'khachatur.webp'
  },
  {
    id: 'rafael-barkudaryan',
    name: 'Rafael Barkudaryan',
    role: 'Responsible for scientific staff training programs',
    credentials: 'Candidate of Philological Sciences, associate professor',
    photo: 'rafayel.webp'
  },
  {
    id: 'aram-papoyan',
    name: 'Aram Papoyan',
    role: 'Director of the Institute of Physical Research',
    credentials: 'Doctor of Sciences in Physics and Mathematics, professor',
    photo: 'aram.webp'
  },
  {
    id: 'sargis-hayotsyan',
    name: 'Sargis Hayotsyan',
    role: 'A. I. Alikhanyan National Science Laboratory Vice Rector for Scientific Affairs',
    credentials: 'Candidate of Sciences in Physics and Mathematics',
    photo: 'sargis.webp'
  },
  {
    id: 'samvel-karabekyan',
    name: 'Samvel Karabekyan',
    role: 'A. I. Alikhanyan National Science Laboratory Vice Rector for Scientific Affairs',
    credentials: 'Candidate of Sciences in Physics and Mathematics',
    photo: 'samvel.webp'
  },
  {
    id: 'roza-avetisyan',
    name: 'Roza Avetisyan',
    role: 'Secretary of the board of trustees',
    credentials: '',
    photo: 'roza.webp'
  }
]

const members = computed(() => BOARD_MEMBERS)

/* -------------------------------------------------------
 * Local photo resolver for board images
 * (expects files in ~/assets/images/board/*)
 * ----------------------------------------------------- */
const boardImageMods = import.meta.glob('~/assets/images/partners/employees/*', {
  eager: true,
  import: 'default'
}) as Record<string, string>

const boardImageByFile = Object.fromEntries(
  Object.entries(boardImageMods).map(([p, u]) => [p.split('/').pop()!, u])
)

function boardPhotoSrc(file: string): string {
  return boardImageByFile[file] || file
}
</script>

<template>
  <div class="min-h-screen ">
    <main class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
      <!-- Breadcrumbs -->
      <div class="mb-4 sm:mb-6">
        <AppBreadcrumbs :items="crumbs" />
      </div>

      <!-- Page header: title + intro text (2 columns on desktop) -->
     <h1
      class="inline-block text-2xl sm:text-3xl font-extrabold tracking-tight
             text-gray-900 dark:text-white
             relative after:content-[''] after:block after:h-[3px]
             after:bg-gray-900 after:rounded-full after:mt-2"
    >
        Board of Trustees
    </h1>

      <header
        class="mb-8 sm:mb-10 lg:mb-12 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10"
      >
        <div class="lg:col-span-6">


          <p
            class="mt-4 text-sm sm:text-[15px] leading-relaxed text-gray-700 dark:text-gray-200"
          >
            The Board of Trustees plays a vital role in guiding and supporting the
            A. I. Alikhanyan National Science Laboratory (AANL). Their collective
            expertise drives the laboratory toward achieving its mission and
            long-term goals.
          </p>
        </div>

        <div class="lg:col-span-6">
          <p
            class="text-sm sm:text-[15px] leading-relaxed text-gray-700 dark:text-gray-200"
          >
            Composed of esteemed professionals and dedicated leaders, the Board
            oversees strategic initiatives, fosters innovation, and ensures the
            institution’s commitment to academic excellence and community
            development.
          </p>
        </div>
      </header>

      <!-- Cards grid -->
      <section aria-label="Board of trustees members">
        <div
          class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-7"
        >
          <PersonCard
            v-for="p in members"
            :key="p.id"
            :name="p.name"
            :role="p.role"
            :credentials="p.credentials"
            :photo-src="boardPhotoSrc(p.photo)"
            :email="p.email"
            :linkedin="p.linkedin"
            :facebook="p.facebook"
          />
        </div>
      </section>

        <!-- Documents button -->
        <div class="mt-10 sm:mt-12 flex justify-end">
        <NuxtLink
            to="/documents"
            class="inline-flex items-center justify-center px-8 h-11
                rounded-full border border-[#1D50A2]
                text-sm font-semibold text-[#1D50A2]
                hover:bg-[#1D50A2] hover:text-white
                shadow-sm transition-colors
                focus-visible:outline-none focus-visible:ring-2
                focus-visible:ring-offset-2 focus-visible:ring-[#1D50A2]"
        >
            Documents
        </NuxtLink>
        </div>

    </main>
  </div>
</template>
