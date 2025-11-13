<!-- components/navigation/MegaMenuDesktop.vue -->
<script setup lang="ts">
import type { NavGroup } from '~/data/navigation'

defineProps<{
  columns: NavGroup[]
}>()
</script>

<template>
  <!-- Panel -->
  <div
    class="absolute left-0 right-0 mt-3 w-full border border-slate-200 bg-white shadow-lg"
    role="dialog"
  >
    <div class="mx-auto max-w-[1200px] px-6 py-6 grid gap-8 md:grid-cols-2">
      <!-- Each column -->
      <div v-for="(col, i) in columns" :key="i" class="space-y-5">
        <h4 v-if="col.title" class="text-[14px] font-semibold text-slate-900">
          <NuxtLink v-if="col.href" :to="col.href" class="hover:text-[#1D50A2]">{{ col.title }}</NuxtLink>
          <span v-else>{{ col.title }}</span>
        </h4>

        <!-- Column content can be flat items or grouped sections -->
        <ul v-if="col.items?.length" class="space-y-2">
          <li v-for="item in col.items" :key="item.href">
            <NuxtLink :to="item.href" class="block text-[14px] text-slate-700 hover:text-[#1D50A2]">
              {{ item.label }}
            </NuxtLink>
          </li>
        </ul>

        <div v-if="col.groups?.length" class="space-y-5">
          <div v-for="(g, gi) in col.groups" :key="gi" class="space-y-2">
            <h5 v-if="g.title" class="text-[12px] font-semibold text-slate-900">
              <NuxtLink v-if="g.href" :to="g.href" class="hover:text-[#1D50A2]">{{ g.title }}</NuxtLink>
              <span v-else>{{ g.title }}</span>
            </h5>
            <ul v-if="g.items?.length" class="space-y-2">
              <li v-for="item in g.items" :key="item.href">
                <NuxtLink :to="item.href" class="block text-[14px] text-slate-700 hover:text-[#1D50A2]">
                  {{ item.label }}
                </NuxtLink>
              </li>
            </ul>

            <!-- Support one more nesting level if needed -->
            <div v-if="g.groups?.length" class="space-y-3">
              <div v-for="(gg, ggi) in g.groups" :key="ggi" class="space-y-1">
                <h6 v-if="gg.title" class="text-[12px] font-semibold text-slate-900">
                  {{ gg.title }}
                </h6>
                <ul v-if="gg.items?.length" class="space-y-2">
                  <li v-for="item in gg.items" :key="item.href">
                    <NuxtLink :to="item.href" class="block text-[14px] text-slate-700 hover:text-[#1D50A2]">
                      {{ item.label }}
                    </NuxtLink>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>
