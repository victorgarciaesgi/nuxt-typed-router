import { useRouter } from 'vue-router';
import { getCurrentInstance } from 'vue';
import { NuxtApp } from 'nuxt3';

function useNuxtApp(): NuxtApp {
  const vm = getCurrentInstance();
  if (!vm) {
    throw new Error('nuxt instance unavailable');
  }
  return (vm.appContext.app as any).$nuxt;
}

export const useTypedRouter = (): unknown => {
  const router = useRouter();
  const { $routesList } = useNuxtApp();
  return {
    router,
    routes: $routesList,
  };
};
