<script setup lang="ts">
import { computed } from 'vue'
import AppBreadcrumbs from '~/components/ui/AppBreadcrumbs.vue'
import type { Crumb } from '~/composables/useBreadcrumbs'

// Expanded type definition to support Headings and Lists seen in the image
type ContentBlock =
  | { type: 'text'; content: string }
  | { type: 'heading'; content: string }
  | { type: 'list'; items: string[] }
  | { type: 'image'; image: string; alt?: string }

const props = withDefaults(defineProps<{
  heroTitle?: string
  /** Hero background image, file name in ~/assets/images/mission/* */
  heroImageFile?: string
  breadcrumbs?: Crumb[]
}>(), {
  heroTitle: 'Mission',
  // Assumes you have a mission folder. Change if necessary.
  heroImageFile: 'mission-hero.webp', 
  breadcrumbs: () => []
})

// Content transcribed from the "Mission.jpg" image
const blocks: ContentBlock[] = [
  {
    type: 'text',
    content: `Science at the dawn of the 21st century has summarized the achievements of the past century, identified the regularities of the microworld and the universe, and deciphered the human genome. These challenges were accompanied by the rapid development of information technologies and the creation of the Internet.`
  },
  {
    type: 'text',
    content: `The modern age of science is characterized by the interplay of sciences: biophysics, chemical physics, geophysics, and astrophysics are developing at an unprecedented rate. The challenge of the 21st century is to create new knowledge and technologies for the sustainable development of human civilization. The A.I. Alikhanyan National Science Laboratory is developing its scientific scoping guidelines, contributing to the solution of the problems facing the country. Along with fundamental research, special attention is paid to applied research, creating an experimental base for solid-state physics, materials science, and biology.`
  },
  {
    type: 'heading',
    content: 'Mission'
  },
  {
    type: 'text',
    content: `The mission of the A.I. Alikhanyan National Science Laboratory is to conduct advanced research in the field of physics, astronomy, and related scientific disciplines, and apply scientific and technological solutions that will meet national needs, improve the security, health, and economic well-being of the citizens of the Republic of Armenia, and address modern challenges.`
  },
  {
    type: 'text',
    content: `The implementation of the AANL mission is based on fundamental and applied research in the areas of high-energy physics, particle and nuclear physics, astrophysics, cosmic ray physics, and the study of cosmic rays; the implementation of accelerator research; and the use and development of advanced computer approaches in the fields of artificial intelligence and machine learning.`
  },
  {
    type: 'heading',
    content: 'Opportunities'
  },
  {
    type: 'text',
    content: `Fundamental scientific research is of primary importance for applied research and is often a crucial prerequisite for achieving desired results. The potential of the National Laboratory is a unique opportunity to ensure the progress of strategic areas of the energy, national security, healthcare, environmental protection, and other sectors of the Republic of Armenia in the modern world.`
  },
  {
    type: 'heading',
    content: 'Vision'
  },
  {
    type: 'text',
    content: `The vision of the AANL is to become a regional center of excellence for advanced scientific research in high-energy physics and astrophysics, nuclear physics, and other related fields, and for the development of space and defense technologies.`
  },
  {
    type: 'heading',
    content: 'AANL strategic issues'
  },
  {
    type: 'list',
    items: [
      'Recruiting world-class physics community.',
      'Modifying rules for funding scientific groups and guidelines.',
      'Upgrading infrastructure, labs, and experimental facilities.',
      'International collaboration in large-scale experiments, technology, and data processing.',
      'Prospects for research infrastructure in the region and physics.'
    ]
  }
]

/* ---------- SSR-safe local images ---------- */
// Note: Ensure you create this folder or adjust the path to where your mission images are
const imageMods = import.meta.glob('~/assets/images/about/mission/*', {
  eager: true,
  import: 'default'
}) as Record<string, string>

const imageByFile = Object.fromEntries(
  Object.entries(imageMods).map(([p, u]) => [p.split('/').pop()!, u])
)

function imgSrc(file: string): string {
  return imageByFile[file] || file
}

const heroSrc = computed(() => imgSrc(props.heroImageFile))
</script>

<template>
  <section class="dark:bg-gray-950">
    <div class="mx-auto max-w-7xl px-4 pt-4 sm:px-6 lg:px-8">
      <AppBreadcrumbs
        v-if="breadcrumbs?.length"
        :items="breadcrumbs"
      />
    </div>

    <!-- Hero banner -->
    <div
      class="relative mt-4 isolate overflow-hidden rounded-xl bg-gray-900
            h-60 sm:h-[300px] lg:h-[385px]"
    >
      <!-- Background image -->
      <img
        :src="heroSrc"
        :alt="heroTitle"
        class="absolute inset-0 w-full h-full object-cover"
        loading="eager"
        decoding="async"
        fetchpriority="high"
      />

      <!-- Gradient overlay -->
      <div
        class="pointer-events-none absolute inset-0
              bg-[linear-gradient(180deg,rgba(0,0,0,0.55),rgba(0,0,0,0.35))]"
      />

      <!-- Title (left-middle) -->
      <div class="absolute inset-0">
        <div
          class="mx-auto flex h-full max-w-7xl items-center
                px-4 sm:px-6 lg:px-8"
        >
          <h1 class="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
            {{ heroTitle }}
          </h1>
        </div>
      </div>
    </div>


    <div class="relative">
      <article
        class="mx-auto max-w-3xl  lg:max-w-4xl -mt-10 sm:-mt-14 lg:-mt-16
               relative z-10
               rounded-3xl bg-white dark:bg-gray-900
               shadow-xl ring-1 ring-black/5 dark:ring-white/10
               px-4 sm:px-8 lg:px-10 py-6 sm:py-8 lg:py-1"
      >
        <div
          class="space-y-6 sm:space-y-7
                 text-sm sm:text-[15px] py-6 leading-relaxed
                 text-gray-700 dark:text-gray-200"
        >
          <template v-for="(block, index) in blocks" :key="index">
            
            <p v-if="block.type === 'text'">
              {{ block.content }}
            </p>

            <h2 
              v-else-if="block.type === 'heading'"
              class="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white pt-4 first:pt-0"
            >
              {{ block.content }}
            </h2>

            <ul 
              v-else-if="block.type === 'list'"
              class="list-none space-y-3 pl-2"
            >
              <li 
                v-for="(item, i) in block.items" 
                :key="i"
                class="relative pl-7 before:absolute before:left-0 before:top-2.5 before:h-1.5 before:w-1.5 before:rounded-full before:bg-blue-600 dark:before:bg-blue-400"
              >
                {{ item }}
              </li>
            </ul>

            <div
              v-else-if="block.type === 'image'"
              class="overflow-hidden rounded-2xl bg-gray-100 dark:bg-gray-800 my-6"
            >
              <img
                :src="imgSrc(block.image)"
                :alt="block.alt || 'Mission image'"
                class="w-full h-auto object-cover"
                loading="lazy"
                decoding="async"
              />
            </div>

          </template>
        </div>
      </article>
    </div>
  </section>
</template>