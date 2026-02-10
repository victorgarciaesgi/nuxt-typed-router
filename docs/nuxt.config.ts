export default defineNuxtConfig({
  app: {
    head: {
      meta: [
        {
          name: 'google-site-verification',
          content: 'g3klMOEJCzOJ5ATgQHqYvjYEcdGnpWVC9NpMxrvcqNA',
        },
      ],
      script: [
        {
          defer: '',
          src: 'https://cloud.umami.is/script.js',
          'data-website-id': 'ca4a44f0-dcdb-4b24-83e6-96b5a699235e',
        },
      ],
    },
  },
});
