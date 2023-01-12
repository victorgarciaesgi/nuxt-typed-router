import { defineNuxtModule } from '@nuxt/kit';
import { Nuxt } from '@nuxt/schema';
import { createTypedRouter } from './core';
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
    plugin: true,
  },
  setup(moduleOptions, nuxt: Nuxt) {
    const srcDir = nuxt.options.srcDir;
    const _options = moduleOptions as Required<ModuleOptions>;

    nuxt.hook('pages:extend', () => createTypedRouter({ srcDir, nuxt, ..._options }));
  },
});
