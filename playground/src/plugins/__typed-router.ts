import { defineNuxtPlugin, useRouter, useRoute } from '#app';
import { TypedRouter, TypedRoute } from '@typed-router';

export default defineNuxtPlugin(() => {
  const router = useRouter();
  const route = useRoute();
  const routesNames = {
    index: 'index',
    userFooBar: 'user-foo-bar',
    id: {
      slug: { articles: 'user-id-slug-articles', index: 'user-id-slug' },
      index: 'user-id',
      posts: 'user-id-posts',
    },
    user: 'user',
    userPostsSlug: 'user-posts-slug',
    userTestOptional: 'user-test-optional',
  };

  return {
    provide: {
      typedRouter: router as TypedRouter,
      typedRoute: route as TypedRoute,
      routesNames,
    },
  };
});
