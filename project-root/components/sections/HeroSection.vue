<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from '#imports'
import hero from '~/assets/images/content/hero-atom.webp'

const { t } = useI18n()

// Props are only for overrides; i18n is the default source of text.
const props = withDefaults(defineProps<{
  title?: string
  subtitle?: string
  ctaText?: string
  ctaTo?: string
  imageSrc?: string
  imageAlt?: string
}>(), {
  ctaTo: '/news',           // stays the same
  imageSrc: hero
})

// Localised fallbacks
const titleText = computed(() => props.title ?? t('home.hero.title'))
const subtitleText = computed(() => props.subtitle ?? t('home.hero.subtitle'))
const ctaLabel = computed(() => props.ctaText ?? t('home.hero.cta'))
const imageAltText = computed(() => props.imageAlt ?? t('home.hero.imageAlt'))
</script>

<template>
  <!-- Section wrapper -->
  <section
    class="relative overflow-hidden dark:bg-gray-950"
    aria-labelledby="hero-title"
  >
    <!-- subtle radial glow background -->
    <div
      class="pointer-events-none absolute inset-0 -z-10 opacity-40 [mask-image:radial-gradient(ellipse_at_center,black,transparent_70%)]"
      aria-hidden="true"
    >
      <div class="absolute -top-24 -left-24 size-[420px] rounded-full bg-[radial-gradient(circle_at_center,#60a5fa_0%,transparent_60%)] blur-2xl"></div>
      <div class="absolute -bottom-32 -right-32 size-[420px] rounded-full bg-[radial-gradient(circle_at_center,#a78bfa_0%,transparent_60%)] blur-2xl"></div>
    </div>

    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 sm:py-14 lg:py-20">
      <div class="grid items-center gap-10 lg:grid-cols-12">
        <!-- Left: Text -->
        <div class="lg:col-span-6 xl:col-span-5">
          <h1
            id="hero-title"
            class="text-3xl/tight sm:text-4xl/tight lg:text-5xl/tight font-extrabold tracking-tight text-gray-900 dark:text-white"
          >
            {{ titleText }}
          </h1>

          <p class="mt-4 max-w-prose text-gray-600 dark:text-gray-300">
            {{ subtitleText }}
          </p>

          <div class="mt-6 flex items-center gap-3">
            <NuxtLink
              :to="ctaTo"
              class="group inline-flex items-center justify-center
                     w-full sm:w-[430.41px] h-[50px] gap-4
                     rounded-[130px] px-8 py-3 text-sm font-semibold
                     text-white bg-[#1D50A2] hover:bg-[#17408B]
                     focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1D50A2] focus-visible:ring-offset-2 dark:focus-visible:ring-offset-gray-950
                     transition will-change-transform"
              style="transform: rotate(0deg);"
            >
              <span>{{ ctaLabel }}</span>
              <!-- Arrow icon -->
              <svg
                width="26"
                height="15"
                viewBox="0 0 26 15"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                class="shrink-0"
              >
                <path
                  d="M25.7071 8.07106C26.0976 7.68054 26.0976 7.04737 25.7071 6.65685L19.3431 0.292885C18.9526 -0.0976396 18.3195 -0.0976396 17.9289 0.292885C17.5384 0.683409 17.5384 1.31657 17.9289 1.7071L23.5858 7.36395L17.9289 13.0208C17.5384 13.4113 17.5384 14.0445 17.9289 14.435C18.3195 14.8255 18.9526 14.8255 19.3431 14.435L25.7071 8.07106ZM0 8.36395L25 8.36395V6.36395L0 6.36395L0 8.36395Z"
                  fill="white"
                />
              </svg>
            </NuxtLink>
          </div>
        </div>

        <!-- Right: Image -->
        <div class="lg:col-span-6 xl:col-span-7 order-first lg:order-none">
          <figure class="relative mx-auto max-w-[640px] lg:max-w-none motion-safe:animate-float">
            <div class="absolute inset-0 -z-10 rounded-[28px] bg-gradient-to-tr from-blue-500/20 via-indigo-400/10 to-purple-500/20 blur-2xl"></div>

            <img
              :src="imageSrc"
              :alt="imageAltText"
              class="block w-full h-auto rounded-[28px] shadow-2xl ring-1 ring-black/5 dark:ring-white/10"
              loading="eager"
              decoding="async"
              fetchpriority="high"
            />
          </figure>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
@media (prefers-reduced-motion: no-preference) {
  .motion-safe\:animate-float { animation: float 10s ease-in-out infinite; }
  @keyframes float {
    0%, 100% { transform: translateY(0) }
    50%      { transform: translateY(-6px) }
  }
}
</style>
