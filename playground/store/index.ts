import { useNuxtApp } from '#app';
import { useTypedRouter } from '../../dist/runtime/useTypedRouter';

export function callOutsideComponent() {
  // const { $typedRouter, $routesList, $router } = useNuxtApp();
  // console.log($typedRouter, $routesList, $router);
  const { router, routes } = useTypedRouter();
  console.log({ router, routes });
  router.push({ name: 'activate' });
}
