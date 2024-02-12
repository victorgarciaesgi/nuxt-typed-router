import { fileURLToPath } from 'url';

export default defineNuxtConfig({
  extends: ['nuxt-seo-kit'],
  modules: ['nuxt-typed-router', '@nuxtjs/i18n', '@nuxt/content'],
  devtools: {
    enabled: true,
  },
  nuxtTypedRouter: {
    plugin: true,
    pathCheck: true,
    removeNuxtDefs: true,
    ignoreRoutes: ['[...404].vue', 'ignoreFolder/**/*'],
  },
  content: {
    documentDriven: false,
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
  alias: {
    $$: fileURLToPath(new URL('../src', import.meta.url)),
  },
});
