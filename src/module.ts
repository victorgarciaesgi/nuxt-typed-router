// @ts-check
import fs from 'fs';
import * as prettier from 'prettier';
import { camelCase } from 'lodash';
import chalk from 'chalk';
import path from 'path';
import logSymbols from 'log-symbols';
import { Module, NuxtConfig } from '@nuxt/types';
import { NuxtTypedRouterOptions } from 'types';
import { NuxtRouteConfig } from '@nuxt/types/config/router';
import './templates/nuxt-typed-router';

const typedRouterModule: Module<NuxtTypedRouterOptions> = function (moduleOptions) {
  const {
    filePath = `${this.options.srcDir}/__routes.js`,
    routesObjectName = 'routerPagesNames',
    stripAtFromName = false,
  }: NuxtTypedRouterOptions = { ...this.options.typedRouter, ...moduleOptions };

  this.nuxt.hook('build:extendRoutes', async (routes: NuxtRouteConfig[]) => {
    try {
      // Redirect with @
      this.extendRoutes(async (existingRoutes: NuxtRouteConfig[]) => {
        let formatedRoutes;
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

        let routesObject = '{';

        const recursiveTypedRoutes = (route: NuxtRouteConfig, level: number) => {
          const routeName = route.name;
          if (route.children) {
            const [parentName, parentName2] = route.path.split('/');
            routesObject += `${camelCase(parentName || parentName2 || 'index')}:{`;
            route.children.map((r) => recursiveTypedRoutes(r, level + 1));
            routesObject += '},';
          } else if (routeName) {
            let splitted = routeName.split('-');
            splitted = splitted.slice(level, splitted.length);
            routesObject += `'${camelCase(splitted.join('-')) || 'index'}': '${routeName}',`;
          }
        };
        formatedRoutes.map((r) => recursiveTypedRoutes(r, 0));
        routesObject += '}';

        const template = `export const ${routesObjectName} = ${routesObject};`;
        const templateForLocal = `export default ${routesObject};`;

        try {
          let prettierFoundOptions = await prettier.resolveConfig(process.cwd());

          if (!prettierFoundOptions) {
            prettierFoundOptions = require('../.prettierrc');
          }

          const formatedModelsFile = prettier.format(template, {
            ...prettierFoundOptions,
            parser: 'typescript',
          });
          const savePath = path.resolve(process.cwd(), filePath);
          await fs.writeFileSync(savePath, formatedModelsFile);
          await fs.writeFileSync(path.resolve(__dirname, './generated.js'), templateForLocal);
          console.log(
            logSymbols.success,
            `Route definition file generated at ${chalk.blue(savePath)}`
          );

          this.addPlugin({
            src: path.resolve(__dirname, './templates/nuxt-typed-router.js'),
          });
        } catch (e) {
          console.error(chalk.red('Error while saving route definitions file'), '\n' + e);
        }

        return formatedRoutes;
      });
    } catch (e) {
      console.error(chalk.red('Error while generating routes definitions model'), '\n' + e);
    }
  });
};

module.exports = typedRouterModule;
module.exports.meta = require('../package.json');
