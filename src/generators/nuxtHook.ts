import { addPluginTemplate, extendPages } from '@nuxt/kit';
import { NuxtRouteConfig } from '@nuxt/types/config/router';
import chalk from 'chalk';
import { resolve } from 'path';
import { saveRouteFiles } from 'utils';
import { constructRouteMap } from './main.generator';
import { createDeclarationRoutesFile, createRuntimeRoutesFile } from './output.generator';

export function routeHook(outDir: string, routesObjectName: string, stripAtFromName: boolean) {
  try {
    extendPages(async (routes: NuxtRouteConfig[]) => {
      const { routesDeclTemplate, routesList, routesObjectTemplate, routesParams } =
        await constructRouteMap(routes);

      addPluginTemplate({
        src: resolve(__dirname, './templates/typed-router.js'),
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
    });
  } catch (e) {
    console.error(chalk.red('Error while generating routes definitions model'), '\n' + e);
  }
}
