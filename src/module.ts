import { defineNuxtModule } from '@nuxt/kit';
import { routeHook } from './generators/nuxtHook';
import type { ModuleOptions } from './types';

export type { ModuleOptions } from './types';

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: 'nuxt-typed-router',
    configKey: 'nuxtTypedRouter',
    compatibility: { nuxt: '^3.0.0-rc.1', bridge: false },
  },
  setup(moduleOptions, nuxt) {
    const srcDir = nuxt.options.srcDir;
    const { outDir = `./generated`, routesObjectName = 'routerPagesNames' } = moduleOptions;

    nuxt.hook('pages:extend', () => routeHook(outDir, routesObjectName, srcDir, nuxt));
    routeHook(outDir, routesObjectName, srcDir, nuxt);
  },
});
