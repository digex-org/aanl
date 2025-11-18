<script setup lang="ts">
import { ref, computed } from 'vue'
import { useHead } from '#imports'

import { getAllSeminars, type SeminarItem } from '~/data/seminars'
import SeminarsFilterBar from '~/components/seminars/SeminarsFilterBar.vue'
import SeminarCard from '~/components/seminars/SeminarCard.vue'

useHead({ title: 'Seminars — AANL' })

const allSeminars = computed<SeminarItem[]>(() => getAllSeminars())

const search = ref('')
const selectedType = ref('seminars')
const selectedTopic = ref<'all' | string>('all')

const typeOptions = [
  { value: 'seminars', label: 'Seminars' },
  { value: 'cosmology', label: 'Cosmology' },
] as const

const topicOptions = [
  { value: 'all', label: 'Any topics' },
  { value: 'particle-physics', label: 'Particle physics' },
  { value: 'cosmology', label: 'Cosmology' },
  // ...
] as const

const filtered = computed(() => {
  const q = search.value.trim().toLowerCase()

  return allSeminars.value.filter(item => {
    const matchesTopic =
      selectedTopic.value === 'all' || item.topic === selectedTopic.value

    const matchesSearch =
      !q ||
      item.title.toLowerCase().includes(q) ||
      item.excerpt.toLowerCase().includes(q)

    return matchesTopic && matchesSearch
  })
})

const totalCount = computed(() => filtered.value.length)

function onApply() {
  // filtering is reactive already – hook for analytics / scroll-to-top
}

function onOpenDate() {
  // hook for future date picker
}
</script>

<template>
  <div class="min-h-screen ">
    <main class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 sm:py-14 lg:py-16">
      <header class="mb-5">
        <h1 class="inline-block text-2xl sm:text-3xl font-bold tracking-tight text-gray-900 dark:text-white
                relative
                after:content-[''] after:block after:h-[3px] after:bg-gray-900 after:rounded-full after:mt-2">Seminars</h1>
      </header>

      <SeminarsFilterBar
        v-model:search="search"
        v-model:type="selectedType"
        v-model:topic="selectedTopic"
        :type-options="typeOptions"
        :topic-options="topicOptions"
        @apply="onApply"
        @open-date="onOpenDate"
      />

      <p class="mb-4 text-sm text-gray-600">
        Showing {{ totalCount }} results
      </p>

      <section
        class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
      >
        <SeminarCard
          v-for="s in filtered"
          :key="s.id"
          :item="s"
        />
      </section>
    </main>
  </div>
</template>
