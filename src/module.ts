import { defineNuxtModule } from '@nuxt/kit';
import { Nuxt } from '@nuxt/schema';
import { routeHook } from './generators/nuxtHook';
import type { ModuleOptions } from './types';

export type { ModuleOptions } from './types';

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: 'nuxt-typed-router',
    configKey: 'nuxtTypedRouter',
    compatibility: { nuxt: '^3.0.0-rc.1', bridge: false },
  },
  defaults: {
    outDir: `./generated`,
    routesObjectName: 'routerPagesNames',
  },
  setup(moduleOptions, nuxt: Nuxt) {
    const srcDir = nuxt.options.srcDir;
    const { plugin = false, ...otherOptions } = moduleOptions;

    nuxt.hook('pages:extend', () => routeHook({ ...otherOptions, plugin }, srcDir, nuxt));
  },
});
