export function createPluginFile(routesDeclTemplate: string): string {
  return /* typescript */ `
  
  import { defineNuxtPlugin, useRouter, useRoute } from '#app';
  import {TypedRouter, TypedRoute} from '@typed-router';

  export default defineNuxtPlugin(() => {
    const router = useRouter();
    const route = useRoute();
    const routesNames = ${routesDeclTemplate};

    return {
      provide: {
        typedRouter: router as TypedRouter,
        typedRoute: route as TypedRoute,
        routesNames,
      },
    };
  });
  `;
}
