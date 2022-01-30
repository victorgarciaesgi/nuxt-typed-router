import { fileURLToPath } from 'url';
import { extendPages } from '@nuxt/kit';
import { Nuxt } from '@nuxt/schema/dist/index';
import { NuxtRouteConfig } from '@nuxt/types/config/router';
import chalk from 'chalk';
import logSymbols from 'log-symbols';
import { dirname, resolve } from 'pathe';
import { saveRouteFiles } from '../utils';
import { constructRouteMap } from './main.generator';
import {
  createDeclarationRoutesFile,
  createRuntimeHookFile,
  createRuntimeIndexFile,
  createRuntimePluginFile,
  createRuntimeRoutesFile,
} from './output.generator';

// @ts-ignore
const __dirname = dirname(fileURLToPath(import.meta.url));

export function routeHook(outDir: string, routesObjectName: string, srcDir: string, nuxt: Nuxt) {
  try {
    extendPages(async (routes: NuxtRouteConfig[]) => {
      if (routes.length) {
        const { routesDeclTemplate, routesList, routesObjectTemplate, routesParams } =
          constructRouteMap(routes);

        const pluginName = '__typed-router.ts';
        const runtimeDir = resolve(
          __dirname,
          process.env.NUXT_BUILD_TYPE === 'stub' ? '../../dist/runtime' : './runtime'
        );
        const pluginPath = resolve(runtimeDir, pluginName);

        // `addPlugin` not working, workaround with creating plugin in user srcDir `plugins` folder

        nuxt.hook('build:done', async () => {
          const pluginFolder = `${srcDir}/plugins`;
          await saveRouteFiles(
            pluginFolder,
            pluginName,
            createRuntimePluginFile(routesDeclTemplate)
          );
        });

        await Promise.all([
          saveRouteFiles(outDir, '__useTypedRouter.ts', createRuntimeHookFile(routesDeclTemplate)),
          saveRouteFiles(
            outDir,
            `__routes.ts`,
            createRuntimeRoutesFile({ routesList, routesObjectTemplate, routesObjectName })
          ),
          saveRouteFiles(
            outDir,
            `typed-router.d.ts`,
            createDeclarationRoutesFile({ routesDeclTemplate, routesList, routesParams })
          ),
          saveRouteFiles(outDir, 'index.ts', createRuntimeIndexFile()),
        ]);

        console.log(logSymbols.success, `[typed-router] Routes definitions generated`);
      } else {
        console.log(
          logSymbols.warning,
          chalk.yellow(
            `[typed-router] No routes defined. Check if your ${chalk.underline(
              chalk.bold('pages')
            )} folder exists and remove ${chalk.underline(chalk.bold('app.vue'))}`
          )
        );
      }
    });
  } catch (e) {
    console.error(chalk.red('Error while generating routes definitions model'), '\n' + e);
  }
}
