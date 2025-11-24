// nuxt.config.ts
import { fileURLToPath } from 'node:url'
import tsconfigPaths from 'vite-tsconfig-paths'
import { defineNuxtConfig } from 'nuxt/config'

export default defineNuxtConfig({
  compatibilityDate: '2024-06-04',
  devtools: { enabled: true },

  srcDir: 'project-root/',
  pages: true,

  css: ['~/assets/css/tailwind.css'],

  postcss: {
    plugins: {
      '@tailwindcss/postcss': {}
    }
  },

  modules: [
    '@pinia/nuxt',
    '@nuxtjs/i18n',
    '@nuxt/image'
  ],

  /** 🔹 nuxt-i18n configuration */
  i18n: {
    // folder INSIDE srcDir (project-root/)
    langDir: 'locales',
    lazy: true,

    locales: [
      {
        code: 'en',
        iso: 'en-US',
        name: 'English',
        file: 'en/index.ts'      // -> project-root/locales/en/index.ts
      },
      {
        code: 'hy',
        iso: 'hy-AM',
        name: 'Հայերեն',
        file: 'hy/index.ts'      // -> project-root/locales/hy/index.ts
      }
    ],

    defaultLocale: 'en',

    // 🔥 This is what should create /hy/... routes
    strategy: 'prefix_except_default',

    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_redirected',
      redirectOn: 'root',
      alwaysRedirect: false
    },

    // i18n.config.ts is under srcDir, so "~" works
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
