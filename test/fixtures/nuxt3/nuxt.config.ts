import { defineNuxtConfig } from 'nuxt3';
// import typedRouter from '../../../lib/module';

export default defineNuxtConfig({
  modules: ['nuxt-typed-router'],
  typedRouter: {
    filePath: './models/__routes.ts',
  },
});
