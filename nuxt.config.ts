import { defineNuxtConfig } from 'nuxt/config'
import { fileURLToPath } from 'node:url'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineNuxtConfig({
  compatibilityDate: '2024-06-04',
  devtools: { enabled: true },

  srcDir: 'project-root/',
  pages: true,

  // Tailwind entry file MUST exist at this path
  css: ['~/assets/css/tailwind.css'],

  // Tailwind v4 PostCSS plugin
  postcss: {
    plugins: {
      '@tailwindcss/postcss': {}
    }
  },

  modules: ['@pinia/nuxt', '@nuxtjs/i18n', '@nuxt/image'],

  i18n: {
    locales: ['en', 'hy'],
    defaultLocale: 'en',
    vueI18n: '~/i18n.config.ts'
  },

  typescript: { strict: true },

  nitro: {
    prerender: {
      crawlLinks: true,
      routes: ['/', '/about', '/news']
    }
  },

  vite: {
    plugins: [
      tsconfigPaths({
        projects: ['./tsconfig.json'],
        ignoreConfigErrors: true
      })
    ],
    resolve: {
      alias: {
        '~': fileURLToPath(new URL('./project-root', import.meta.url)),
        '@': fileURLToPath(new URL('./project-root', import.meta.url))
      }
    }
  }
})
