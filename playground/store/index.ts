import { useTypedRouter } from '@typed-router';

export function callOutsideComponent() {
  // const { $typedRouter, $routesList, $router } = useNuxtApp();
  // console.log($typedRouter, $routesList, $router);
  const router = useTypedRouter();
  console.log({ router });
  router.push({ name: 'activate' });
}
