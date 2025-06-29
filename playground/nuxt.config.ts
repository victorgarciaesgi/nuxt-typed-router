import TestModuleRoute from './app/modules/test-module';

export default defineNuxtConfig({
  modules: ['nuxt-typed-router', '@nuxtjs/i18n', TestModuleRoute, '@nuxt/content'],
  future: {
    compatibilityVersion: 4,
  },
  devtools: {
    enabled: true,
  },
  nuxtTypedRouter: {
    plugin: true,
    pathCheck: true,
    disablePrettier: false,
    removeNuxtDefs: true,
    ignoreRoutes: ['[...404].vue'],
  },
  content: {
    documentDriven: false,
  },
  hooks: {
    'pages:extend': (pages) => {
      pages.push({
        name: 'foo',
        path: '/foo',
      });
    },
  },
  i18n: {
    defaultLocale: 'de',
    // dynamicRouteParams: true,
    locales: [
      {
        code: 'en',
        iso: 'en-US',
      },
      {
        code: 'de',
        iso: 'de-DE',
      },
      {
        code: 'zh',
        iso: 'zh-CN',
      },
    ],
  },
  compatibilityDate: '2025-01-07',
});
