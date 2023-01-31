import NuxtTypedRouter from '..';

export default defineNuxtConfig({
  modules: [NuxtTypedRouter],
  nuxtTypedRouter: {
    plugin: true,
  },
  srcDir: './src',
});
