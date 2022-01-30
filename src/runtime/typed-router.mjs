import { defineNuxtPlugin } from '#app';

export default defineNuxtPlugin((nuxtApp) => {
  const routesList = {};

  return {
    provide: {
      typedRouter: nuxtApp.vueApp.$router,
      routesList,
    },
  };
});
