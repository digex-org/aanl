<!-- pages/about/history.vue -->
<script setup lang="ts">
import { useHead } from '#imports'
import HistoryOverviewArticle from '~/components/history/HistoryOverviewArticle.vue'
import type { Crumb } from '~/composables/useBreadcrumbs'

useHead({ title: 'History — AANL' })

const crumbs: Crumb[] = [
  { label: 'Home', to: '/' },
  { label: 'About', to: '/about' },
  { label: 'History' }
]
</script>

<template>
  <HistoryOverviewArticle
    :breadcrumbs="crumbs"
    hero-image-file="history-hero.webp"
    hero-title="History"
  />
</template>
