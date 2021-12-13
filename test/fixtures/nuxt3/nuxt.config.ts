import { defineNuxtConfig } from 'nuxt3';
import typedRouter from '../../../lib/module';

export default defineNuxtConfig({
  modules: [typedRouter],
  typedRouter: {
    filePath: './models/__routes.ts',
  },
});
