import { createResolver } from '@nuxt/kit';
import NuxtTypedRouter from '../../..';
import TestModuleRoute from './src/modules/testAddRoute';

export default defineNuxtConfig({
  modules: [NuxtTypedRouter, TestModuleRoute],
  nuxtTypedRouter: {
    plugin: true,
  },
  imports: {
    autoImport: false,
  },
  hooks: {
    'pages:extend': (routes) => {
      const { resolve } = createResolver(import.meta.url);

      routes.push({
        file: resolve('./src/components/testNuxtLink.vue'),
        path: '/testExtend/:id',
        name: 'test-extend',
      });
    },
  },
  srcDir: './src',
});
