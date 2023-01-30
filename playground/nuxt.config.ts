import NuxtTypedRouter from '..';

export default defineNuxtConfig({
  modules: [NuxtTypedRouter],
  nuxtTypedRouter: {
    plugin: true,
    stict: false,
  },
  srcDir: './src',
});
