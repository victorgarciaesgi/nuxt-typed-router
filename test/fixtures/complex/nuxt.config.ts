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
  compatibilityDate: '2025-01-07',
});
