import { camelCase } from 'lodash';
import chalk from 'chalk';
import { Module } from '@nuxt/types';
import { NuxtTypedRouterOptions } from './types';
import { NuxtRouteConfig } from '@nuxt/types/config/router';
import { saveRoutesFiles } from './save';
import {
  extractChunkMain,
  extractChunkRouteName,
  extractMatchingSiblings,
  extractUnMatchingSiblings,
  transformRouteNames,
} from './utils';

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
          routeObject: Record<string, any>,
          siblings?: NuxtRouteConfig[],
          parentName?: string,
          hadMatching?: boolean
        ) => {
          const routeName = route.name;
          const matchingSiblings = extractMatchingSiblings(route, siblings);
          const haveMatchingSiblings = !!matchingSiblings?.length;

          if (
            (route.children && !haveMatchingSiblings) ||
            (!route.children && haveMatchingSiblings)
          ) {
            let childrenChunks = haveMatchingSiblings ? matchingSiblings : route.children;
            const splittedPaths = route.path.split('/');
            const parentPath = splittedPaths[splittedPaths.length - 1];
            const nameKey = camelCase(parentPath || 'index');
            routesObjectString += `${nameKey}:{`;
            routeObject[nameKey] = {};
            childrenChunks?.map((r) =>
              recursiveTypedRoutes(
                r,
                level + 1,
                routeObject[nameKey],
                extractUnMatchingSiblings(route, siblings),
                nameKey,
                haveMatchingSiblings
              )
            );
            routesObjectString += '},';
          } else if (routeName) {
            let splitted = routeName.split('-');
            splitted = splitted.slice(level, splitted.length);
            if (splitted[0] === parentName) {
              splitted.splice(0, 1);
            }
            const keyName = route.path === '' ? 'index' : camelCase(splitted.join('-')) || 'index';
            routesObjectString += `'${keyName}': '${routeName}',`;
            routeObject[keyName] = routeName;
          }
        };
        routes.map((r) =>
          recursiveTypedRoutes(
            r,
            0,
            routeObjectJs,
            routes?.filter((f) => f.path !== r.path)
          )
        );
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
