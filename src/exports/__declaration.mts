import { NuxtTypedRouterOptions } from '../types/index.mjs';

// @ts-ignore
declare module '@nuxt/schema' {
  interface NuxtConfig {
    typedRouter?: NuxtTypedRouterOptions;
  }
}
