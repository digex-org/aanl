<script setup lang="ts">
import hero from '~/assets/images/content/hero-atom.webp'
// Optional props if you want to reuse the component elsewhere.
const props = withDefaults(defineProps<{
  title?: string
  subtitle?: string
  ctaText?: string
  ctaTo?: string
  imageSrc?: string
  imageAlt?: string
}>(), {
  title: 'CHANGE THE WORLD WITH SCIENCE',
  subtitle: `This mission highlights science’s power to tackle global challenges — from climate action
and medical advances to exploring the universe.`,
  ctaText: 'Read',
  ctaTo: '/news', // change to wherever your “Read” should go
  imageSrc: hero,
  imageAlt: 'Glowing 3D atom illustration'
})
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
          <h1 id="hero-title"
              class="text-3xl/tight sm:text-4xl/tight lg:text-5xl/tight font-extrabold tracking-tight text-gray-900 dark:text-white">
            {{ title }}
          </h1>

          <p class="mt-4 max-w-prose text-gray-600 dark:text-gray-300">
            {{ subtitle }}
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
          <span>{{ ctaText }}</span>
          <!-- Arrow icon -->
          <svg
            class="size-4 shrink-0 transition-transform duration-200 ease-out group-hover:translate-x-1"
            viewBox="0 0 20 20" fill="none" aria-hidden="true"
          >
            <path d="M4 10h10" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
            <path d="M10 5l5 5-5 5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </NuxtLink>


            <!-- (Optional) Secondary link – remove if not needed -->
            <!--
            <NuxtLink to="/about"
              class="inline-flex items-center justify-center rounded-full px-5 py-2.5 text-sm font-semibold text-blue-700 ring-1 ring-inset ring-blue-200 hover:bg-blue-50 dark:text-blue-300 dark:ring-blue-900/40 dark:hover:bg-blue-900/20 transition">
              Learn more
            </NuxtLink>
            -->
          </div>
        </div>

        <!-- Right: Image -->
        <div class="lg:col-span-6 xl:col-span-7 order-first lg:order-none">
          <figure
            class="relative mx-auto max-w-[640px] lg:max-w-none motion-safe:animate-float"
          >
            <!-- decorative glow behind the image -->
            <div class="absolute inset-0 -z-10 rounded-[28px] bg-gradient-to-tr from-blue-500/20 via-indigo-400/10 to-purple-500/20 blur-2xl"></div>

            <img
              :src="imageSrc"
              :alt="imageAlt"
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
    0%,100% { transform: translateY(0) }
    50%     { transform: translateY(-6px) }
  }
}
</style>
