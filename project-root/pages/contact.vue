<!-- pages/contact.vue -->
<script setup lang="ts">
import { useHead } from '#imports'
import AppBreadcrumbs from '~/components/ui/AppBreadcrumbs.vue'
import ContactInformationSection from '~/components/sections/ContactInformationSection.vue'
import type { Crumb } from '~/composables/useBreadcrumbs'

useHead({
  title: 'Contact — AANL'
})

const crumbs: Crumb[] = [
  { label: 'Home', to: '/' },
  { label: 'Contact' }
]
</script>

<template>
  <div class="dark:bg-gray-950">
    <main class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-6 pb-16">
      <!-- Breadcrumbs -->
      <AppBreadcrumbs :items="crumbs" />

      <!-- Page title -->
      <section class="mt-8">


        <!-- Main contact section (form + map + info bar) -->
        <ContactInformationSection
          title="Contact Us"
          map-embed-url="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3039.969220009471!2d44.512!3d40.204!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sA.%20Alikhanyan%20National%20Science%20Laboratory!5e0!3m2!1sen!2s!4v0000000000000"
          address-title="Our Address"
          address="2 Alikhanyan Brothers Street,\n0036, Yerevan, Armenia"
          phone-title="Call Us"
          phone="+(374)10 34 15 00"
          email-title="Send Email"
          emailinf="info@aanl.am"
        />
      </section>
    </main>
  </div>
</template>
