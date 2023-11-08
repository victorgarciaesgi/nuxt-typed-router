export function createPluginFile(): string {
  return /* typescript */ `
  
  import { defineNuxtPlugin, useRouter, useRoute } from '#imports';
  import {TypedRouter, TypedRoute, routesNames} from '@typed-router';

  export default defineNuxtPlugin(() => {
    const router = useRouter();
    const route = useRoute();

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
