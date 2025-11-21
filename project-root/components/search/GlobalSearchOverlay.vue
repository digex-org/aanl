<script setup lang="ts">
import { ref, watch, onMounted, onBeforeUnmount, nextTick, computed } from 'vue'
import { useRouter, useRoute } from '#imports'

const props = withDefaults(defineProps<{
  open: boolean
}>(), {
  open: false
})

const emit = defineEmits<{
  (e: 'close'): void
}>()

const router = useRouter()
const route = useRoute()

const query = ref<string>(String(route.query.q ?? ''))
const inputRef = ref<HTMLInputElement | null>(null)

// Focus input when overlay opens
watch(
  () => props.open,
  async (isOpen) => {
    if (isOpen) {
      await nextTick()
      inputRef.value?.focus()
    }
  },
  { immediate: true }
)

// Close on Esc
function onKeydown(e: KeyboardEvent) {
  if (e.key === 'Escape') {
    emit('close')
  }
}

onMounted(() => window.addEventListener('keydown', onKeydown))
onBeforeUnmount(() => window.removeEventListener('keydown', onKeydown))

async function submit() {
  const q = query.value.trim()
  if (!q) return

  await router.push({ path: '/search', query: { q } })
  emit('close')
}

// Little helper so we don't submit empty
const canSearch = computed(() => query.value.trim().length > 0)
</script>

<template>
  <Teleport to="body">
    <Transition
      enter-active-class="duration-150 ease-out"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="duration-150 ease-in"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        v-if="open"
        class="fixed inset-0 z-[80] bg-black/40 backdrop-blur-sm"
        @click.self="emit('close')"
      >
        <!-- Panel -->
        <div
          class="mx-auto mt-24 w-full max-w-2xl px-4 sm:px-6"
        >
          <div
            class="rounded-2xl bg-white dark:bg-gray-950
                   shadow-2xl ring-1 ring-black/10 dark:ring-white/10"
          >
            <form @submit.prevent="submit">
              <div class="flex items-center gap-3 px-4 sm:px-5 py-3.5">
                <!-- Search icon -->
                <div
                  class="flex h-9 w-9 items-center justify-center
                         rounded-full bg-[#1D50A2]/10 text-[#1D50A2]"
                >
                  <svg
                    class="h-4 w-4"
                    viewBox="0 0 20 20"
                    fill="none"
                    aria-hidden="true"
                  >
                    <path
                      d="M9 3.5a5.5 5.5 0 0 1 4.38 8.83l3.15 3.14a.75.75 0 1 1-1.06 1.06l-3.14-3.15A5.5 5.5 0 1 1 9 3.5Z"
                      stroke="currentColor"
                      stroke-width="1.6"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                </div>

                <!-- Input -->
                <input
                  ref="inputRef"
                  v-model="query"
                  type="search"
                  placeholder="Search news, events, divisions…"
                  class="flex-1 border-0 bg-transparent
                         text-sm sm:text-[15px] text-gray-900 dark:text-gray-100
                         placeholder:text-gray-400
                         focus:outline-none focus:ring-0"
                />

                <!-- Hint / close -->
                <button
                  type="button"
                  class="hidden sm:inline-flex items-center px-2 py-1
                         rounded-md border border-gray-300/80 dark:border-white/20
                         text-[11px] uppercase tracking-wide text-gray-500 dark:text-gray-300"
                  @click="emit('close')"
                >
                  Esc
                </button>
              </div>

              <div class="flex items-center justify-between border-t border-gray-100 dark:border-white/10 px-4 sm:px-5 py-3">
                <p class="text-[11px] text-gray-500 dark:text-gray-400">
                  Press <span class="font-semibold">Enter</span> to search · <span class="font-semibold">Esc</span> to close
                </p>
                <button
                  type="submit"
                  :disabled="!canSearch"
                  class="inline-flex items-center justify-center
                         px-4 h-8 rounded-full text-xs font-semibold
                         text-white bg-[#1D50A2]
                         disabled:opacity-60 disabled:cursor-not-allowed
                         hover:bg-[#174088] transition"
                >
                  Search
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>
