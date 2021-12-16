import { defineNuxtConfig } from 'nuxt3';
import typedRouter from '../../../lib/module';

export default defineNuxtConfig({
  buildModules: [typedRouter],
  typedRouter: {
    outDir: './models',
  },
});
