import { extendPages } from '@nuxt/kit';
import { Nuxt } from '@nuxt/schema/dist/index';
import { NuxtRouteConfig } from '@nuxt/types/config/router';
import chalk from 'chalk';
import logSymbols from 'log-symbols';
import { ModuleOptions } from '../types';
import { saveRouteFiles } from '../utils';
import { constructRouteMap } from './main.generator';
import {
  createDeclarationRoutesFile,
  createRuntimeTypeRouterFile,
  createRuntimeIndexFile,
  createRuntimePluginFile,
  createRuntimeRoutesFile,
  createRuntimeUseTypeRouteFile,
} from './output.generator';

export function routeHook(
  { outDir, plugin, routesObjectName }: ModuleOptions,
  srcDir: string,
  nuxt: Nuxt
) {
  try {
    extendPages(async (routes: NuxtRouteConfig[]) => {
      if (routes.length) {
        const { routesDeclTemplate, routesList, routesObjectTemplate, routesParams } =
          constructRouteMap(routes);

        if (plugin) {
          const pluginName = '__typed-router.ts';
          // const runtimeDir = resolve(
          //   __dirname,
          //   process.env.NUXT_BUILD_TYPE === 'stub' ? '../../dist/runtime' : './runtime'
          // );
          // const pluginPath = resolve(runtimeDir, pluginName);

          // `addPlugin` not working, workaround with creating plugin in user srcDir `plugins` folder

          nuxt.hook('build:done', async () => {
            const pluginFolder = `${srcDir}/plugins`;
            await saveRouteFiles(
              pluginFolder,
              srcDir,
              pluginName,
              createRuntimePluginFile(routesDeclTemplate)
            );
          });
        }

        await Promise.all([
          saveRouteFiles(
            outDir,
            srcDir,
            '__useTypedRouter.ts',
            createRuntimeTypeRouterFile(routesDeclTemplate)
          ),
          saveRouteFiles(
            outDir,
            srcDir,
            '__useTypedRoute.ts',
            createRuntimeUseTypeRouteFile(routesDeclTemplate)
          ),
          saveRouteFiles(
            outDir,
            srcDir,
            `__routes.ts`,
            createRuntimeRoutesFile({
              routesList,
              routesObjectTemplate,
              routesObjectName,
              routesDeclTemplate,
              routesParams,
            })
          ),
          saveRouteFiles(outDir, srcDir, `typed-router.d.ts`, createDeclarationRoutesFile()),
          saveRouteFiles(outDir, srcDir, 'index.ts', createRuntimeIndexFile()),
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
