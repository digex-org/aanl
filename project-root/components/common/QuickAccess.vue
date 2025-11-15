<script setup lang="ts">
import { computed, reactive } from 'vue'


export type QuickAccessItem = {
  key: string                 // unique key for expansion state
  label: string               // row label
  to?: string                 // optional route
  href?: string               // optional external link
  // optional slot content (if you want to pass inner content via slots in the future)
}

const props = withDefaults(defineProps<{
  title?: string
  items: QuickAccessItem[]
  /** Makes the entire card sticky (use with top on container). */
  sticky?: boolean
  /** Top offset when sticky. */
  stickyTop?: string
  /** Header + accent color (defaults to --brand-navy). */
  brandColorClass?: string
}>(), {
  title: 'Quick access',
  sticky: false,
  stickyTop: 'top-4',
  brandColorClass: 'bg-[--brand-navy]'
})

/** expansion state keyed by item.key */
const open = reactive<Record<string, boolean>>({})
props.items.forEach(i => { if (!(i.key in open)) open[i.key] = false })

/** collapse all button (“×”) */
function collapseAll() {
  Object.keys(open).forEach(k => (open[k] = false))
}

const wrapperClass = computed(() => [
  'rounded-2xl shadow-sm ring-1',
  // subtle ring similar to the design
  'ring-white/10',
  props.sticky ? `sticky ${props.stickyTop}` : '',
])

/** resolve link attrs */
function linkAttrs(i: QuickAccessItem) {
  if (i.to) return { isNuxt: true, to: i.to }
  if (i.href) return { isExternal: true, href: i.href, target: '_blank', rel: 'noopener' }
  return {}
}
</script>

<template>
  <aside :class="wrapperClass">
    <!-- Header (blue bar, white text, rounded top) -->
    <div :class="[
          'flex items-center bg-[#1D50A2] justify-between rounded-t-2xl px-4 py-3',
          brandColorClass, 'text-white'
        ]">
      <h3 class="font-semibold">{{ title }}</h3>
      <button
        type="button"
        class="size-7 cursor-pointer grid place-items-center rounded-md/2 text-white/90 hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
        @click="collapseAll"
        aria-label="Collapse all"
        title="Collapse all"
      >
        ×
      </button>
    </div>

    <!-- Body (dark card like the mock) -->
    <div class="rounded-b-2xl border-1 border-[#1D50A2] text-black">
      <ul class="divide-y divide-white/10">
        <li v-for="i in items" :key="i.key">
          <button
            type="button"
            class="w-full cursor-pointer flex items-center justify-between px-4 py-3 text-left font-medium"
            @click="open[i.key] = !open[i.key]"
            :aria-expanded="open[i.key]"
          >
            <span>{{ i.label }}</span>
            <span
              class="ml-3 cursor-pointer inline-grid size-6 place-items-center rounded-md bg-white/5 ring-1 ring-white/10"
            >
              <span v-if="!open[i.key]">+</span>
              <span v-else>−</span>
            </span>
          </button>

          <div v-show="open[i.key]" class="px-4 pb-4">
            <!-- If a link is provided, show a “Open …” row -->
            <template v-if="i.to || i.href">
              <NuxtLink
                v-if="linkAttrs(i).isNuxt"
                :to="i.to!"
                class="inline-flex cursor-pointer items-center gap-2 text-black hover:underline  underline-offset-2"
              >
                Open {{ i.label }}
                <svg class="size-4" viewBox="0 0 20 20" fill="none">
                  <path d="M4 10h10" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
                  <path d="M10 5l5 5-5 5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </NuxtLink>

              <a
                v-else
                :href="i.href!"
                target="_blank"
                rel="noopener"
                class="inline-flex cursor-pointer items-center gap-2 text-black hover:underline  underline-offset-2"
              >
                Open {{ i.label }}
                <svg class="size-4" viewBox="0 0 20 20" fill="none">
                  <path d="M4 10h10" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
                  <path d="M10 5l5 5-5 5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </a>
            </template>

            <!-- Slot for custom content when expanded (optional future use) -->
            <slot :name="i.key" />
          </div>
        </li>
      </ul>
    </div>
  </aside>
</template>
