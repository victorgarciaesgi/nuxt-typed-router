import { defineNuxtModule, createResolver } from '@nuxt/kit';
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
    plugin: false,
  },
  setup(moduleOptions, nuxt: Nuxt) {
    const srcDir = nuxt.options.srcDir;
    const { plugin } = moduleOptions as Required<ModuleOptions>;
    const { resolve } = createResolver(import.meta.url);
    nuxt.options.alias = {
      ...nuxt.options.alias,
      '@typed-router': resolve(`${nuxt.options.rootDir}/.nuxt/typed-router`),
    };

    nuxt.hook('pages:extend', () => createTypedRouter({ srcDir, nuxt, plugin }));
    // Allow generating files on load
    createTypedRouter({ srcDir, nuxt, plugin });
  },
});
