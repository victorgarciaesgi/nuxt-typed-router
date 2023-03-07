import { createResolver, defineNuxtModule, extendPages } from '@nuxt/kit';
import NuxtTypedRouter from '..';

export default defineNuxtConfig({
  modules: [NuxtTypedRouter, '@nuxtjs/i18n', '@nuxt/devtools'],
  nuxtTypedRouter: {
    plugin: true,
    experimentalPathCheck: true,
  },
  srcDir: './src',
  i18n: {
    locales: ['en', 'fr-FR'],
    defaultLocale: 'en',
    strategy: 'prefix',
    vueI18n: {
      legacy: false,
      locale: 'en',
      messages: {
        en: {
          welcome: 'Welcome',
        },
        fr: {
          welcome: 'Bienvenue',
        },
      },
    },
  },
});
