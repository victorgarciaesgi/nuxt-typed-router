import { defineNuxtConfig } from 'nuxt3';
import typedRouter from '../../../lib/module';

// https://v3.nuxtjs.org/docs/directory-structure/nuxt.config
export default defineNuxtConfig({
  modules: ['nuxt-typed-router'],
  typedRouter: {
    filePath: './models/__routes.ts',
  },
});
