import NuxtTypedRouter from '../../..';
import TestModuleRoute from './src/modules/testAddRoute';

export default defineNuxtConfig({
  modules: [NuxtTypedRouter, TestModuleRoute, '@nuxtjs/i18n'],
  nuxtTypedRouter: {
    plugin: true,
  },
  i18n: {
    locales: ['en', 'fr'],
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
  imports: {
    autoImport: false,
  },
  srcDir: './src',
  vite: {
    resolve: {
      dedupe: ['vue-router'],
    },
  },
});
