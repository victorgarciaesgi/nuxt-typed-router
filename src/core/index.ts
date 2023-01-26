import { extendPages } from '@nuxt/kit';
import { Nuxt, NuxtPage } from '@nuxt/schema/dist/index';
import { NuxtRouteConfig } from '@nuxt/types/config/router';
import chalk from 'chalk';
import logSymbols from 'log-symbols';
import { ModuleOptions } from '../types';
import { handleAddPlugin, saveGeneratedFiles } from './output';
import { constructRouteMap } from './parser';

type CreateTypedRouterArgs = Required<ModuleOptions> & {
  nuxt: Nuxt;
  routesConfig?: NuxtPage[];
  isHookCall?: boolean;
};

let hasLoggedNoPages = false;
let hasRoutesDefined = false;

export async function createTypedRouter({
  plugin,
  nuxt,
  routesConfig,
  isHookCall = false,
}: CreateTypedRouterArgs): Promise<void> {
  try {
    const rootDir = nuxt.options.rootDir;
    const autoImport = nuxt.options.imports.autoImport ?? true;

    if (!isHookCall) {
      // Allow to collect custom routes added by config or module before generating it
      if (routesConfig) {
        await nuxt.callHook('pages:extend', routesConfig);
        return;
      }
      nuxt.hook('pages:extend', (routesConfig) => {
        createTypedRouter({ nuxt, plugin, routesConfig, isHookCall: true });
      });
      nuxt.hook('modules:done', () => {
        createTypedRouter({ nuxt, plugin, isHookCall: true });
      });
      if (plugin) {
        await handleAddPlugin();
      }
      return;
    }

    // We use extendPages here to access the NuxtRouteConfig, not accessible in the `pages:extend` hook
    extendPages(async (routes: NuxtRouteConfig[]) => {
      hasRoutesDefined = true;
      const outputData = constructRouteMap(routes);

      await saveGeneratedFiles({
        autoImport,
        rootDir,
        outputData,
        plugin,
      });
    });
    setTimeout(() => {
      if (!hasRoutesDefined && !hasLoggedNoPages) {
        hasLoggedNoPages = true;
        console.log(
          logSymbols.warning,
          chalk.yellow(
            `🚦 No routes defined. Check if your ${chalk.underline(
              chalk.bold('pages')
            )} folder exists`
          )
        );
      }
    }, 3000);
  } catch (e) {
    console.error(chalk.red('Error while generating routes definitions model'), '\n' + e);
  }
}
