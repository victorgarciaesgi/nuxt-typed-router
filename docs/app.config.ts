export default defineAppConfig({
  docus: {
    url: 'https://nuxt-typed-router.vercel.app/',
    title: 'Nuxt Typed Router',
    description:
      'Provide a type safe router to Nuxt with auto-generated typed definitions for route names and autocompletion for route params',
    image:
      'https://raw.githubusercontent.com/victorgarciaesgi/nuxt-typed-router/master/.github/images/cover.png',
    socials: {
      github: 'victorgarciaesgi/nuxt-typed-router',
    },
    aside: {
      level: 0,
    },
    cover: {
      src: '/cover.jpg',
      alt: 'Type safe router for Nuxt',
    },
    header: {
      logo: true,
    },
    footer: {
      iconLinks: [
        {
          href: 'https://nuxt.com',
          icon: 'IconNuxtLabs',
        },
      ],
      credits: {
        icon: 'IconDocus',
        text: 'Powered by Docus',
        href: 'https://docus.dev',
      },
    },
    github: {
      dir: 'docs/content',
      edit: true,
      contributors: true,
      owner: 'victorgarciaesgi',
      repo: 'nuxt-typed-router',
      branch: 'master',
    },
  },
});
