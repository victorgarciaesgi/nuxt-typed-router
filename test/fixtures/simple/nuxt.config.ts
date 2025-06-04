export default defineNuxtConfig({
  modules: ['nuxt-typed-router'],
  future: {
    compatibilityVersion: 4,
  },
  vite: {
    resolve: {
      dedupe: ['vue-router'],
    },
  },
  compatibilityDate: '2025-01-07',
});
