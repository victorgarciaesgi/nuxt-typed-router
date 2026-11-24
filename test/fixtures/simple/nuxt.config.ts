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
  typescript: {
    // Type-check the `tests/**/*.spec-d.ts` assertions with `vue-tsc` (not included by default in Nuxt 4)
    tsConfig: { include: ['../tests/**/*'] },
  },
  compatibilityDate: '2025-01-07',
});
