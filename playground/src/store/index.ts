import { useRouter } from '@typed-router';

export function callOutsideComponent() {
  // const { $typedRouter, $routesList, $router } = useNuxtApp();
  // console.log($typedRouter, $routesList, $router);
  const router = useRouter();
  router.push({ name: 'user' });
}
