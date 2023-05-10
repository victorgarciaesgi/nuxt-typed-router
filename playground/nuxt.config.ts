import { createResolver, defineNuxtModule, extendPages } from '@nuxt/kit';
import NuxtTypedRouter from '..';

export default defineNuxtConfig({
  extends: ['nuxt-seo-kit'],
  modules: [NuxtTypedRouter, '@nuxtjs/i18n'],
  devtools: {
    enabled: true,
  },
  nuxtTypedRouter: {
    plugin: true,
    pathCheck: true,
    experimentalRemoveNuxtDefs: true,
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
    vueI18n: {
      legacy: false,
      fallbackLocale: 'de',
      locale: 'de',
    },
  },
});
