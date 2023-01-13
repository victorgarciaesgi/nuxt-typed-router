import { defineNuxtConfig } from 'nuxt/config';
import MyModule from '..';

export default defineNuxtConfig({
  modules: [MyModule],
  nuxtTypedRouter: {
    plugin: true,
  },
});
