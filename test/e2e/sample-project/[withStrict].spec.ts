import { setupNuxtTestWithConfig } from './utils';

setupNuxtTestWithConfig('withStrict', {
  modules: ['nuxt-typed-router'],
  nuxtTypedRouter: {
    strict: true,
  },
});
