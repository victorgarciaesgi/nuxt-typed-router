import { camelCase } from 'lodash';
import chalk from 'chalk';
import { Module } from '@nuxt/types';
import { NuxtTypedRouterOptions, ParamDecl, RouteParamsDecl } from './types';
import { NuxtRouteConfig } from '@nuxt/types/config/router';
import { saveRoutesFiles } from './save';
import { extractMatchingSiblings, extractUnMatchingSiblings, transformRouteNames } from './utils';
import { ModuleThis } from '@nuxt/types/config/module';
import { defineNuxtModule } from '@nuxt/kit';
import { resolve } from 'path';

declare module '@nuxt/types/config/router' {
  interface NuxtRouteConfig {
    file?: string;
  }
}

const paramRegxp = /:(\w+)/;

const typedRouterModule: Module<NuxtTypedRouterOptions> = function (moduleOptions) {
  const {
    filePath = `${this.options.srcDir}/__routes.ts`,
    routesObjectName = 'routerPagesNames',
    stripAtFromName = false,
  }: NuxtTypedRouterOptions = { ...this.options.typedRouter, ...moduleOptions };
  const folderPathes = filePath.split('/');
  folderPathes.splice(folderPathes.length - 1, 1);
  const definitionFilePath = folderPathes.join('/') + `/typed-router.d.ts`;
  this.addPlugin({
    src: resolve(__dirname, './templates/typed-router.js'),
    fileName: 'typed-router.js',
  });
  this.nuxt.hook('build:before', () =>
    routeHook.call(this, filePath, routesObjectName, stripAtFromName, definitionFilePath)
  );
  this.nuxt.hook('build:extendRoutes', () =>
    routeHook.call(this, filePath, routesObjectName, stripAtFromName, definitionFilePath)
  );
};

function routeHook(
  this: ModuleThis,
  filePath: string,
  routesObjectName: string,
  stripAtFromName: boolean,
  definitionFilePath: string
) {
  try {
    // Redirect with @
    this.extendRoutes(async (routes: NuxtRouteConfig[]) => {
      transformRouteNames(routes, stripAtFromName);

      let routesObjectString = '{';
      let routesObjectDecl = '{';
      let routesList: string[] = [];
      let routesParams: RouteParamsDecl[] = [];
      let routeObjectJs: Record<string, any> = {};

      const recursiveTypedRoutes = (
        route: NuxtRouteConfig,
        level: number,
        routeObject: Record<string, any>,
        siblings?: NuxtRouteConfig[],
        parentName?: string,
        previousParams?: ParamDecl[]
      ) => {
        const matchingSiblings = extractMatchingSiblings(route, siblings);
        const haveMatchingSiblings = !!matchingSiblings?.length && route.path !== '/';
        const chunkArray = route.file?.split('/') ?? [];
        const lastChunkArray = chunkArray[chunkArray?.length - 1].split('.vue')[0];
        const isRootSibling = lastChunkArray === 'index';
        if (
          (route.children?.length && !haveMatchingSiblings) ||
          (!route.children?.length && haveMatchingSiblings && isRootSibling)
        ) {
          let childrenChunks = haveMatchingSiblings ? matchingSiblings : route.children;
          const splittedPaths = route.path.split('/');
          const parentPath = splittedPaths[splittedPaths.length - 1];
          const nameKey = camelCase(parentPath || 'index');
          routesObjectString += `${nameKey}:{`;
          routesObjectDecl += `${nameKey}:{`;
          routeObject[nameKey] = {};

          const params: string[] = route.path.match(paramRegxp) ?? [];
          params?.shift();
          let allMergedParams = params.map((m) => ({ key: m, type: 'string | number' }));
          if (previousParams?.length) {
            allMergedParams = allMergedParams.concat(previousParams);
          }
          childrenChunks?.map((r) =>
            recursiveTypedRoutes(
              r,
              level + 1,
              routeObject[nameKey],
              extractUnMatchingSiblings(route, siblings),
              nameKey,
              allMergedParams
            )
          );
          routesObjectString += '},';
          routesObjectDecl += '},';
        } else {
          if (route.name) {
            let splitted: string[] = [];
            splitted = route.name.split('-');
            splitted = splitted.slice(level, splitted.length);
            if (splitted[0] === parentName) {
              splitted.splice(0, 1);
            }

            const keyName = route.path === '' ? 'index' : camelCase(splitted.join('-')) || 'index';
            routesObjectString += `'${keyName}': '${route.name}' as const,`;
            routesObjectDecl += `'${keyName}': '${route.name}',`;
            routesList.push(route.name);
            const params: string[] = route.path.match(paramRegxp) ?? [];
            params?.shift();
            let allMergedParams = params?.map((m) => ({ key: m, type: 'string | number' }));
            if (previousParams?.length) {
              allMergedParams = allMergedParams.concat(previousParams);
            }
            routesParams.push({
              name: route.name,
              params: allMergedParams,
            });

            routeObject[keyName] = route.name;
          }
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
      routesObjectDecl += '}';

      const signature = `/** 
      * Generated by nuxt-typed-router. Do not modify 
      * */`;

      const typedRouteListExport = `export type TypedRouteList = ${routesList
        .map((m) => `'${m}'`)
        .join('|\n')}`;
      const typedRouteParamsExport = `export type TypedRouteParams = {
        ${routesParams
          .map(
            ({ name, params }) =>
              `"${name}": ${
                params.length
                  ? `{
              ${params.map((p) => `"${p.key}"?: ${p.type}`).join(',\n')}
            }`
                  : 'never'
              }`
          )
          .join(',\n')}
      }`;

      // Runtime file
      const templateRoutesRuntime = `
      ${signature}

      export const ${routesObjectName} = ${routesObjectString};
      
      ${typedRouteListExport}

      ${typedRouteParamsExport}
      `;

      // Definition file
      const templateRoutesDeclaration = `
      ${signature}
      import type {
        NavigationFailure,
        RouteLocation,
        RouteLocationNormalized,
        RouteLocationNormalizedLoaded,
        RouteLocationOptions,
        RouteQueryAndHash,
        Router,
      } from 'vue-router';

      ${typedRouteListExport}

      ${typedRouteParamsExport}

       type TypedRouteParamsStructure = {
        [K in TypedRouteList]: Record<string, string | number> | never;
      };
      
      type TypedLocationAsRelativeRaw<T extends TypedRouteList> = {
        name?: T;
        params?: TypedRouteParams[T];
      };
      
      type TypedRouteLocationRaw<T extends TypedRouteList> = RouteQueryAndHash &
        TypedLocationAsRelativeRaw<T> &
        RouteLocationOptions;
      
      interface TypedRouter {
        /**
         * Remove an existing route by its name.
         *
         * @param name - Name of the route to remove
         */
        removeRoute(name: TypedRouteList): void;
        /**
         * Checks if a route with a given name exists
         *
         * @param name - Name of the route to check
         */
        hasRoute(name: TypedRouteList): boolean;
        /**
         * Returns the {@link RouteLocation | normalized version} of a
         * {@link RouteLocationRaw | route location}. Also includes an \`href\` property
         * that includes any existing \`base\`. By default the \`currentLocation\` used is
         * \`route.currentRoute\` and should only be overriden in advanced use cases.
         *
         * @param to - Raw route location to resolve
         * @param currentLocation - Optional current location to resolve against
         */
        resolve<T extends TypedRouteList>(
          to: TypedRouteLocationRaw<T>,
          currentLocation?: RouteLocationNormalizedLoaded
        ): RouteLocation & {
          href: string;
        };
        /**
         * Programmatically navigate to a new URL by pushing an entry in the history
         * stack.
         *
         * @param to - Route location to navigate to
         */
        push<T extends TypedRouteList>(
          to: TypedRouteLocationRaw<T>
        ): Promise<NavigationFailure | void | undefined>;
        /**
         * Programmatically navigate to a new URL by replacing the current entry in
         * the history stack.
         *
         * @param to - Route location to navigate to
         */
        replace<T extends TypedRouteList>(
          to: TypedRouteLocationRaw<T>
        ): Promise<NavigationFailure | void | undefined>;
      }
      
      declare module 'nuxt3/dist/app/nuxt' {
        export interface NuxtApp {
          $typedRouter: TypedRouter
        }
      }

      declare module '@vue/runtime-core' {
        interface ComponentCustomProperties {
          $typedRouter: TypedRouter
        }
      }
      declare module 'nuxt-typed-router' {
        export declare const useTypedRouter: () => TypedRouter;
      }
      `;

      await saveRoutesFiles(filePath, templateRoutesRuntime);
      await saveRoutesFiles(definitionFilePath, templateRoutesDeclaration, 'declaration');
    });

    // Typed router
  } catch (e) {
    console.error(chalk.red('Error while generating routes definitions model'), '\n' + e);
  }
}

module.exports = typedRouterModule;
module.exports.meta = require('../package.json');
