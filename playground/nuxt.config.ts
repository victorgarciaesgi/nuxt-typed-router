import TestModuleRoute from './src/modules/test-module';

export default defineNuxtConfig({
  extends: ['nuxt-seo-kit'],
  modules: ['nuxt-typed-router', '@nuxtjs/i18n', TestModuleRoute, '@nuxt/content'],
  devtools: {
    enabled: true,
  },
  nuxtTypedRouter: {
    plugin: true,
    pathCheck: true,
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
  srcDir: './src',
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
});
