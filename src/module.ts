import { defineNuxtModule } from '@nuxt/kit';
import { routeHook } from 'generators/nuxtHook';
import { NuxtTypedRouterOptions } from './types';

export default defineNuxtModule<NuxtTypedRouterOptions>({
  meta: {
    name: 'nuxt-typed-router',
    version: '1.0.0-alpha-3',
    configKey: 'typed-router',
    compatibility: { nuxt: '^3.0.0' },
  },
  setup(moduleOptions, nuxt) {
    const {
      outDir = `${nuxt.options.srcDir}/generated`,
      routesObjectName = 'routerPagesNames',
      stripAtFromName = false,
    } = moduleOptions;

    nuxt.hook('build:before', () => routeHook(outDir, routesObjectName, stripAtFromName));
    nuxt.hook('build:extendRoutes', () => routeHook(outDir, routesObjectName, stripAtFromName));
  },
});
