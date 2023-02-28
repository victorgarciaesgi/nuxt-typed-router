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
    locales: ['en', 'fr'],
    defaultLocale: 'en',
    strategy: 'prefix_except_default',
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
