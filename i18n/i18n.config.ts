// project-root/i18n.config.ts

export default defineI18nConfig(() => ({
  legacy: false,
  locale: 'en',
  fallbackLocale: 'en',
  globalInjection: true,
  missingWarn: import.meta.dev,
  fallbackWarn: import.meta.dev
}))
