import { camelCase } from 'lodash';
import chalk from 'chalk';
import { Module } from '@nuxt/types';
import { NuxtTypedRouterOptions } from './types';
import { NuxtRouteConfig } from '@nuxt/types/config/router';
import { saveRoutesFiles } from './save';
import { transformRouteNames } from './utils';

const typedRouterModule: Module<NuxtTypedRouterOptions> = function (moduleOptions) {
  const {
    filePath = `${this.options.srcDir}/__routes.js`,
    routesObjectName = 'routerPagesNames',
    stripAtFromName = false,
  }: NuxtTypedRouterOptions = { ...this.options.typedRouter, ...moduleOptions };

  this.nuxt.hook('build:extendRoutes', async (existingRoutes: NuxtRouteConfig[]) => {
    try {
      // Redirect with @

      this.extendRoutes(async (routes: NuxtRouteConfig[]) => {
        transformRouteNames(routes, stripAtFromName);

        let routesObjectString = '{';
        let routeObjectJs: Record<string, any> = {};

        const recursiveTypedRoutes = (
          route: NuxtRouteConfig,
          level: number,
          routeObject: Record<string, any>
        ) => {
          const routeName = route.name;
          if (route.children) {
            const [parentName, parentName2] = route.path.split('/');
            const nameKey = camelCase(parentName || parentName2 || 'index');
            routesObjectString += `${nameKey}:{`;
            routeObject[nameKey] = {};
            route.children.map((r) => recursiveTypedRoutes(r, level + 1, routeObject[nameKey]));
            routesObjectString += '},';
          } else if (routeName) {
            let splitted = routeName.split('-');
            splitted = splitted.slice(level, splitted.length);
            const keyName = camelCase(splitted.join('-')) || 'index';
            routesObjectString += `'${keyName}': '${routeName}',`;
            routeObject[keyName] = routeName;
          }
        };
        routes.map((r) => recursiveTypedRoutes(r, 0, routeObjectJs));
        routesObjectString += '}';

        const templateRoutes = `export const ${routesObjectName} = ${routesObjectString};`;

        await saveRoutesFiles(filePath, templateRoutes);
      });

      // Typed router
    } catch (e) {
      console.error(chalk.red('Error while generating routes definitions model'), '\n' + e);
    }
  });
};

module.exports = typedRouterModule;
module.exports.meta = require('../package.json');
