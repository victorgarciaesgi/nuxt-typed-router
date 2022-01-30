import { getCurrentInstance } from 'vue';
import { useNuxtApp } from '#app';

export const useTypedRouter = () => {
  const { $router } = useNuxtApp();

  const routesList = {};

  return {
    router: $router,
    routes: routesList,
  };
};
