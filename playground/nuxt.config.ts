export default defineNuxtConfig({
  extends: ['nuxt-seo-kit'],
  /* @ts-ignore */
  modules: ['nuxt-typed-router', '@nuxtjs/i18n'],
  devtools: {
    enabled: true,
  },
  nuxtTypedRouter: {
    plugin: true,
    pathCheck: true,
    experimentalRemoveNuxtDefs: true,
    experimentalIgnoreRoutes: ['[...404].vue'],
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
