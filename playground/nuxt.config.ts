import NuxtTypedRouter from '..';

export default defineNuxtConfig({
  modules: [NuxtTypedRouter, '@nuxtjs/i18n', '@nuxt/devtools'],
  nuxtTypedRouter: {
    plugin: true,
    experimentalPathCheck: true,
  },
  imports: {},
  srcDir: './src',
  i18n: {
    locales: [
      { code: 'en', name: 'en' },
      { code: 'fr-FR', name: 'fr' },
    ],
    defaultLocale: 'en',
    strategy: 'prefix_and_default',
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
