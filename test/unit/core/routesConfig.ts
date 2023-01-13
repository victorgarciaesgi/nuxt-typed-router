export const routesConfig = [
  {
    name: 'index',
    path: '/',
    file: '/Users/victorgarcia/Desktop/projects/nuxt-typed-router/playground/pages/index.vue',
    children: [],
  },
  {
    path: '/parent/child-two',
    file: '/Users/victorgarcia/Desktop/projects/nuxt-typed-router/playground/pages/parent/child-two.vue',
    children: [
      {
        name: 'parent-child-two-id',
        path: ':id',
        file: '/Users/victorgarcia/Desktop/projects/nuxt-typed-router/playground/pages/parent/child-two/[id].vue',
        children: [],
      },
      {
        name: 'parent-child-two-child-one-sub-one',
        path: 'child-one-sub-one',
        file: '/Users/victorgarcia/Desktop/projects/nuxt-typed-router/playground/pages/parent/child-two/child-one-sub-one/index.vue',
        children: [],
      },
      {
        name: 'parent-child-two',
        path: '',
        file: '/Users/victorgarcia/Desktop/projects/nuxt-typed-router/playground/pages/parent/child-two/index.vue',
        children: [],
      },
      {
        path: 'profile',
        file: '/Users/victorgarcia/Desktop/projects/nuxt-typed-router/playground/pages/parent/child-two/profile.vue',
        children: [
          {
            path: ':id',
            file: '/Users/victorgarcia/Desktop/projects/nuxt-typed-router/playground/pages/parent/child-two/profile/[id].vue',
            children: [
              {
                path: ':slug',
                file: '/Users/victorgarcia/Desktop/projects/nuxt-typed-router/playground/pages/parent/child-two/profile/[id]/[slug].vue',
                children: [
                  {
                    name: 'parent-child-two-profile-id-slug-articles',
                    path: 'articles',
                    file: '/Users/victorgarcia/Desktop/projects/nuxt-typed-router/playground/pages/parent/child-two/profile/[id]/[slug]/articles.vue',
                    children: [],
                  },
                  {
                    name: 'parent-child-two-profile-id-slug',
                    path: '',
                    file: '/Users/victorgarcia/Desktop/projects/nuxt-typed-router/playground/pages/parent/child-two/profile/[id]/[slug]/index.vue',
                    children: [],
                  },
                ],
              },
              {
                name: 'parent-child-two-profile-id',
                path: '',
                file: '/Users/victorgarcia/Desktop/projects/nuxt-typed-router/playground/pages/parent/child-two/profile/[id]/index.vue',
                children: [],
              },
            ],
          },
          {
            name: 'parent-child-two-profile',
            path: '',
            file: '/Users/victorgarcia/Desktop/projects/nuxt-typed-router/playground/pages/parent/child-two/profile/index.vue',
            children: [],
          },
        ],
      },
    ],
  },
  {
    name: 'rootPage',
    path: '/rootPage',
    file: '/Users/victorgarcia/Desktop/projects/nuxt-typed-router/playground/pages/rootPage.vue',
    children: [],
  },
];
