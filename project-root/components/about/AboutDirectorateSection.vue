<!-- components/about/AboutDirectorateSection.vue -->
<script setup lang="ts">
import { computed } from 'vue'
import PersonCard from '~/components/people/PersonCard.vue'
import { DIRECTORATE, type DirectorateMember } from '~/data/directorate'

/**
 * Optional override – by default we use DIRECTORATE from data/directorate.ts
 */
const props = withDefaults(defineProps<{
  members?: DirectorateMember[]
  moreHref?: string
}>(), {
  members: () => [],
  moreHref: '/about/directorate'
})

/* ---------- Data source ---------- */
const people = computed<DirectorateMember[]>(() =>
  props.members?.length ? props.members : DIRECTORATE
)

/* ---------- SSR-safe employee photos ---------- */
const photoMods = import.meta.glob('~/assets/images/about/directorate/*', {
  eager: true,
  import: 'default'
}) as Record<string, string>

const photoByFile = Object.fromEntries(
  Object.entries(photoMods).map(([p, u]) => [p.split('/').pop()!, u])
)

function photoSrc(file: string): string {
  return photoByFile[file] || file
}
</script>

<template>
  <section
    class="grid grid-cols-1 lg:grid-cols-[minmax(0,3.2fr)_minmax(0,5.5fr)] gap-8 lg:gap-10 items-start"
    aria-labelledby="about-directorate-title"
  >
    <!-- LEFT: Text panel -->
    <aside
      class="rounded-3xl text-gray-900 px-6 py-7 sm:px-8 sm:py-9
             flex flex-col justify-between min-h-[260px]"
    >
      <div>
    <h1
      class="inline-block text-2xl sm:text-3xl font-extrabold tracking-tight
             text-gray-900 dark:text-white
             relative after:content-[''] after:block after:h-[3px]
             after:bg-gray-900 after:rounded-full after:mt-2"
    >
      Directorate
    </h1>
 

        <p
          class="mt-4 text-sm sm:text-[15px] leading-relaxed text-gray-900 max-w-md"
        >
          The Directorate of the Armenian National Laboratory (AANL) oversees
          the strategic planning, administration, and coordination of the
          laboratory’s operations.
          <br /><br />
          Comprising experienced leaders and scientists, the directorate
          ensures the effective implementation of research initiatives,
          supports international collaborations, and aligns the institution’s
          goals with Armenia’s national scientific priorities and global
          advancements.
        </p>
      </div>

      <!-- "More" button -->
      <div class="mt-6">
        <NuxtLink
          :to="moreHref"
          class="inline-flex items-center gap-2 mt-5 px-5 py-2 rounded-full border border-[#1D50A2] text-[#1D50A2] font-medium hover:bg-[#1D50A2]/10 transition"
        >
          <span>More</span>
          <svg
            viewBox="0 0 20 20"
            class="w-4 h-4"
            aria-hidden="true"
          >
            <path
              d="M4 10h10"
              stroke="currentColor"
              stroke-width="1.6"
              stroke-linecap="round"
            />
            <path
              d="M10 5l5 5-5 5"
              stroke="currentColor"
              stroke-width="1.6"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </NuxtLink>
      </div>
    </aside>

    <!-- RIGHT: Cards grid -->
    <div
      class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5 lg:gap-6"
    >
      <PersonCard
        v-for="person in people"
        :key="person.id"
        :name="person.name"
        :role="person.role"
        :credentials="person.credentials"
        :photo-src="photoSrc(person.photo)"
        :email="person.email"
        :linkedin="person.linkedin"
        :facebook="person.facebook"
      />
    </div>
  </section>
</template>
