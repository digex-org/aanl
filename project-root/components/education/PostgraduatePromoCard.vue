<script setup lang="ts">
import { createImageResolver } from '~/utils/images'

const props = defineProps<{
  title: string
  description: string
  to: string
  /** File name in ~/assets/images/education/postgraduate/* */
  imageFile: string
  buttonLabel?: string
}>()

const imageMods = import.meta.glob(
  '~/assets/images/education/*',
  {
    eager: true,
    import: 'default'
  }
) as Record<string, string>

const resolveImage = createImageResolver(imageMods)

const imgSrc = computed(() => resolveImage(props.imageFile))
const btnLabel = computed(() => props.buttonLabel || 'View More')
</script>

<template>
  <NuxtLink
    :to="to"
    class="group flex flex-col overflow-hidden rounded-3xl bg-white
           dark:bg-gray-900 shadow-md ring-1 ring-black/5 dark:ring-white/10
           transition-transform hover:-translate-y-1 hover:shadow-lg"
  >
    <!-- Image -->
    <div class="aspect-[4/3] overflow-hidden bg-gray-100 dark:bg-gray-800">
      <img
        :src="imgSrc"
        :alt="title"
        class="h-full w-full object-cover transition-transform duration-300
               group-hover:scale-[1.03]"
        loading="lazy"
        decoding="async"
      />
    </div>

    <!-- Body -->
    <div class="flex flex-1 flex-col px-4 pb-4 pt-4 sm:px-5 sm:pb-5">
      <h3 class="text-sm sm:text-base font-semibold text-gray-900 dark:text-white">
        {{ title }}
      </h3>

      <p
        class="mt-2 flex-1 text-xs sm:text-[13px] leading-relaxed
               text-gray-700 dark:text-gray-300"
      >
        {{ description }}
      </p>

      <!-- CTA -->
      <div class="mt-4">
        <span
          class="inline-flex items-center justify-center rounded-full
                 bg-[#1D50A2] px-4 py-1.5 text-xs sm:text-sm font-semibold
                 text-white shadow-sm
                 group-hover:bg-[#174088] transition-colors"
        >
          {{ btnLabel }}
        </span>
      </div>
    </div>
  </NuxtLink>
</template>
