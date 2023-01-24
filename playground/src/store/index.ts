import { useRouter, navigateTo } from '@typed-router';

export async function callOutsideComponent() {
  // const { $typedRouter, $routesList, $router } = useNuxtApp();
  // console.log($typedRouter, $routesList, $router);
  const router = useRouter();
  router.push({ name: 'user' });

  const route = await navigateTo({ name: 'user-id-slug', params: { slug: 'foo' } });
  if (route instanceof Error) {
    //
  } else if (route) {
    console.log(route.name);
  }
}
