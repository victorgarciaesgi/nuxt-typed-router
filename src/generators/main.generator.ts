import { NuxtRouteConfig } from '@nuxt/types/config/router';
import { camelCase } from 'lodash';
import { GeneratorOutput, ParamDecl, RouteParamsDecl } from '../types';
import {
  extractRouteParamsFromPath,
  extractUnMatchingSiblings,
  extractMatchingSiblings,
} from '../utils';

export async function constructRouteMap(routesConfig: NuxtRouteConfig[]): Promise<GeneratorOutput> {
  try {
    let routesObjectTemplate = '{';
    let routesDeclTemplate = '{';
    let routesList: string[] = [];
    let routesParams: RouteParamsDecl[] = [];

    startGeneratorProcedure({
      output: { routesObjectTemplate, routesDeclTemplate, routesList, routesParams },
      routesConfig,
    });

    return { routesObjectTemplate, routesDeclTemplate, routesList, routesParams };
  } catch (e) {
    return Promise.reject(e);
  }
}

// -----
type StartGeneratorProcedureParams = {
  output: GeneratorOutput;
  routesConfig: NuxtRouteConfig[];
};
export function startGeneratorProcedure({
  output,
  routesConfig,
}: StartGeneratorProcedureParams): void {
  const rootSiblingsRoutes = routesConfig.map((route) => route.path);
  routesConfig.forEach((route) =>
    walkThoughRoutes({ route, level: 0, output, siblings: rootSiblingsRoutes })
  );
}

// -----
type WalkThoughRoutesParams = {
  route: NuxtRouteConfig;
  level: number;
  siblings?: NuxtRouteConfig[];
  parentName?: string;
  previousParams?: ParamDecl[];
  output: {
    routesObjectTemplate: string;
    routesDeclTemplate: string;
    routesList: string[];
    routesParams: RouteParamsDecl[];
  };
};
/** Mutates the output object with generated routes */
export function walkThoughRoutes({
  route,
  level,
  siblings,
  parentName,
  previousParams,
  output,
}: WalkThoughRoutesParams) {
  //
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

    // Output
    output.routesObjectTemplate += `${nameKey}:{`;
    output.routesDeclTemplate += `${nameKey}:{`;

    // Recursive walk though children
    const allRouteParams = extractRouteParamsFromPath(route.path, previousParams);
    childrenChunks?.map((routeConfig) =>
      walkThoughRoutes({
        route: routeConfig,
        level: level + 1,
        siblings: extractUnMatchingSiblings(route, siblings),
        parentName: nameKey,
        previousParams: allRouteParams,
        output,
      })
    );
    // Output
    output.routesObjectTemplate += '},';
    output.routesDeclTemplate += '},';
  } else {
    if (route.name) {
      let splitted: string[] = [];
      splitted = route.name.split('-');
      splitted = splitted.slice(level, splitted.length);
      if (splitted[0] === parentName) {
        splitted.splice(0, 1);
      }

      const keyName = route.path === '' ? 'index' : camelCase(splitted.join('-')) || 'index';

      // Output
      output.routesObjectTemplate += `'${keyName}': '${route.name}' as const,`;
      output.routesDeclTemplate += `'${keyName}': '${route.name}',`;
      output.routesList.push(route.name);
      const allRouteParams = extractRouteParamsFromPath(route.path, previousParams);
      output.routesParams.push({
        name: route.name,
        params: allRouteParams,
      });
    }
  }
}
