import { defineNuxtConfig } from 'nuxt3';
import typedRouter from '../../../lib/module.mjs';

export default defineNuxtConfig({
  buildModules: ['nuxt-typed-router'],
  typedRouter: {
    outDir: './models',
  },
});
