import { NuxtTypedRouterOptions } from '../types';

// @ts-ignore
declare module '@nuxt/schema' {
  interface NuxtConfig {
    typedRouter?: NuxtTypedRouterOptions;
  }
}
