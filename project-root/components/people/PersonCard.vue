<!-- components/people/PersonCard.vue -->
<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(defineProps<{
  name: string

  // allow string | undefined (and null if you want)
  role?: string | null | undefined
  credentials?: string | null | undefined

  photoSrc: string

  email?: string | null | undefined
  linkedin?: string | null | undefined
  facebook?: string | null | undefined

  variant?: 'default' | 'compact'
}>(), {
  variant: 'default'
})

const isCompact = computed(() => props.variant === 'compact')
</script>

<template>
  <article
    class="rounded-xl bg-white dark:bg-gray-900 ring-1 ring-black/5 dark:ring-white/10 shadow-sm overflow-hidden"
  >
    <!-- Photo -->
    <div :class="['overflow-hidden', isCompact ? 'aspect-square' : 'aspect-[4/3]']">
      <img
        :src="photoSrc"
        :alt="name"
        class="w-full h-full object-cover"
        loading="lazy"
        decoding="async"
      />
    </div>

    <!-- Text -->
    <div :class="['p-4', isCompact ? 'space-y-1.5' : 'space-y-2']">
      <h3
        :class="[
          'font-semibold leading-snug',
          isCompact ? 'text-[14px]' : 'text-[15px]',
          'text-gray-900 dark:text-white'
        ]"
      >
        {{ name }}
      </h3>

      <p
        v-if="role"
        :class="[
          'text-[#1D50A2] dark:text-gray-300 leading-snug',
          isCompact ? 'text-[12px]' : 'text-[13px]'
        ]"
      >
        {{ role }}
      </p>

      <p
        v-if="credentials"
        :class="[
          'text-gray-600 dark:text-gray-400 leading-snug',
          isCompact ? 'text-[12px]' : 'text-[13px]'
        ]"
      >
        {{ credentials }}
      </p>

      <!-- Socials / contact -->
      <div class="mt-3 flex items-center gap-3">
        <!-- Email -->
        <a
          v-if="email"
          :href="`mailto:${email}`"
          class="inline-flex"
          :aria-label="`Email ${name}`"
        >
          <svg viewBox="0 0 24 24" class="size-4 text-[#1D50A2] dark:text-gray-300">
            <path
              fill="currentColor"
              d="M4 4h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2zm0 2v.01L12 12l8-5.99V6H4zm0 3.24V18h16V9.24l-7.35 5.5a1.5 1.5 0 0 1-1.7 0L4 9.24z"
            />
          </svg>
        </a>

        <!-- LinkedIn -->
        <a
          v-if="linkedin"
          :href="linkedin"
          target="_blank"
          rel="noopener"
          class="inline-flex"
          aria-label="LinkedIn"
        >
          <svg viewBox="0 0 24 24" class="size-6 text-[#1D50A2] dark:text-gray-300">
            <path
              fill="currentColor"
              d="M6.94 6.5A1.44 1.44 0 1 1 5.5 5.06 1.44 1.44 0 0 1 6.94 6.5zM6 8.5h2v9H6zM10 8.5h2v1.3h.03a2.2 2.2 0 0 1 1.97-1.08c2.11 0 2.5 1.39 2.5 3.2V17.5h-2v-4.12c0-.98-.02-2.24-1.37-2.24-1.37 0-1.58 1.07-1.58 2.17v4.19h-2z"
            />
          </svg>
        </a>

        <!-- Facebook -->
        <a
          v-if="facebook"
          :href="facebook"
          target="_blank"
          rel="noopener"
          class="inline-flex"
          aria-label="Facebook"
        >
          <svg viewBox="0 0 24 24" class="size-5 text-[#1D50A2] dark:text-gray-300">
            <path
              fill="currentColor"
              d="M13 22v-8h3l.5-3H13V9.5c0-.9.3-1.5 1.8-1.5H17V5.1c-.9-.1-1.8-.1-2.7-.1C11.7 5 10 6.4 10 9v2H7v3h3v8z"
            />
          </svg>
        </a>
      </div>
    </div>
  </article>
</template>
