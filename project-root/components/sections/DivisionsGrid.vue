<script setup lang="ts">
import { divisions as source, type Division } from '~/data/divisions'

const props = withDefaults(defineProps<{
  title?: string
  items?: Division[]
}>(), { title: 'Divisions' })

const list = computed(() => props.items?.length ? props.items : source)
</script>

<template>
  <section class="dark:bg-gray-950" aria-labelledby="divisions-title">
    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 sm:py-14 lg:py-20">
      <div class="mb-6 sm:mb-8">
        <h2
          id="divisions-title"
          class="inline-block text-2xl sm:text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white
                 relative after:content-[''] after:block after:h-[3px] after:bg-gray-900 after:rounded-full after:mt-2"
        >
          {{ title }}
        </h2>
      </div>

      <div
        class="grid gap-4 sm:gap-5 lg:gap-6
               grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
      >
        <div v-for="d in list" :key="d.slug" class="h-full">
          <DivisionsDivisionCard :item="d" />
        </div>
      </div>
    </div>
  </section>
</template>
