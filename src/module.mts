import { defineNuxtModule } from '@nuxt/kit-edge';
import { routeHook } from './generators/nuxtHook.mjs';
import type { NuxtTypedRouterOptions } from './types/index.mjs';

export type { NuxtTypedRouterOptions } from './types/index.mjs';
export * from './exports/index.mjs';

export default defineNuxtModule<NuxtTypedRouterOptions>({
  name: 'nuxt-typed-router',
  meta: {
    name: 'nuxt-typed-router',
    version: '1.0.0-alpha-3',
    configKey: 'typed-router',
    compatibility: { nuxt: '^3.0.0' },
  },
  setup(moduleOptions, nuxt) {
    const {
      outDir = `${nuxt.options.srcDir}/generated`,
      routesObjectName = 'routerPagesNames',
      stripAtFromName = false,
    } = moduleOptions;

    nuxt.hook('pages:extend', () => routeHook(outDir, routesObjectName, stripAtFromName));
    nuxt.hook('build:extendRoutes', () => routeHook(outDir, routesObjectName, stripAtFromName));
    routeHook(outDir, routesObjectName, stripAtFromName);
  },
});

// export default <Module<NuxtTypedRouterOptions>>function (moduleOptions) {
//   const {
//     outDir = `${this.extendBuildnuxt.options.srcDir}/generated`,
//     routesObjectName = 'routerPagesNames',
//     stripAtFromName = false,
//   }: NuxtTypedRouterOptions = { ...this.options.typedRouter, ...moduleOptions };

//   this.nuxt.hook('build:before', () =>
//     routeHook.call(this, outDir, routesObjectName, stripAtFromName)
//   );
//   this.nuxt.hook('build:extendRoutes', () =>
//     routeHook.call(this, outDir, routesObjectName, stripAtFromName)
//   );
// };
