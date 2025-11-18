<!-- components/seminars/SeminarsFilterBar.vue -->
<script setup lang="ts">
import { computed } from 'vue'
import IconIvent from '~/components/icons/IconIvent.vue'

type Option = {
  value: string
  label: string
}

const props = withDefaults(defineProps<{
  /** v-model:search */
  search: string
  /** v-model:type – from typeOptions */
  type: string
  /** v-model:topic – from topicOptions */
  topic: string
  /** Options for first select (Seminars / Conferences ...) */
  typeOptions: readonly Option[]
  /** Options for second select (topics) */
  topicOptions: readonly Option[]
}>(), {
  search: '',
  type: 'seminars',
  topic: 'all',
  typeOptions: () => [{ value: 'seminars', label: 'Seminars' }],
  topicOptions: () => [{ value: 'all', label: 'Any topics' }]
})

const emit = defineEmits<{
  'update:search': [string]
  'update:type': [string]
  'update:topic': [string]
  apply: []
  'open-date': []
}>()

/* ---------- v-model wrappers ---------- */
const searchModel = computed({
  get: () => props.search,
  set: (val: string) => emit('update:search', val)
})

const typeModel = computed({
  get: () => props.type,
  set: (val: string) => emit('update:type', val)
})

const topicModel = computed({
  get: () => props.topic,
  set: (val: string) => emit('update:topic', val)
})
</script>

<template>
  <div class="space-y-4 mb-10">
    <!-- Top bar -->
    <div
      class="rounded-xs bg-white text-gray-900 ring-1 ring-black/5
             px-4 sm:px-6 py-3 sm:py-4
             flex flex-col gap-3 sm:flex-row sm:items-center"
    >
      <!-- Left: search -->
      <div class="flex-1 flex flex-col sm:flex-row sm:items-center gap-3">
        <div class="flex-1">
          <div
            class="inline-flex items-center gap-2 rounded-xs border border-gray-200
                   px-3 py-1.5 w-full"
          >
            <svg viewBox="0 0 20 20" class="size-4 text-gray-400" aria-hidden="true">
              <circle cx="9" cy="9" r="6" stroke="currentColor" stroke-width="1.6" fill="none" />
              <path d="M13 13l3.5 3.5" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" />
            </svg>
            <input
              v-model="searchModel"
              type="search"
              placeholder="Search"
              class="w-full border-0 bg-transparent text-sm focus:outline-none focus:ring-0"
            />
          </div>
        </div>

        <!-- Center: 2 selects -->
        <div class="flex flex-col sm:flex-row gap-3 sm:ml-3 sm:min-w-[280px]">
          <!-- Type select -->
          <div class="flex-1 min-w-[140px]">
            <select
              v-model="typeModel"
              class="w-full rounded-xs border border-gray-200 bg-white
                     px-3 py-1.5 text-sm text-gray-700
                     focus-visible:outline-none focus-visible:ring-2
                     focus-visible:ring-[#1D50A2]/40"
            >
              <option
                v-for="opt in typeOptions"
                :key="opt.value"
                :value="opt.value"
              >
                {{ opt.label }}
              </option>
            </select>
          </div>

          <!-- Topic select -->
          <div class="flex-1 min-w-[140px]">
            <select
              v-model="topicModel"
              class="w-full rounded-xs border border-gray-200 bg-white
                     px-3 py-1.5 text-sm text-gray-700
                     focus-visible:outline-none focus-visible:ring-2
                     focus-visible:ring-[#1D50A2]/40"
            >
              <option
                v-for="opt in topicOptions"
                :key="opt.value"
                :value="opt.value"
              >
                {{ opt.label }}
              </option>
            </select>
          </div>
        </div>
      </div>

      <!-- Right: date + apply -->
      <div class="flex items-center justify-between sm:justify-end gap-3">
        <button
          type="button"
          class="inline-flex items-center justify-center size-9 rounded-full border border-gray-200
                 text-gray-500 hover:bg-gray-50"
          aria-label="Open date filter"
          @click="$emit('open-date')"
        >
          <IconIvent class="cursor-pointer" />
        </button>

        <button
          type="button"
          class="inline-flex items-center justify-center rounded-full bg-[#1D50A2]
                 px-5 py-2 text-sm font-semibold text-white hover:bg-[#174088]
                 focus-visible:outline-none focus-visible:ring-2
                 focus-visible:ring-offset-2 focus-visible:ring-[#1D50A2]"
          @click="$emit('apply')"
        >
          Apply
        </button>
      </div>
    </div>
  </div>
</template>
