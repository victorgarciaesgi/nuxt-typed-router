export default defineNuxtConfig({
  extends: '@nuxt-themes/docus',
  css: ['@/assets/theme.css'],
  app: {
    head: {
      meta: [
        {
          name: 'google-site-verification',
          content: 'g3klMOEJCzOJ5ATgQHqYvjYEcdGnpWVC9NpMxrvcqNA',
        },
      ],
    },
  },
});
