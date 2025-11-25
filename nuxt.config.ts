// nuxt.config.ts
import { fileURLToPath } from 'node:url'
import tsconfigPaths from 'vite-tsconfig-paths'
import { defineNuxtConfig } from 'nuxt/config'

export default defineNuxtConfig({
  compatibilityDate: '2024-06-04',
    devtools: {
    enabled: process.env.NODE_ENV === 'development'
  },

  // Your app lives in project-root/
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

    // ✅ Configure i18n via module options (no top-level `i18n` key → no TS error)
    [
      '@nuxtjs/i18n',
      {
        // ---- routing / basic options ----
        defaultLocale: 'en',
        strategy: 'prefix_except_default', // /, /hy/...
        lazy: true,
        // Base dir for locale files (relative to project root, where nuxt.config.ts is)
        langDir: 'locales',

        // ---- locales & files ----
        // Make sure these files actually exist in AANL-PORTAL/i18n/locales/...
         locales: [
      {
        code: 'en',
        iso: 'en-US',
        name: 'English',
        files: [
          'en/common.json',
          'en/divisions.json',
          'en/home.json',
          'en/nav.json',
          'en/events.json',
          'en/news.json',
          'en/division-detail.json',
          'en/quickAccess.json'
          // add more if you create them, e.g. 'en/home.json'
        ]
      },
      {
        code: 'hy',
        iso: 'hy-AM',
        name: 'Հայերեն',
        files: [
          'hy/common.json',
          'hy/divisions.json',
          'hy/home.json',
          'hy/nav.json',
          'hy/events.json',
          'hy/news.json',
          'hy/division-detail.json',
          'hy/quickAccess.json'
          // add more if you create them, e.g. 'hy/home.json'
        ]
      }
    ],
        // ---- browser language / cookie behaviour ----
        detectBrowserLanguage: {
          useCookie: true,
          cookieKey: 'i18n_redirected',
          redirectOn: 'root',   // only when user first hits "/"
          alwaysRedirect: false // don't override manual language choice
        }
      }
    ],

    '@nuxt/image'
  ],

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
