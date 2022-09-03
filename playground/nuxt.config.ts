import { defineNuxtConfig } from 'nuxt';
import MyModule from '..';

export default defineNuxtConfig({
  buildModules: [MyModule],
  nuxtTypedRouter: {
    outDir: 'generated',
  },
});
