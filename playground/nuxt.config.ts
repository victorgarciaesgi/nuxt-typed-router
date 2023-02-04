import NuxtTypedRouter from '..';

export default defineNuxtConfig({
  modules: [NuxtTypedRouter, '@nuxtjs/i18n'],
  nuxtTypedRouter: {
    plugin: true,
    strict: true,
  },
  srcDir: './src',
  i18n: {
    // add `vueI18n` option to `@nuxtjs/i18n` module options
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
});
