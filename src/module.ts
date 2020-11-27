// @ts-check
import fs from 'fs';
import * as prettier from 'prettier';
import { camelCase, template } from 'lodash';
import chalk from 'chalk';
import path from 'path';
import logSymbols from 'log-symbols';
import { Module, NuxtConfig } from '@nuxt/types';
import { NuxtTypedRouterOptions } from './types';
import { NuxtRouteConfig } from '@nuxt/types/config/router';

const typedRouterModule: Module<NuxtTypedRouterOptions> = function (moduleOptions) {
  const {
    filePath = `${this.options.srcDir}/__routes.js`,
    routesObjectName = 'routerPagesNames',
    stripAtFromName = false,
  }: NuxtTypedRouterOptions = { ...this.options.typedRouter, ...moduleOptions };

  this.nuxt.hook('build:extendRoutes', async (existingRoutes: NuxtRouteConfig[]) => {
    try {
      // Redirect with @
      let formatedRoutes: NuxtRouteConfig[] = [];
      const recursiveMatch = (route: NuxtRouteConfig, parent?: NuxtRouteConfig) => {
        if (route.path && route.path.startsWith('@') && !!parent) {
          route.path = route.path.split('@')[1];
          if (stripAtFromName && route.name) {
            const [left, right] = route.name?.split('@');
            route.name = `${left}${right}`;
          }
          const parentsChildren = parent.children;
          if (parentsChildren) {
            let defaultName = null;
            if (route.name) {
              defaultName = route.name;
            } else if (route.children) {
              const child = route.children.find((f: any) => f.path === '');
              if (child) {
                defaultName = child.name;
              }
            } else {
              defaultName = null;
            }
            parentsChildren.push({
              path: '',
              name: `${parent.name}-index`,
              redirect: {
                ...(defaultName && { name: defaultName }),
                ...(!defaultName && { path: route.path }),
              },
            });
          }
        }
        if (route.children) {
          route.children.forEach((child) => recursiveMatch(child, route));
        }
      };
      existingRoutes.map((route) => recursiveMatch(route));
      formatedRoutes = existingRoutes;

      // Typed router

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
      formatedRoutes.map((r) => recursiveTypedRoutes(r, 0, routeObjectJs));
      routesObjectString += '}';

      const templateRoutes = `export const ${routesObjectName} = ${routesObjectString};`;

      try {
        let prettierFoundOptions = await prettier.resolveConfig(process.cwd());

        if (!prettierFoundOptions) {
          prettierFoundOptions = require('../.prettierrc');
        }

        const formatedModelsFile = prettier.format(templateRoutes, {
          ...prettierFoundOptions,
          parser: 'typescript',
        });
        const savePath = path.resolve(process.cwd(), filePath);
        await fs.writeFileSync(savePath, formatedModelsFile);
        this.extendRoutes(() => formatedRoutes);
        console.log(
          logSymbols.success,
          `Route definition file generated at ${chalk.blue(savePath)}`
        );
      } catch (e) {
        console.error(chalk.red('Error while saving route definitions file'), '\n' + e);
      }
    } catch (e) {
      console.error(chalk.red('Error while generating routes definitions model'), '\n' + e);
    }
  });
};

module.exports = typedRouterModule;
module.exports.meta = require('../package.json');
