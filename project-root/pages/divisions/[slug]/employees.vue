<!-- pages/divisions/[slug]/employees.vue -->
<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useHead } from '#imports'

import { useBreadcrumbs } from '~/composables/useBreadcrumbs'
import { divisions, type Division } from '~/data/divisions'
import { getDivisionEmployees, type Employee } from '~/data/division-employees'
import AppBreadcrumbs from '~/components/ui/AppBreadcrumbs.vue'
import PersonCard from '~/components/people/PersonCard.vue'

/* ---------- Route / entity ---------- */
const route = useRoute()
const slug = computed(() => String(route.params.slug || ''))

const division = computed<Division | undefined>(() =>
  divisions.find(d => d.slug === slug.value)
)

/* ---------- Breadcrumbs (same as division page) ---------- */
const { crumbs, jsonLd } = useBreadcrumbs({
  segmentLabels: { divisions: 'Divisions' },
  currentLabel: division.value?.title ?? null
})

/* ---------- Head / SEO ---------- */
useHead(() => ({
  title: division.value
    ? `${division.value.title} — Employees — AANL`
    : 'Division — Employees — AANL',
  script: [{ type: 'application/ld+json', children: JSON.stringify(jsonLd.value) }]
}))

/* ---------- Banner asset (reuse division image) ---------- */
const bannerMods = import.meta.glob('~/assets/images/divisions/*', {
  eager: true,
  import: 'default'
}) as Record<string, string>

const bannerByFile = Object.fromEntries(
  Object.entries(bannerMods).map(([p, u]) => [p.split('/').pop()!, u])
)

const bannerSrc = computed(() =>
  division.value ? bannerByFile[division.value.image] || '' : ''
)

/* ---------- Employee photos from assets ---------- */
const employeeMods = import.meta.glob('~/assets/images/employees/*', {
  eager: true,
  import: 'default'
}) as Record<string, string>

const employeeByFile = Object.fromEntries(
  Object.entries(employeeMods).map(([p, u]) => [p.split('/').pop()!, u])
)

/** Resolve employee photo; falls back to raw value if not found (for external URLs). */
function employeePhotoSrc(file: string): string {
  return employeeByFile[file] || file
}

/* ---------- Data: employees for this division ---------- */
const employees = computed<Employee[]>(() =>
  division.value ? getDivisionEmployees(division.value.slug) : []
)

/* ---------- Quick Access (right side) ---------- */
const qaItems = computed(() => [
  { key: 'employees', label: 'Employees', to: `/divisions/${slug.value}/employees` },
  { key: 'news',      label: 'News',      to: `/divisions/${slug.value}/news` },
  { key: 'seminars',  label: 'Seminars',  to: `/divisions/${slug.value}/seminars` }
])
</script>

<template>
  <div v-if="division" class="dark:bg-gray-950">
    <!-- Banner -->
    <section class="relative isolate overflow-hidden">
      <img
        :src="bannerSrc"
        :alt="division.title"
        class="w-full h-[240px] sm:h-[300px] lg:h-[360px] object-cover"
      />
      <div class="absolute inset-0 bg-[linear-gradient(0deg,rgba(0,0,0,0.55),rgba(0,0,0,0.25))]"></div>

      <!-- Breadcrumb + Title -->
      <div class="absolute inset-0">
        <div class="mx-auto w-full text-white  max-w-7xl px-4 sm:px-6 lg:px-8 pt-5 sm:pt-6">
          <!-- Reused global breadcrumbs, styled for dark banner -->
        <AppBreadcrumbs
          :items="crumbs"
          variant="light-on-dark"
        />

          <div class="mt-28 sm:mt-24 h-full flex items-end pb-4 sm:pb-8">
            <h1 class="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              
              {{ division.title }} — Employees
            </h1>
          </div>
        </div>
      </div>
    </section>

    <!-- Content -->
     <section class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">
        <!-- Employees grid -->
        <div class="lg:col-span-8">
          <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            <PersonCard
              v-for="p in employees"
              :key="p.id"
              :name="p.name"
              :role="p.role"
              :credentials="p.credentials"
              :photo-src="employeePhotoSrc(p.photo)"
              :email="p.email"
              :linkedin="p.linkedin"
              :facebook="p.facebook"
            />
          </div>

          <!-- Empty state -->
          <div
            v-if="!employees.length"
            class="text-gray-600 dark:text-gray-300"
          >
            No employees have been published for this division yet.
          </div>
        </div>

        <!-- Quick Access -->
        <aside class="lg:col-span-4">
          <CommonQuickAccess
            :items="qaItems"
            title="Quick access"
            sticky
            sticky-top="top-4"
            brand-color-class="bg-[--brand-navy]"
          />
        </aside>
      </div>
    </section>

  </div>

  <!-- 404-ish -->
  <div v-else class="mx-auto max-w-3xl px-4 py-16 text-center">
    <h1 class="text-2xl font-semibold">Division not found</h1>
    <p class="mt-2 text-gray-600">
      Please check the URL or return to the
      <NuxtLink to="/divisions" class="text-[--brand-navy] hover:underline">
        Divisions
      </NuxtLink>
      page.
    </p>
  </div>
</template>
