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
    experimentalPathCheck: true,
  } satisfies ModuleOptions,
  setup(moduleOptions, nuxt: Nuxt) {
    const { resolve } = createResolver(import.meta.url);

    const rootDir = nuxt.options.rootDir;
    let i18nLocales: string[] = [];

    const hasi18nModuleRegistered = nuxt.options.modules.some((mod) => {
      if (Array.isArray(mod)) {
        const [moduleName, options] = mod;
        const isRegistered = moduleName === '@nuxtjs/i18n';
        if (isRegistered) {
          i18nLocales = options?.locales ?? [];
        }
        return isRegistered;
      } else {
        const isRegistered = mod === '@nuxtjs/i18n';
        if (isRegistered) {
          i18nLocales = (nuxt.options as any).i18n?.locales ?? [];
        }
        return isRegistered;
      }
    });

    moduleOptionStore.updateOptions({
      ...moduleOptions,
      i18n: hasi18nModuleRegistered,
      i18nLocales,
    });

    nuxt.options.alias = {
      ...nuxt.options.alias,
      '@typed-router': resolve(`${rootDir}/.nuxt/typed-router`),
    };

    // Force register of type declaration
    nuxt.options.typescript.tsConfig = {
      include: ['./typed-router/typed-router.d.ts'],
      ...(moduleOptions.experimentalPathCheck && {
        // Enable Volar components generics https://github.com/vuejs/rfcs/discussions/436
        vueCompilerOptions: {
          jsxTemplates: true,
          experimentalRfc436: true,
        },
      }),
    };

    createTypedRouter({ nuxt });
  },
});
