export default defineNuxtConfig({
  modules: ['nuxt-typed-router'],

  vite: {
    resolve: {
      dedupe: ['vue-router'],
    },
  },

  compatibilityDate: '2025-01-07',
});