<!-- pages/seminars/[slug].vue -->
<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useHead } from '#imports'

import SeminarOverview from '~/components/seminars/SeminarOverview.vue'
import { getSeminarBySlug, type SeminarItem } from '~/data/seminars'
import type { Crumb } from '~/composables/useBreadcrumbs'

const route = useRoute()
const slug = computed(() => String(route.params.slug || ''))

const seminar = computed<SeminarItem | undefined>(() =>
  getSeminarBySlug(slug.value)
)

/* ---------- Head / SEO ---------- */
useHead(() => ({
  title: seminar.value
    ? `${seminar.value.title} — Seminars — AANL`
    : 'Seminar — AANL'
}))

/* ---------- Breadcrumbs ---------- */
const crumbs = computed<Crumb[]>(() => [
  { label: 'Home', to: '/' },
  { label: 'Seminars', to: '/seminars' },
  seminar.value
    ? { label: seminar.value.title }
    : { label: 'Seminar' }
])
</script>

<template>
  <div v-if="seminar">
    <SeminarOverview
      :seminar="seminar"
      :breadcrumbs="crumbs"
      hero-title="Seminars"
    />
  </div>

  <!-- Fallback if slug not found -->
  <div v-else class="mx-auto max-w-3xl px-4 py-16 text-center">
    <h1 class="text-2xl font-semibold">Seminar not found</h1>
    <p class="mt-2 text-gray-600">
      Please check the URL or return to the
      <NuxtLink to="/seminars" class="text-[--brand-navy] hover:underline">
        Seminars
      </NuxtLink>
      page.
    </p>
  </div>
</template>
