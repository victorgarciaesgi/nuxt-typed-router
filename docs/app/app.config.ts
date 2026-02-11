
export default defineAppConfig({
  seo: {
    title: 'Nuxt Typed Router',
    description:
      'Provide a type safe router to Nuxt with auto-generated typed definitions for route names and autocompletion for route params',
  },
  header: {
    title: 'Nuxt Typed Router',
    logo: {
      alt: 'Nuxt Typed Router',
      light: '/logo.png',
      dark: '/logo.png',
    },
  },
  socials: {
    github: 'victorgarciaesgi/nuxt-typed-router',
  },
  ui: {
    primary: 'blue',
    pageFeature: {
      slots: {
        leadingIcon: 'text-blue-500',
      },
    },
  },
});
