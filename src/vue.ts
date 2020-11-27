import { NuxtTypedRouterOptions } from 'types';

// @ts-ignore
declare module '@nuxt/vue-app' {
  interface Configuration {
    typedRouter?: NuxtTypedRouterOptions;
  }
}
