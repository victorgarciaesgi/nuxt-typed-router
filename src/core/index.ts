import { extendPages } from '@nuxt/kit';
import { Nuxt } from '@nuxt/schema/dist/index';
import { NuxtRouteConfig } from '@nuxt/types/config/router';
import chalk from 'chalk';
import logSymbols from 'log-symbols';
import { ModuleOptions } from '../types';
import { handlePluginFileSave, saveGeneratedFiles } from './output';
import { constructRouteMap } from './parser';

type CreateTypedRouterArgs = Required<ModuleOptions> & {
  rootDir: string;
  nuxt: Nuxt;
};

export function createTypedRouter({ rootDir, plugin, nuxt }: CreateTypedRouterArgs): void {
  try {
    // We use extendPages here to access the NuxtRouteConfig, not accessible in the `pages:extend` hook
    extendPages(async (routes: NuxtRouteConfig[]) => {
      if (routes.length) {
        const outputData = constructRouteMap(routes);

        if (plugin) {
          handlePluginFileSave({
            nuxt,
            routesDeclTemplate: outputData.routesDeclTemplate,
            rootDir,
          });
        }

        await saveGeneratedFiles({
          rootDir,
          outputData,
        });
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
