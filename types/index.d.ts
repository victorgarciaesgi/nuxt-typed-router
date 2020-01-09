import Vue from 'vue';
import { TypedVueRouter, TypedRoute } from './vue';
import './vue';

interface NuxtTypedRouterOptions {
  filePath?: string;
}

declare module '@nuxt/vue-app' {
  interface Context {
    $typedRouter: TypedVueRouter;
  }
  interface NuxtAppOptions {
    $typedRouter: TypedVueRouter;
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
    $typedRouter: TypedVueRouter;
  }
  interface NuxtAppOptions {
    $typedRouter: TypedVueRouter;
  }
}

declare module 'vue/types/vue' {
  interface Vue {
    $typedRouter: TypedVueRouter;
    $typedRoute: TypedRoute;
  }
}

declare module 'vuex/types/index' {
  interface Store<S> {
    $typedRouter: TypedVueRouter;
  }
}
