import { getCurrentInstance } from 'vue';

function useNuxtApp() {
  const vm = getCurrentInstance();
  if (!vm) {
    throw new Error('nuxt instance unavailable');
  }
  return vm.appContext.app.$nuxt;
}

export const useTypedRouter = () => {
  const { $router } = useNuxtApp();

  const routesList = {};

  return {
    router: $router,
    routes: routesList,
  };
};
