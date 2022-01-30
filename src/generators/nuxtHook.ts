import { fileURLToPath } from 'url';
import { addPluginTemplate, extendPages } from '@nuxt/kit';
import { NuxtRouteConfig } from '@nuxt/types/config/router';
import chalk from 'chalk';
import logSymbols from 'log-symbols';
import { dirname, resolve } from 'pathe';
import { saveRouteFiles } from '../utils';
import { constructRouteMap } from './main.generator';
import {
  createDeclarationRoutesFile,
  createRuntimeHookFile,
  createRuntimePluginFile,
  createRuntimeRoutesFile,
} from './output.generator';

const __dirname = dirname(fileURLToPath(import.meta.url));

export function routeHook(outDir: string, routesObjectName: string) {
  try {
    extendPages(async (routes: NuxtRouteConfig[]) => {
      const { routesDeclTemplate, routesList, routesObjectTemplate, routesParams } =
        constructRouteMap(routes);

      const pluginName = 'typed-router.mjs';
      const runtimeDir = resolve(
        __dirname,
        process.env.NUXT_BUILD_TYPE === 'stub' ? '../../dist/runtime' : './runtime'
      );
      const pluginPath = resolve(runtimeDir, pluginName);

      await Promise.all([
        saveRouteFiles(runtimeDir, 'useTypedRouter.mjs', createRuntimeHookFile(routesDeclTemplate)),
        saveRouteFiles(runtimeDir, pluginName, createRuntimePluginFile(routesDeclTemplate)),
      ]);

      addPluginTemplate({
        src: pluginPath,
        filename: pluginName,
        options: {
          routesList: 'test',
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
