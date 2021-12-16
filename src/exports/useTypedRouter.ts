import { useRouter } from 'vue-router';
import { useNuxtApp } from 'nuxt3';

export const useTypedRouter = (): unknown => {
  const router = useRouter();
  const { $routesList } = useNuxtApp();
  return {
    router,
    routes: $routesList,
  };
};
