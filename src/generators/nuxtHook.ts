import { addPluginTemplate, extendPages } from '@nuxt/kit-edge';
import { NuxtRouteConfig } from '@nuxt/types/config/router';
import chalk from 'chalk';
import logSymbols from 'log-symbols';
import { resolve } from 'pathe';
import { saveRouteFiles } from '../utils';
import { constructRouteMap } from './main.generator';
import { createDeclarationRoutesFile, createRuntimeRoutesFile } from './output.generator';
import { Nuxt } from '@nuxt/schema';

export function routeHook(
  outDir: string,
  routesObjectName: string,
  stripAtFromName: boolean,
  nuxt: Nuxt
) {
  try {
    extendPages(async (routes: NuxtRouteConfig[]) => {
      const { routesDeclTemplate, routesList, routesObjectTemplate, routesParams } =
        await constructRouteMap(routes);

      const templatesDir = resolve(__dirname, '../templates/typed-router.js');
      nuxt.options.build.transpile.push(templatesDir);

      addPluginTemplate({
        src: templatesDir,
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
