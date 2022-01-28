import { fileURLToPath } from 'url';
import { addPluginTemplate, extendPages } from '@nuxt/kit';
import { Nuxt } from '@nuxt/schema';
import { NuxtRouteConfig } from '@nuxt/types/config/router';
import chalk from 'chalk';
import logSymbols from 'log-symbols';
import { resolve } from 'pathe';
import { saveRouteFiles } from '../utils';
import { constructRouteMap } from './main.generator';
import { createDeclarationRoutesFile, createRuntimeRoutesFile } from './output.generator';

export function routeHook(
  outDir: string,
  routesObjectName: string,
  stripAtFromName: boolean,
  nuxt: Nuxt
) {
  try {
    extendPages(async (routes: NuxtRouteConfig[]) => {
      const { routesDeclTemplate, routesList, routesObjectTemplate, routesParams } =
        constructRouteMap(routes);

      const runtimeDir = fileURLToPath(new URL('../runtime', import.meta.url));
      nuxt.options.build.transpile.push(runtimeDir);

      addPluginTemplate({
        src: runtimeDir,
        fileName: 'typed-router.js',
        options: {
          routesList: routesDeclTemplate,
        },
      });

      await saveRouteFiles(
        outDir,
        `__routes.ts`,
        createRuntimeRoutesFile({ routesList, routesObjectTemplate, routesObjectName })
      );
      await saveRouteFiles(
        outDir,
        `typed-router.d.ts`,
        createDeclarationRoutesFile({ routesDeclTemplate, routesList, routesParams })
      );
      console.log(logSymbols.success, `[typed-router] Routes definitions generated`);
    });
  } catch (e) {
    console.error(chalk.red('Error while generating routes definitions model'), '\n' + e);
  }
}
