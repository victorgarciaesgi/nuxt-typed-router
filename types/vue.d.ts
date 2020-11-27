import { NuxtTypedRouterOptions } from 'types';
declare module '@nuxt/vue-app' {
    interface Configuration {
        typedRouter?: NuxtTypedRouterOptions;
    }
}
