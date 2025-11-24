<!-- components/layout/Header.vue -->
<script setup lang="ts">
import { onMounted, onBeforeUnmount, ref, watch, computed } from 'vue'
import { useRoute, useI18n } from '#imports'
import NAV, { mobileNavLinks } from '~/data/navigation'
import GlobalSearchOverlay from '~/components/search/GlobalSearchOverlay.vue'
import LanguageSelect from '~/components/common/LanguageSelect.vue'

/** --- i18n helpers --- */
const { t } = useI18n()

const navText = (item: { label: string; labelKey?: string | undefined }) => {
  if (item.labelKey) {
    const translated = t(item.labelKey)
    // If translation exists and is different from the key, use it
    if (translated && translated !== item.labelKey) {
      return translated
    }
  }
  // Fallback to static label from navigation.ts
  return item.label
}

const groupTitle = (group: { title?: string | undefined; titleKey?: string | undefined }) => {
  if (group.titleKey) {
    const translated = t(group.titleKey)
    if (translated && translated !== group.titleKey) {
      return translated
    }
  }
  return group.title ?? ''
}

/** --- State --- */
const route = useRoute()
const openDesktopKey = ref<string | null>(null)      // which top-level item is open (desktop)
const openMobile = ref(false)                        // mobile drawer
const hoverTimer = ref<ReturnType<typeof setTimeout> | null>(null)
const headerRef = ref<HTMLElement | null>(null)

// Global search overlay
const isSearchOpen = ref(false)
const openSearch = () => { isSearchOpen.value = true }
const closeSearch = () => { isSearchOpen.value = false }

/** --- Helpers --- */
const isActive = (href?: string) =>
  href ? (route.path === href || route.path.startsWith(href + '/')) : false

const closeAll = () => {
  openDesktopKey.value = null
  openMobile.value = false
}

/** Close menus on route change */
watch(() => route.fullPath, () => closeAll())

/** Close on outside click (desktop mega) */
const onDocClick = (e: MouseEvent) => {
  const target = e.target as HTMLElement
  if (!target.closest('[data-nav-root]')) openDesktopKey.value = null
}
onMounted(() => document.addEventListener('click', onDocClick))
onBeforeUnmount(() => document.removeEventListener('click', onDocClick))

/** Esc closes menus + search */
const onKey = (e: KeyboardEvent) => {
  if (e.key === 'Escape') {
    closeAll()
    closeSearch()
  }
}
onMounted(() => window.addEventListener('keydown', onKey))
onBeforeUnmount(() => window.removeEventListener('keydown', onKey))

/** Desktop open/close (supports hover & click) */
const openByKey = (key: string) => {
  if (hoverTimer.value) clearTimeout(hoverTimer.value)
  openDesktopKey.value = key
}
const closeDelayed = () => {
  if (hoverTimer.value) clearTimeout(hoverTimer.value)
  hoverTimer.value = setTimeout(() => (openDesktopKey.value = null), 120)
}

/** Current mega item (for the full-width panel) */
const currentMega = computed(() =>
  NAV.find(i => i.label === openDesktopKey.value && !!i.mega)
)

/** Mobile accordion model built from NAV (sections mirror mega columns/groups) */
const mobileNav = computed(() =>
  NAV.map(item => {
    const sections =
      item.mega?.columns?.map(col => {
        const flatItems = [
          ...(col.items ?? []),
          ...((col.groups ?? []).flatMap(g => g.items ?? [])),
        ]
        return {
          title: col.title,
          titleKey: col.titleKey,
          items: flatItems
        }
      }) ?? []

    return {
      label: item.label,
      labelKey: item.labelKey,
      href: item.href,
      sections
    }
  })
)

// Optional flattened list, kept if you need it elsewhere
const mobileLinks = mobileNavLinks(NAV)
</script>


<template>
  <header
    ref="headerRef"
    class="relative bg-white border-b border-slate-200"
    data-nav-root
  >
    <div class="mx-auto px-2 md:px-4 xl:px-[40px]">
      <!-- Top bar -->
      <div class="h-[66px] flex items-center justify-between gap-6">
        <!-- Logo -->
        <NuxtLink to="/" aria-label="AANL — Home" class="shrink-0 inline-flex items-center">
          <NuxtImg
            src="/images/logos/main-logo.svg"
            alt="A. Alikhanyan National Laboratory"
            class="h-10 w-auto"
          />
        </NuxtLink>

        <!-- Desktop nav -->
        <nav class="hidden lg:flex items-center ml-[20px]" aria-label="Primary">
          <ul class="flex items-center gap-10">
            <li
              v-for="item in NAV"
              :key="item.label"
              class="relative"
              @mouseenter="item.mega && openByKey(item.label)"
              @mouseleave="item.mega && closeDelayed()"
            >
              <!-- Simple link -->
              <NuxtLink
                v-if="!item.mega"
                :to="item.href || '#'"
                class="group inline-flex items-center gap-1 font-semibold text-[16px] leading-6 text-[#1A2236] hover:text-[#1D50A2] transition"
              >
                <span :class="isActive(item.href) ? 'underline underline-offset-4 decoration-2' : ''">
                  {{ navText(item) }}
                </span>
              </NuxtLink>

              <!-- Mega trigger -->
              <button
                v-else
                type="button"
                class="group inline-flex items-center gap-1 font-semibold text-[16px] leading-6 text-[#1A2236] hover:text-[#1D50A2] transition"
                :aria-expanded="openDesktopKey === item.label"
                :aria-controls="`mega-${item.label}`"
                @click="openDesktopKey = openDesktopKey === item.label ? null : item.label"
                @keydown.enter.prevent="openDesktopKey = item.label"
                @keydown.space.prevent="openDesktopKey = item.label"
              >
                <span :class="isActive(item.href) ? 'underline underline-offset-4 decoration-2' : ''">
                  {{ navText(item) }}
                </span>
                <svg
                  class="h-4 w-4 transition-transform duration-200"
                  :class="{ 'rotate-180': openDesktopKey === item.label }"
                  viewBox="0 0 20 20" fill="none" aria-hidden="true"
                >
                  <path
                    d="M5 12l5-5 5 5"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </button>
            </li>
          </ul>
        </nav>

        <!-- Right actions (search + locale) -->
        <div class="hidden lg:flex items-center gap-4">
          <!-- Search button -->
          <button
            type="button"
            class="h-10 w-10 grid place-items-center cursor-pointer rounded-full
                   bg-[#1D50A2] text-white shadow-md
                   hover:bg-[#174088]
                   focus-visible:outline-none focus-visible:ring-2
                   focus-visible:ring-offset-2 focus-visible:ring-[#1D50A2]"
            aria-label="Open global search"
            @click="openSearch"
          >
            <IconsIconSearch class="h-4 w-4" />
          </button>

          <!-- Locale dropdown (desktop) -->
          <LanguageSelect />
        </div>

        <!-- Mobile burger -->
        <button
          type="button"
          class="lg:hidden h-10 w-10 grid place-items-center rounded-full border border-slate-200 text-[#1A2236] hover:bg-slate-50"
          aria-label="Open menu"
          @click="openMobile = !openMobile"
        >
          <svg class="h-5 w-5" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" fill="none">
            <path d="M4 6h16M4 12h16M4 18h16" stroke-linecap="round" />
          </svg>
        </button>
      </div>
    </div>

    <!-- ===== Full-width MEGA PANEL (desktop) ===== -->
    <transition name="fade">
      <div
        v-if="currentMega"
        :id="`mega-${currentMega.label}`"
        class="absolute left-0 right-0 z-40 border-t border-slate-200 bg-white shadow-[0_20px_40px_rgba(0,0,0,0.06)]"
        @mouseenter="openByKey(currentMega.label)"
        @mouseleave="closeDelayed()"
        role="region"
        :aria-label="`${navText(currentMega)} menu`"
      >
        <div class="container mx-auto px-4 md:px-8 xl:px-[141px] py-8">
          <div
            class="grid gap-8"
            :class="{
              'md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2': (currentMega.mega?.columns?.length || 0) === 2,
              'md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3': (currentMega.mega?.columns?.length || 0) === 3,
              'md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-4': (currentMega.mega?.columns?.length || 0) >= 4
            }"
          >
            <!-- Column(s) -->
            <div
              v-for="(col, idx) in (currentMega.mega?.columns || [])"
              :key="currentMega.label + ':' + idx"
              class="min-w-[220px]"
            >
              <p
                v-if="col.title || col.titleKey"
                class="px-2 pb-2 text-[13px] font-semibold text-slate-500 uppercase tracking-wide"
              >
                {{ groupTitle(col) }}
              </p>

              <!-- Plain items -->
              <div v-if="col.items?.length" class="flex flex-col">
                <NuxtLink
                  v-for="link in col.items"
                  :key="link.href"
                  :to="link.href"
                  class="px-2 py-2 rounded-lg text-[15px] text-slate-700 hover:bg-slate-50 hover:text-slate-900"
                  @click="openDesktopKey = null"
                >
                  {{ navText(link) }}
                </NuxtLink>
              </div>

              <!-- Grouped sections -->
              <div v-if="col.groups?.length" class="mt-3 space-y-3">
                <section
                  v-for="(g, gi) in col.groups"
                  :key="gi"
                  class="border-t border-slate-100 pt-3 first:border-0 first:pt-0"
                >
                  <p
                    v-if="g.title || g.titleKey"
                    class="px-2 pb-2 text-[12px] font-medium text-slate-500 uppercase tracking-wide"
                  >
                    {{ groupTitle(g) }}
                  </p>
                  <div class="flex flex-col">
                    <NuxtLink
                      v-for="link in (g.items || [])"
                      :key="link.href"
                      :to="link.href"
                      class="px-2 py-2 rounded-lg text-[15px] text-slate-700 hover:bg-slate-50 hover:text-slate-900"
                      @click="openDesktopKey = null"
                    >
                      {{ navText(link) }}
                    </NuxtLink>
                  </div>
                </section>
              </div>
            </div>
          </div>
        </div>
      </div>
    </transition>

    <!-- ===== Mobile drawer (accordion submenus) ===== -->
    <div v-show="openMobile" class="lg:hidden border-t border-slate-200 bg-white">
      <div class="container mx-auto px-4 py-4 space-y-2">
        <!-- Top-level items -->
        <template v-for="item in mobileNav" :key="item.label">
          <!-- Direct link row -->
          <NuxtLink
            v-if="!item.sections.length && item.href"
            :to="item.href"
            class="block rounded-md px-3 py-2 text-[16px] font-semibold text-[#1A2236] hover:bg-slate-50"
            @click="openMobile = false"
          >
            {{ navText(item) }}
          </NuxtLink>

          <!-- Accordion with sections -->
          <details v-else class="group rounded-md">
            <summary
              class="flex items-center justify-between cursor-pointer select-none rounded-md px-3 py-2 text-[16px] font-semibold text-[#1A2236] hover:bg-slate-50"
            >
              <span class="flex-1">{{ navText(item) }}</span>
              <svg
                class="ml-2 h-4 w-4 text-slate-500 transition-transform group-open:rotate-180"
                viewBox="0 0 20 20" fill="none" aria-hidden="true"
              >
                <path
                  d="M5 12l5-5 5 5"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </summary>

            <!-- Sections -->
            <div class="pl-3 pb-2">
              <div
                v-for="(sec, i) in item.sections"
                :key="item.label + ':' + (sec.title ?? 'sec') + ':' + i"
                class="mb-3 last:mb-0"
              >
                <p
                  v-if="sec.title || sec.titleKey"
                  class="px-2 pb-1 text-[12px] font-medium text-slate-500 uppercase tracking-wide"
                >
                  {{ groupTitle(sec) }}
                </p>
                <div class="flex flex-col">
                  <NuxtLink
                    v-for="link in sec.items"
                    :key="link.href"
                    :to="link.href"
                    class="px-2 py-2 rounded-md text-[15px] text-slate-700 hover:bg-slate-50"
                    @click="openMobile = false"
                  >
                    {{ navText(link) }}
                  </NuxtLink>
                </div>
              </div>
            </div>
          </details>
        </template>

        <!-- Drawer footer actions -->
        <div class="flex items-center justify-between pt-3">
          <!-- Mobile search button -->
          <button
            type="button"
            class="h-10 w-10 rounded-full border cursor-pointer border-white bg-[#1D50A2] p-2 text-white grid place-items-center shadow-sm
                   focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#1D50A2]"
            aria-label="Open global search"
            @click="() => { openSearch(); openMobile = false }"
          >
            <IconsIconSearch class="h-5 w-5" />
          </button>

          <!-- Locale dropdown (mobile) -->
          <LanguageSelect />
        </div>
      </div>
    </div>

    <!-- Global search overlay (teleported to <body>) -->
    <GlobalSearchOverlay :open="isSearchOpen" @close="closeSearch" />
  </header>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.15s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* Hide default summary marker (iOS/Safari compatibility) */
summary::-webkit-details-marker {
  display: none;
}
</style>
