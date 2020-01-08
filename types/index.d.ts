import { SafeVueRouter } from './vue';

interface NuxtTypedRouterOptions {
  filePath?: string;
}

declare module '@nuxt/vue-app' {
  interface Context {
    $safeRouter: SafeVueRouter;
  }
  interface NuxtAppOptions {
    $safeRouter: SafeVueRouter;
  }
  interface Configuration {
    typedRouter?: NuxtTypedRouterOptions;
  }
}
// Nuxt 2.9+
declare module '@nuxt/types' {
  interface Configuration {
    typedRouter?: NuxtTypedRouterOptions;
  }
  interface Context {
    $safeRouter: SafeVueRouter;
  }
  interface NuxtAppOptions {
    $safeRouter: SafeVueRouter;
  }
}
