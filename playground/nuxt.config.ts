import NuxtTypedRouter from '..';

export default defineNuxtConfig({
  modules: [NuxtTypedRouter],
  nuxtTypedRouter: {
    plugin: true,
    strict: {
      router: {
        strictToArgument: true,
      },
    },
  },
  srcDir: './src',
});
