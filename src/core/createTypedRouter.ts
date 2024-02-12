import { extendPages } from '@nuxt/kit';
import type { Nuxt, NuxtPage } from '@nuxt/schema/dist/index';
import chalk from 'chalk';
import logSymbols from 'log-symbols';
import { moduleOptionStore } from '$$/core/stores';
import { handleAddPlugin, saveGeneratedFiles } from './output';
import { buildRoutesSchemas } from './parser';

// Cache to avoid over-logging
let hasLoggedNoPages = false;
let hasRoutesDefined = false;

interface CreateTypedRouterArgs {
  nuxt: Nuxt;
  routesConfig?: NuxtPage[];
  isHookCall?: boolean;
}

export async function createTypedRouter({
  nuxt,
  routesConfig,
  isHookCall = false,
}: CreateTypedRouterArgs): Promise<void> {
  try {
    const rootDir = nuxt.options.rootDir;
    const srcDir = nuxt.options.srcDir;
    const autoImport = nuxt.options.imports.autoImport ?? true;
    moduleOptionStore.updateOptions({ rootDir, autoImport, srcDir });

    if (!isHookCall) {
      // Allow to collect custom routes added by config or module before generating it
      if (routesConfig) {
        await nuxt.callHook('pages:extend', routesConfig);
        return;
      }
      nuxt.hook('pages:extend', (routesConfig) => {
        createTypedRouter({ nuxt, routesConfig, isHookCall: true });
      });
      nuxt.hook('modules:done', () => {
        createTypedRouter({ nuxt, isHookCall: true });
      });
      if (moduleOptionStore.plugin) {
        await handleAddPlugin();
      }
      return;
    }

    // We use extendPages here to access the NuxtPage, not accessible in the `pages:extend` hook
    extendPages(async (routes: NuxtPage[]) => {
      // console.log(JSON.stringify(routes));
      hasRoutesDefined = true;
      const outputData = buildRoutesSchemas(routes);

      await saveGeneratedFiles({
        outputData,
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
