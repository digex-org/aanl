<!-- pages/about/history.vue -->
<script setup lang="ts">
import { useHead } from '#imports'
import MissionOverview from '~/components/mission/MissionOverview.vue'
import type { Crumb } from '~/composables/useBreadcrumbs'

useHead({ title: 'History — AANL' })

const crumbs: Crumb[] = [
  { label: 'Home', to: '/' },
  { label: 'About', to: '/about' },
  { label: 'Mission' }
]
</script>

<template>

  <MissionOverview
   :breadcrumbs="crumbs"
    hero-title="Mission"
    hero-image-file="mission-hero.webp"
 
  />
</template>