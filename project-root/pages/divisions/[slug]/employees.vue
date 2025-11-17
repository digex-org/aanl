<!-- pages/divisions/[slug]/employees.vue -->
<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useHead } from '#imports'

import { useBreadcrumbs } from '~/composables/useBreadcrumbs'
import { divisions, type Division } from '~/data/divisions'
import { getDivisionEmployees, type Employee } from '~/data/division-employees'
import AppBreadcrumbs from '~/components/ui/AppBreadcrumbs.vue'

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
            <article
              v-for="p in employees"
              :key="p.id"
              class="rounded-xl bg-white dark:bg-gray-900 ring-1 ring-black/5 dark:ring-white/10 shadow-sm overflow-hidden"
            >
              <div class="aspect-[4/3] overflow-hidden">
                <img
                  :src="employeePhotoSrc(p.photo)"
                  :alt="p.name"
                  class="w-full h-full object-cover"
                  loading="lazy"
                  decoding="async"
                />
              </div>

              <div class="p-4">
                <h3 class="text-[15px] font-semibold text-[gray-900] dark:text-white leading-snug">
                  {{ p.name }}
                </h3>

                <p
                  v-if="p.role"
                  class="mt-1 text-[13px] text-[#1D50A2] dark:text-gray-300 leading-snug"
                >
                  {{ p.role }}
                </p>

                <p
                  v-if="p.credentials"
                  class="mt-2 text-[13px] text-gray-600 dark:text-gray-400 leading-snug"
                >
                  {{ p.credentials }}
                </p>

                <!-- Socials -->
                <div class="mt-3 flex items-center gap-3">
                  <!-- Email -->
                  <a
                    v-if="p.email"
                    :href="`mailto:${p.email}`"
                    class="inline-flex"
                    :aria-label="`Email ${p.name}`"
                  >
                    <svg viewBox="0 0 24 24" class="size-4 text-[#1D50A2] dark:text-gray-300">
                      <path
                        fill="currentColor"
                        d="M4 4h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2zm0 2v.01L12 12l8-5.99V6H4zm0 3.24V18h16V9.24l-7.35 5.5a1.5 1.5 0 0 1-1.7 0L4 9.24z"
                      />
                    </svg>
                  </a>

                  <!-- LinkedIn -->
                  <a
                    v-if="p.linkedin"
                    :href="p.linkedin"
                    target="_blank"
                    rel="noopener"
                    class="inline-flex"
                    aria-label="LinkedIn"
                  >
                    <svg viewBox="0 0 24 24" class="size-6 text-[#1D50A2] dark:text-gray-300">
                      <path
                        fill="currentColor"
                        d="M6.94 6.5A1.44 1.44 0 1 1 5.5 5.06 1.44 1.44 0 0 1 6.94 6.5zM6 8.5h2v9H6zM10 8.5h2v1.3h.03a2.2 2.2 0 0 1 1.97-1.08c2.11 0 2.5 1.39 2.5 3.2V17.5h-2v-4.12c0-.98-.02-2.24-1.37-2.24-1.37 0-1.58 1.07-1.58 2.17v4.19h-2z"
                      />
                    </svg>
                  </a>

                  <!-- Facebook -->
                  <a
                    v-if="p.facebook"
                    :href="p.facebook"
                    target="_blank"
                    rel="noopener"
                    class="inline-flex"
                    aria-label="Facebook"
                  >
                    <svg viewBox="0 0 24 24" class="size-5 text-[#1D50A2] dark:text-gray-300">
                      <path
                        fill="currentColor"
                        d="M13 22v-8h3l.5-3H13V9.5c0-.9.3-1.5 1.8-1.5H17V5.1c-.9-.1-1.8-.1-2.7-.1C11.7 5 10 6.4 10 9v2H7v3h3v8z"
                      />
                    </svg>
                  </a>
                </div>
              </div>
            </article>
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
