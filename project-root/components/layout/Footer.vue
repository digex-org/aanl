<!-- components/layout/Footer.vue -->
<script setup lang="ts">
const contacts = [
  {
    icon: 'location',
    label: '2 Alikhanyan Brothers Street, Yerevan',
    href: 'https://maps.google.com/?q=2%20Alikhanyan%20Brothers%20Street,%20Yerevan',
    external: true
  },
  { icon: 'phone', label: '+(374)10 34 15 00', href: 'tel:+37410341500' },
  { icon: 'mail',  label: 'Info@Aanl.Am',     href: 'mailto:info@aanl.am' }
]

const partnerLogos = [
  { src: '/images/partners/escs.am-EN.png', alt: 'Ministry of Education, Science, Culture and Sport' },
  { src: '/images/partners/bok.am.png',     alt: 'Higher Education and Science Committee' },
  { src: '/images/partners/armresearchers.png', alt: 'Armenian Researchers' , size: 'w-[200px]' }
]

const socials = [
  { key: 'facebook',  href: 'https://facebook.com',  label: 'Facebook' },
  { key: 'instagram', href: 'https://instagram.com', label: 'Instagram' },
  { key: 'linkedin',  href: 'https://linkedin.com',  label: 'LinkedIn' },
  { key: 'youtube',   href: 'https://youtube.com',   label: 'YouTube' }
]

const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })
</script>

<template>
  <footer class="bg-white" role="contentinfo">
    <div class="mx-auto container  px-4 md:px-8 xl:px-[141px] py-8 md:py-10">

      <!-- ROW 1: Logo at left, Social icons at right (same line) -->
      <div class="mb-8 flex items-center justify-between">
        <NuxtLink to="/" aria-label="AANL — Home" class="shrink-0">
          <NuxtImg
            src="/images/logos/main-logo.svg"
            alt="A. Alikhanyan National Laboratory"
            class="h-14 w-auto"  
          />
        </NuxtLink>

        <div class="hidden lg:flex items-center h-[43px] gap-6 text-[#1A2236]">
          <a
            v-for="s in socials"
            :key="s.key"
            :href="s.href"
            target="_blank"
            rel="noopener"
            :size="43"
            :aria-label="s.label"
            class="inline-flex items-center justify-center rounded-md p-2 hover:text-[#1D50A2] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1D50A2] focus-visible:ring-offset-2"
          >
            <IconsIconFacebook v-if="s.key==='facebook'" :size="33" title="Facebook" />
            <IconsIconInstagram v-else-if="s.key==='instagram'" :size="33" title="Instagram" />
            <IconsIconLinkedIn v-else-if="s.key==='linkedin'" :size="32" title="LinkedIn" />
            <IconsIconYoutube v-else  :size="33" title="YouTube" />
          </a>
        </div>
      </div>

      <!-- ROW 2: Contacts | Partners | Download buttons -->
      <div class="grid gap-10 lg:grid-cols-12">
        <!-- Col 1: Contacts + dashed button -->
        <div class="lg:col-span-4 space-y-8">
          <ul class="space-y-5 text-[#1A2236]">
            <li v-for="c in contacts" :key="c.label" class="flex items-start gap-3">
              <span class="mt-[2px]" aria-hidden="true">
                <IconsIconLocation v-if="c.icon==='location'" :size="22" title="Location" />
                <IconsIconPhone    v-else-if="c.icon==='phone'"    :size="22" title="Phone" />
                <IconsIconMail     v-else                          :size="22" title="Email" />
              </span>
              <a
                :href="c.href"
                :target="c.external ? '_blank' : undefined"
                rel="noopener"
                class="text-[16px] leading-6 hover:text-[#1D50A2]"
              >
                {{ c.label }}
              </a>
            </li>
          </ul>

          <NuxtLink
            to="/documents"
            class="inline-flex items-center gap-2 rounded-[10px] border border-dashed border-[#1A2236] px-6 py-4 text-[#1A2236] hover:bg-slate-50"
          >
            <span class="font-medium">Sample document forms</span>
            <IconsIconDocuments :size="22" title="Documents" />
          </NuxtLink>
        </div>

        <!-- Col 2: Partners (line up with the middle of the row) -->
        <div class="lg:col-span-4 space-y-6">
          <img v-for="p in partnerLogos" :key="p.src" :src="p.src" :alt="p.alt " :class="p.size "
               class="h-auto object-contain" />
        </div>

        <!-- Col 3: Download buttons (right side) -->
        <div class="lg:col-span-4 space-y-4 ml-[24px]">
          <a
            href="/downloads/AANL_logo_am.zip"
            download
            class="flex w-full items-center justify-between rounded-[12px] bg-[#1D50A2] px-6 py-4 text-white shadow-sm hover:brightness-110"
          >
            <span class="font-medium">Download Armenian Logo</span>
            <svg class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
              <path d="M12 3v12M7 10l5 5 5-5"/><path d="M5 19h14"/>
            </svg>
          </a>

          <a
            href="/downloads/AANL_logo_en.zip"
            download
            class="flex w-full items-center justify-between rounded-[12px] bg-[#1D50A2] px-6 py-4 text-white shadow-sm hover:brightness-110"
          >
            <span class="font-medium">Download English Logo</span>
            <svg class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
              <path d="M12 3v12M7 10l5 5 5-5"/><path d="M5 19h14"/>
            </svg>
          </a>
        </div>
      </div>

      <!-- Divider -->
      <div class="mt-10 border-t border-[#EFF0FA]"></div>

      <!-- Copyright -->
      <p class="mx-auto mt-7 text-center text-[14px] leading-[14px] text-[#1A2236]">
        Copyright@2025 Alikhanyan national laboratory
      </p>
    </div>

    <!-- Back to top -->
    <button
      type="button"
      @click="scrollToTop"
      class="fixed bottom-6 right-6 z-40 grid h-[60px] w-[60px] place-items-center rounded-full border-2 border-white bg-[#1D50A2] text-white shadow-lg hover:brightness-110 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#1D50A2]"
      aria-label="Back to top"
    >
      <IconsIconBackToTop class="h-6 w-6 -translate-y-[1px]" :stroke-width="2" />
    </button>
  </footer>
</template>
