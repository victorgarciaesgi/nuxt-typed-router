import { defineNuxtModule } from '@nuxt/kit';
import { routeHook } from './generators/nuxtHook';
import type { ModuleOptions } from './types';

export type { ModuleOptions } from './types';

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: 'nuxt-typed-router',
    configKey: 'nuxtTypedRouter',
  },
  defaults: {
    outDir: `./generated`,
    routesObjectName: 'routerPagesNames',
  },
  setup(moduleOptions, nuxt: any) {
    const srcDir = nuxt.options.srcDir;
    const { outDir, routesObjectName } = moduleOptions;

    nuxt.hook('pages:extend', () => routeHook(outDir!, routesObjectName!, srcDir, nuxt));
    routeHook(outDir!, routesObjectName!, srcDir, nuxt);
  },
});
