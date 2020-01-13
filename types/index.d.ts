import Vue from 'vue';
import * as TypedRouter from './vue';
export default TypedRouter;

interface NuxtTypedRouterOptions {
  filePath?: string;
}

declare module '@nuxt/vue-app' {
  interface Context {
    $typedRouter: TypedRouter.TypedVueRouter;
  }
  interface NuxtAppOptions {
    $typedRouter: TypedRouter.TypedVueRouter;
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
    $typedRouter: TypedRouter.TypedVueRouter;
  }
  interface NuxtAppOptions {
    $typedRouter: TypedRouter.TypedVueRouter;
  }
}

declare module 'vue/types/vue' {
  interface Vue {
    $typedRouter: TypedRouter.TypedVueRouter;
    $typedRoute: TypedRouter.TypedRoute;
  }
}

declare module 'vuex/types/index' {
  interface Store<S> {
    $typedRouter: TypedRouter.TypedVueRouter;
  }
}
