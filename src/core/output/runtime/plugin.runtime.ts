import { watermarkTemplate } from '../templates';

export function createRuntimePluginFile(routesDeclTemplate: string): string {
  return `
  ${watermarkTemplate}
  import { defineNuxtPlugin } from '#app';
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
