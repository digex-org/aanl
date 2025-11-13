<!-- project-root/layouts/default.vue -->
<script setup lang="ts">
import Header from '~/components/layout/Header.vue'
import Footer from '~/components/layout/Footer.vue'
</script>

<template>
  <div class="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
    <Header />
    <main class="flex-1 container mx-auto px-4 py-8">
      <slot />
    </main>
    <Footer />
  </div>
</template>
