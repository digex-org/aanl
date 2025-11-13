<!-- pages/index.vue -->
<script setup lang="ts">
useHead({
  title: 'AANL — Home',
  meta: [{ name: 'description', content: 'A. Alikhanyan National Science Laboratory' }]
})
</script>

<template>
  <!-- Hero / banner just for testing visual rhythm -->
  <SectionsHeroSection /> 
  <SectionsDivisionsSection class="mt-2" />
  <SectionsUpcomingEvents
      :events="myEventsFromApi"   
      all-href="/events"
   />
   <SectionsNewsSection class="mt-2" />
   <SectionsPartnersSection class="mt-2" />
   <SectionsHistoricalOverviewSection 
   
    :people="[
    { name:'Abraham Alikhanyan', image:'Abraham_alikhanyan.webp'},
    { name:'Artem Alikhanyan',   image:'Artem_Alikhanyan.webp' }
  ]"
  read-more-href="/about/history"
   class="mt-2" />
  <SectionsAboutNumbersSection :items="[
  { kind: 'stat',  value: 'Nº1',    label: 'Research institution in physics and\nnuclear sciences', col: 4 },
  { kind: 'media', image: 'campus.webp', alt: 'AANL main building',               col: 4 },
  { kind: 'stat',  value: '8',      label: 'Scientific Divisions',               col: 4 },
  { kind: 'stat',  value: '20+',    label: 'National & International\nCollaborations', col: 4 },
  { kind: 'media', image: 'lab.webp', alt: 'Team in the lab',                    col: 4 },
  { kind: 'stat',  value: '1,000+ annually', label: 'Students & Researchers Trained', col: 4 }
]" />
 <SectionsContactInformationSection class="mt-2" />


</template>
