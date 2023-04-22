import { createResolver, defineNuxtModule, extendPages } from '@nuxt/kit';
import NuxtTypedRouter from '..';

export default defineNuxtConfig({
  extends: ['nuxt-seo-kit'],
  modules: [NuxtTypedRouter, '@nuxtjs/i18n', '@nuxt/devtools'],
  nuxtTypedRouter: {
    plugin: true,
    pathCheck: true,
    experimentalRemoveNuxtDefs: true,
  },
  srcDir: './src',
  // i18n: {
  //   locales: ['en', 'fr-FR'],
  //   defaultLocale: 'en',
  //   strategy: 'no_prefix',
  //   vueI18n: {
  //     legacy: false,
  //     locale: 'en',
  //     messages: {
  //       en: {
  //         welcome: 'Welcome',
  //       },
  //       fr: {
  //         welcome: 'Bienvenue',
  //       },
  //     },
  //   },
  // },
});
