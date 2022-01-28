import { defineNuxtModule } from '@nuxt/kit';
import { routeHook } from './generators/nuxtHook';
import type { ModuleOptions } from './types';

export * from './exports';
export type { ModuleOptions } from './types';

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: 'nuxt-typed-router',
    configKey: 'nuxtTypedRouter',
    compatibility: { nuxt: '^3.0.0', bridge: false },
  },
  defaults: {
    routesObjectName: 'routerPagesNames',
    stripAtFromName: false,
  },
  setup(moduleOptions, nuxt) {
    const {
      outDir = `${nuxt.options.srcDir}/generated`,
      routesObjectName,
      stripAtFromName,
    } = moduleOptions;

    nuxt.hook('pages:extend', () => routeHook(outDir, routesObjectName, stripAtFromName, nuxt));
    nuxt.hook('build:extendRoutes', () =>
      routeHook(outDir, routesObjectName, stripAtFromName, nuxt)
    );
    routeHook(outDir, routesObjectName, stripAtFromName, nuxt);
  },
});
