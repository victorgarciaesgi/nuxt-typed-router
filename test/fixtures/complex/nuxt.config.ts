import TestModuleRoute from './src/modules/testAddRoute';

export default defineNuxtConfig({
  modules: ['nuxt-typed-router', TestModuleRoute, '@nuxtjs/i18n'],

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

  srcDir: './src',

  vite: {
    resolve: {
      dedupe: ['vue-router'],
    },
  },

  compatibilityDate: '2025-01-07',
});