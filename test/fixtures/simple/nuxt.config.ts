export default defineNuxtConfig({
  modules: ['nuxt-typed-router'],
  vite: {
    resolve: {
      dedupe: ['vue-router'],
    },
  },
});
