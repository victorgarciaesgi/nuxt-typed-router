import { defineNuxtModule, createResolver } from '@nuxt/kit';
import { Nuxt } from '@nuxt/schema';
import { createTypedRouter } from './core';
import { moduleOptionStore } from './core/config';
import type { ModuleOptions } from './types';

export type { ModuleOptions } from './types';

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: 'nuxt-typed-router',
    configKey: 'nuxtTypedRouter',
    compatibility: { nuxt: '^3.0.0', bridge: false },
  },
  defaults: {
    plugin: false,
    strict: false,
  } satisfies ModuleOptions,
  setup(moduleOptions, nuxt: Nuxt) {
    const { resolve } = createResolver(import.meta.url);

    const rootDir = nuxt.options.rootDir;
    const hasi18nModuleRegistered = !!nuxt.options.modules.find((mod) => mod === '@nuxtjs/i18n');

    moduleOptionStore.updateOptions({
      ...moduleOptions,
      i18n: hasi18nModuleRegistered,
      i18nLocales: (nuxt.options as any)?.i18n?.locales ?? [],
    });

    nuxt.options.alias = {
      ...nuxt.options.alias,
      '@typed-router': resolve(`${rootDir}/.nuxt/typed-router`),
    };

    // Force register of type declaration
    nuxt.options.typescript.tsConfig = {
      include: ['./typed-router/typed-router.d.ts'],
    };

    // Allow generating files on load
    createTypedRouter({ nuxt });
  },
});
