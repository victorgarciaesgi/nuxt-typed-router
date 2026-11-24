import TestModuleRoute from './app/modules/testAddRoute';

export default defineNuxtConfig({
  modules: ['nuxt-typed-router', TestModuleRoute, '@nuxtjs/i18n'],
  future: {
    compatibilityVersion: 4,
  },
  nuxtTypedRouter: {
    plugin: true,
    ignoreRoutes: ['[...404].vue'],
  },
  i18n: {
    locales: ['en', 'fr'],
    defaultLocale: 'en',
  },
  imports: {
    autoImport: false,
  },
  vite: {
    resolve: {
      dedupe: ['vue-router'],
    },
  },
  typescript: {
    // Type-check the `tests/**/*.spec-d.ts` assertions with `vue-tsc` (not included by default in Nuxt 4)
    tsConfig: { include: ['../tests/**/*'] },
  },
  compatibilityDate: '2025-01-07',
});
