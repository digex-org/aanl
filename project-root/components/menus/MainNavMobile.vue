<!-- components/navigation/MainNavMobile.vue -->
<script setup lang="ts">
import { NAV, type TopLevelNav } from '~/data/navigation'

const open = ref<string | null>(null)
const toggle = (label: string) => (open.value = open.value === label ? null : label)
</script>

<template>
  <div class="lg:hidden border-t border-slate-200 bg-white">
    <div class="mx-auto max-w-[1440px] px-4 py-4 space-y-2">
      <details
        v-for="item in NAV"
        :key="item.label"
        :open="open === item.label"
        @toggle="toggle(item.label)"
        class="group rounded-lg"
      >
        <summary class="flex items-center justify-between px-3 py-2 font-semibold text-[#1A2236] cursor-pointer">
          <NuxtLink
            v-if="!item.mega"
            :to="item.href || '#'"
            class="flex-1"
            @click.stop
          >
            {{ item.label }}
          </NuxtLink>
          <span v-else class="flex-1">{{ item.label }}</span>
          <svg class="ml-2 h-4 w-4 text-slate-500 group-open:rotate-180 transition-transform" viewBox="0 0 20 20" fill="none">
            <path d="M5 12l5-5 5 5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </summary>

        <div v-if="item.mega" class="pl-3 pb-3 space-y-3">
          <!-- Each column is just a stacked block on mobile -->
          <div v-for="(col, ci) in item.mega.columns" :key="ci" class="space-y-2">
            <p v-if="col.title" class="text-sm font-semibold text-slate-900">{{ col.title }}</p>

            <ul v-if="col.items?.length" class="space-y-2">
              <li v-for="link in col.items" :key="link.href">
                <NuxtLink :to="link.href" class="block rounded-md px-3 py-2 text-[15px] text-slate-700 hover:bg-slate-50">
                  {{ link.label }}
                </NuxtLink>
              </li>
            </ul>

            <div v-if="col.groups?.length" class="space-y-3">
              <div v-for="(g, gi) in col.groups" :key="gi" class="space-y-1">
                <p v-if="g.title" class="text-xs font-semibold text-slate-900">{{ g.title }}</p>
                <ul v-if="g.items?.length" class="space-y-2">
                  <li v-for="link in g.items" :key="link.href">
                    <NuxtLink :to="link.href" class="block rounded-md px-3 py-2 text-[15px] text-slate-700 hover:bg-slate-50">
                      {{ link.label }}
                    </NuxtLink>
                  </li>
                </ul>
                <div v-if="g.groups?.length" class="space-y-2">
                  <div v-for="(gg, ggi) in g.groups" :key="ggi" class="space-y-1">
                    <p v-if="gg.title" class="text-xs font-semibold text-slate-900">{{ gg.title }}</p>
                    <ul v-if="gg.items?.length" class="space-y-2">
                      <li v-for="link in gg.items" :key="link.href">
                        <NuxtLink :to="link.href" class="block rounded-md px-3 py-2 text-[15px] text-slate-700 hover:bg-slate-50">
                          {{ link.label }}
                        </NuxtLink>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </details>
    </div>
  </div>
</template>
