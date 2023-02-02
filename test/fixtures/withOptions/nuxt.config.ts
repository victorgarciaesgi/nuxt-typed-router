import NuxtTypedRouter from '../../..';

export default defineNuxtConfig({
  modules: [NuxtTypedRouter],
  vite: {
    resolve: {
      dedupe: ['vue-router'],
    },
  },
});
