<script setup lang="ts">
import { computed, ref, onMounted, onBeforeUnmount } from 'vue'
import { useI18n, useSwitchLocalePath } from '#imports'

const { locale } = useI18n()
const switchLocalePath = useSwitchLocalePath()

const open = ref(false)
const toggle = () => (open.value = !open.value)
const close = () => (open.value = false)

const currentShort = computed(() => (locale.value === 'hy' ? 'HY' : 'EN'))

// close on outside click
const onClickOutside = (e: MouseEvent) => {
  const target = e.target as HTMLElement
  if (!target.closest('[data-lang-select-root]')) {
    close()
  }
}

onMounted(() => document.addEventListener('click', onClickOutside))
onBeforeUnmount(() => document.removeEventListener('click', onClickOutside))
</script>

<template>
  <div
    class="relative inline-flex text-sm"
    data-lang-select-root
  >
    <!-- Trigger -->
    <button
      type="button"
      class="inline-flex items-center gap-2 cursor-pointer rounded-full border border-slate-200 bg-white px-3 py-1.5
             shadow-sm hover:bg-slate-50
             focus-visible:outline-none focus-visible:ring-2
             focus-visible:ring-offset-2 focus-visible:ring-[#1D50A2]"
      :aria-expanded="open"
      aria-haspopup="listbox"
      @click.stop="toggle"
    >
      <!-- current flag -->
      <IconsIconFlagHy v-if="locale === 'hy'" />
      <IconsIconFlagEn v-else />

      <span class="font-semibold tracking-wide">
        {{ currentShort }}
      </span>

      <svg
        class="h-4 w-4 text-slate-500 transition-transform duration-150"
        :class="{ 'rotate-180': open }"
        viewBox="0 0 20 20"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M5 8l5 5 5-5"
          stroke="currentColor"
          stroke-width="1.8"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </button>

    <!-- Dropdown -->
    <transition name="fade">
      <div
        v-if="open"
        class="absolute right-0 top-full z-50 mt-1 w-44 rounded-lg border border-slate-200 bg-white
               shadow-lg ring-1 ring-black/5"
        role="listbox"
      >
        <!-- EN -->
        <NuxtLink
          :to="switchLocalePath('en')"
          class="flex items-center gap-2 px-3 py-2 text-[13px] cursor-pointer hover:bg-slate-50"
          :class="locale === 'en' ? 'bg-slate-50 font-semibold' : 'text-slate-700'"
          role="option"
          @click="close"
        >
          <IconsIconFlagEn
            :class="locale === 'en' ? 'opacity-100' : 'opacity-70'"
          />
          <span>English</span>
        </NuxtLink>

        <!-- HY -->
        <NuxtLink
          :to="switchLocalePath('hy')"
          class="flex items-center gap-2 px-3 py-2 text-[13px] cursor-pointer hover:bg-slate-50"
          :class="locale === 'hy' ? 'bg-slate-50 font-semibold' : 'text-slate-700'"
          role="option"
          @click="close"
        >
          <IconsIconFlagHy
            :class="locale === 'hy' ? 'opacity-100' : 'opacity-70'"
          />
          <span>Հայերեն</span>
        </NuxtLink>
      </div>
    </transition>
  </div>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.12s ease-out, transform 0.12s ease-out;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(-2px);
}
</style>
