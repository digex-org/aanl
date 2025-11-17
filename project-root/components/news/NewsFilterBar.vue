<!-- components/news/NewsFilterBar.vue -->
<script setup lang="ts">
import { computed, ref, onMounted, onBeforeUnmount } from 'vue'
import IconIvent from '../icons/IconIvent.vue'

type TypeOption = {
  value: string
  label: string
}

const props = withDefaults(defineProps<{
  /** v-model:search */
  search: string
  /** v-model:type – value from `types` list */
  type: string
  /** v-model:category – "all" or one of `categories` */
  category: string
  /** Category labels for chips */
  categories: readonly string[]
  /** Optional type options for the pill dropdown */
  types?: readonly TypeOption[]
}>(), {
  search: '',
  type: 'news',
  category: 'all',
  categories: () => [],
  types: () => [
    { value: 'news', label: 'News' }
  ]
})

const emit = defineEmits<{
  'update:search': [string]
  'update:type': [string]
  'update:category': [string]
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

const categoryModel = computed({
  get: () => props.category,
  set: (val: string) => emit('update:category', val)
})

/* ---------- Type dropdown ---------- */
const isTypeOpen = ref(false)
const typeButtonRef = ref<HTMLElement | null>(null)
const typeMenuRef = ref<HTMLElement | null>(null)

const currentTypeLabel = computed(() => {
  return props.types.find(t => t.value === typeModel.value)?.label ?? typeModel.value
})

function toggleTypeMenu() {
  isTypeOpen.value = !isTypeOpen.value
}

function selectType(value: string) {
  typeModel.value = value
  isTypeOpen.value = false
}

function onClickOutside(e: MouseEvent) {
  if (!isTypeOpen.value) return
  const target = e.target as Node
  if (
    typeButtonRef.value?.contains(target) ||
    typeMenuRef.value?.contains(target)
  ) {
    return
  }
  isTypeOpen.value = false
}

onMounted(() => {
  window.addEventListener('click', onClickOutside)
})
onBeforeUnmount(() => {
  window.removeEventListener('click', onClickOutside)
})
</script>

<template>
  <div class="space-y-4 mb-10">
    <!-- Top bar: search + type + date + apply -->
    <div
      class="rounded-xs bg-white text-gray-900 ring-1 ring-black/5
             px-4 sm:px-6 py-3 sm:py-4 flex flex-col gap-3 sm:flex-row sm:items-center"
    >
      <!-- Left side: search + type -->
      <div class="flex-1 flex flex-col sm:flex-row sm:items-center gap-3">
        <!-- Search -->
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

        <!-- Type select: News / All news / Division news etc. (desktop only) -->
        <div class="hidden sm:block flex-1 max-w-xs">
          <div class="relative w-full">
            <button
              ref="typeButtonRef"
              type="button"
              class="inline-flex w-full items-center justify-between rounded-xs border border-gray-200
                     px-3 py-1.5 text-sm text-gray-700 bg-white hover:bg-gray-50
                     focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1D50A2]/40"
              @click.stop="toggleTypeMenu"
            >
              <span class="truncate">{{ currentTypeLabel }}</span>
              <svg viewBox="0 0 20 20" class="size-4 text-gray-400 flex-shrink-0" aria-hidden="true">
                <path
                  d="M5 7l5 5 5-5"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="1.6"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </button>

            <!-- Dropdown menu -->
            <div
              v-if="isTypeOpen"
              ref="typeMenuRef"
              class="absolute z-20 mt-1 w-full rounded-md border border-gray-200 bg-white
                     shadow-lg py-1 text-sm text-gray-700"
            >
              <button
                v-for="opt in types"
                :key="opt.value"
                type="button"
                class="flex w-full items-center px-3 py-1.5 text-left hover:bg-gray-50"
                :class="opt.value === typeModel ? 'font-semibold text-[#1D50A2]' : ''"
                @click.stop="selectType(opt.value)"
              >
                {{ opt.label }}
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Right side: date + apply -->
      <div class="flex items-center justify-between sm:justify-end gap-3">
        <button
          type="button"
          class="inline-flex items-center justify-center size-9 rounded-full border border-gray-200
                 text-gray-500 hover:bg-gray-50"
          aria-label="Open date filter"
          @click="emit('open-date')"
        >
          <IconIvent class="cursor-pointer" />
        </button>

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
          ? 'bg-[#1D50A2] text-white border-[#1D50A2]'
          : 'border-transparent text-gray-900 bg-[#EDF1F6] hover:bg-[#e1e7f1]'"
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
          ? 'bg-[#1D50A2] text-white border-[#1D50A2]'
          : 'border-transparent text-gray-900 bg-[#EDF1F6] hover:bg-[#e1e7f1]'"
        @click="categoryModel = cat"
      >
        {{ cat }}
      </button>
    </div>
  </div>
</template>
