import { NuxtTypedRouterOptions } from './types';
declare module '@nuxt/schema' {
    interface NuxtConfig {
        typedRouter?: NuxtTypedRouterOptions;
    }
}
