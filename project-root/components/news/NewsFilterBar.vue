<!-- components/news/NewsFilterBar.vue -->
<script setup lang="ts">
import { computed } from 'vue'
import IconIvent from '../icons/IconIvent.vue';

const props = withDefaults(defineProps<{
  /** v-model:search */
  search: string
  /** v-model:type – currently only "News", kept for future */
  type: string
  /** v-model:category – "all" or one of categories[] */
  category: string
  /** List of category labels */
  categories: readonly string[]
}>(), {
  search: '',
  type: 'News',
  category: 'all',
  categories: () => []
})

const emit = defineEmits<{
  'update:search': [string]
  'update:type': [string]
  'update:category': [string]
  apply: []
  'open-date': []
}>()

/** Local computed wrappers for v-model bindings */
const searchModel = computed({
  get: () => props.search,
  set: (val: string) => emit('update:search', val)
})

const typeModel = computed({
  get: () => props.type,
  set: (val: string) => emit('update:type', val)
})

const categoryModel = computed({
  get: () => props.category,
  set: (val: string) => emit('update:category', val)
})
</script>

<template>
  <div class="space-y-4 mb-10">
    <!-- Top bar: search + type + date + apply -->
    <div
      class="rounded-xs  bg-white text-gray-900  ring-1 ring-black/5
             px-4 sm:px-6 py-3 sm:py-4 flex flex-col gap-3 sm:flex-row sm:items-center"
    >
      <!-- Search -->
      <div class="flex-1  flex items-center gap-3">
        <div
          class="inline-flex items-center gap-2 rounded-xs border border-gray-200
                 px-3 py-1.5 w-full sm:max-w-md"
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

        <!-- Type select (only "News" for now, but ready for more) -->
        <div class="hidden sm:flex items-center">
          <div
            class="inline-flex litems-center gap-56 rrounded-xs border border-gray-200
                   px-3 py-1.5 text-sm text-gray-700 cursor-default"
          >
            <span>{{ typeModel }}</span>
            <svg viewBox="0 0 20 20" class="size-4 text-gray-400" aria-hidden="true">
              <path d="M5 7l5 5 5-5" fill="none" stroke="currentColor" stroke-width="1.6"
                    stroke-linecap="round" stroke-linejoin="round" />
            </svg>
          </div>
        </div>
         <!-- Right side: date & apply -->
        <button
          type="button"
          class="inline-flex items-center justify-center size-9 rounded-full border border-gray-200
                 text-gray-500 hover:bg-gray-50"
          aria-label="Open date filter"
          @click="emit('open-date')"
        >
        <IconIvent
         class="cursor-pointer"
        />
        </button>
      </div>

     
      <div class="flex items-center justify-between sm:justify-end gap-3">


        <button
          type="button"
          class="inline-flex items-center justify-center rounded-full bg-[#1D50A2]
                 px-5 py-2 text-sm font-semibold text-white hover:bg-[#174088]"
          @click="emit('apply')"
        >
          Apply
        </button>
      </div>
    </div>

    <!-- Category chips -->
    <div class="flex flex-wrap items-center gap-2">
      <!-- "All" chip -->
      <button
        type="button"
        class="px-3 py-1.5 rounded-full cursor-pointer text-xs sm:text-sm border"
        :class="categoryModel === 'all'
          ? 'bg-[#1D50A2] text-white border-white'
          : 'border-white/20 text-gray-900 bg-transparent hover:bg-white/10'"
        @click="categoryModel = 'all'"
      >
        All
      </button>

      <!-- Category chips from prop -->
      <button
        v-for="cat in categories"
        :key="cat"
        type="button"
        class="px-3 py-1.5 cursor-pointer rounded-xs text-xs sm:text-sm border"
        :class="categoryModel === cat
          ? 'bg-[#1D50A2] text-white border-white'
          : 'border-white/20 text-gray-900 bg-[#EDF1F6] hover:bg-white/10'"
        @click="categoryModel = cat"
      >
        {{ cat }}
      </button>
    </div>
  </div>
</template>
