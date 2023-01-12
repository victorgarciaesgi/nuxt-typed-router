import { fileURLToPath } from 'url';
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
    plugin: false,
  },
  setup(moduleOptions, nuxt: Nuxt) {
    const srcDir = nuxt.options.srcDir;
    const { plugin } = moduleOptions as Required<ModuleOptions>;
    nuxt.options.alias = {
      ...nuxt.options.alias,
      '@typed-router': fileURLToPath(
        // @ts-ignore
        new URL(`${nuxt.options.rootDir}/.nuxt/typed-router`, import.meta.url)
      ),
    };

    nuxt.hook('pages:extend', () => createTypedRouter({ srcDir, nuxt, plugin }));
  },
});
