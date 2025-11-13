// vitest.config.ts
/// <reference types="vitest" />

import { defineConfig } from 'vitest/config'
import tsconfigPaths from 'vite-tsconfig-paths'
import { fileURLToPath } from 'node:url'

export default defineConfig({
  // Let the plugin read tsconfig paths but ignore .nuxt errors
  plugins: [
    tsconfigPaths({
      projects: ['./tsconfig.json'],   // point to your root tsconfig
      ignoreConfigErrors: true         // <— prevents the .nuxt parsing crash
    })
  ],

  // Aliases must be set in Vite's resolve.alias, not test.alias
  resolve: {
    alias: {
      '~': fileURLToPath(new URL('./project-root', import.meta.url)),
      '@': fileURLToPath(new URL('./project-root', import.meta.url))
    }
  },

  test: {
    globals: true,
    environment: 'jsdom',
    // optional: narrow the test root to your srcDir
    dir: 'project-root',
    css: true
  }
})
