import { defineNuxtModule, createResolver, addTemplate } from '@nuxt/kit';
import type { Nuxt } from '@nuxt/schema';
import type { NuxtI18nOptions } from '@nuxtjs/i18n';
import { createTypedRouter } from './core';
import { moduleOptionStore } from './core/config';
import type { ModuleOptions } from './types';
import { removeNuxtDefinitions } from './core/parser/removeNuxtDefs';
export type { ModuleOptions } from './types';

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: 'nuxt-typed-router',
    configKey: 'nuxtTypedRouter',
    compatibility: { nuxt: '>=3.0.0 || >= 4.0.0' },
  },
  defaults: {
    plugin: false,
    strict: false,
    pathCheck: true,
    disablePrettier: false,
    removeNuxtDefs: true,
    ignoreRoutes: [],
  },
  setup(moduleOptions, nuxt: Nuxt) {
    const { resolve } = createResolver(import.meta.url);

    let i18nOptions: NuxtI18nOptions | null = null;

    const hasi18nModuleRegistered = nuxt.options.modules.some((mod) => {
      if (Array.isArray(mod)) {
        const [moduleName, options] = mod;
        const isRegistered = moduleName === '@nuxtjs/i18n';
        if (isRegistered) {
          i18nOptions = options;
        }
        return isRegistered;
      } else {
        const isRegistered = mod === '@nuxtjs/i18n';
        if (isRegistered) {
          i18nOptions = (nuxt.options as any).i18n;
        }
        return isRegistered;
      }
    });

    const isDocumentDriven =
      !!nuxt.options.modules.find((mod) => {
        if (Array.isArray(mod)) {
          return mod[0] === '@nuxt/content';
        } else {
          return mod === '@nuxt/content';
        }
      }) &&
      'content' in nuxt.options &&
      'documentDriven' in (nuxt.options.content as any);

    moduleOptionStore.updateOptions({
      ...moduleOptions,
      i18n: hasi18nModuleRegistered,
      i18nOptions,
      isDocumentDriven,
    });

    nuxt.options.alias = {
      ...nuxt.options.alias,
      '@typed-router': resolve(`${nuxt.options.buildDir}/typed-router`),
    };

    // Force register of type declaration
    nuxt.hook('prepare:types', (options) => {
      options.tsConfig.include?.unshift('./typed-router/typed-router.d.ts');
      if (moduleOptions.removeNuxtDefs) {
        removeNuxtDefinitions({
          autoImport: nuxt.options.imports.autoImport ?? true,
          buildDir: nuxt.options.buildDir,
        });
      }
    });

    nuxt.hook('build:done', () => {
      if (moduleOptions.removeNuxtDefs) {
        removeNuxtDefinitions({
          autoImport: nuxt.options.imports.autoImport ?? true,
          buildDir: nuxt.options.buildDir,
        });
      }
    });

    if (nuxt.options.dev) {
      nuxt.hook('devtools:customTabs' as any, (tabs: any[]) => {
        tabs.push({
          name: 'nuxt-typed-router',
          title: 'Nuxt Typed Router',
          icon: 'https://github.com/victorgarciaesgi/nuxt-typed-router/blob/master/.github/images/logo.png?raw=true',
          view: {
            type: 'iframe',
            src: 'https://nuxt-typed-router.vercel.app/',
          },
        });
      });
    }

    createTypedRouter({ nuxt });
  },
});
