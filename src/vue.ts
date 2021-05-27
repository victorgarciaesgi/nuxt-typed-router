import { NuxtTypedRouterOptions } from './types';
declare module '@nuxt/types' {
  interface NuxtConfig {
    typedRouter?: NuxtTypedRouterOptions;
  }
}
