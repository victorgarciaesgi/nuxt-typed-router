import { NuxtRouteConfig } from '@nuxt/types/config/router';
import { camelCase } from 'lodash-es';
import { GeneratorOutput, ParamDecl, RouteParamsDecl } from '../types';
import {
  extractMatchingSiblings,
  extractRouteParamsFromPath,
  extractUnMatchingSiblings,
} from '../utils';

function isItemLast(array: any[], index: number) {
  return index === array.length - 1;
}

export function constructRouteMap(routesConfig: NuxtRouteConfig[]): GeneratorOutput {
  try {
    let routesObjectTemplate = '{';
    let routesDeclTemplate = '{';
    let routesList: string[] = [];
    let routesParams: RouteParamsDecl[] = [];

    const output = { routesObjectTemplate, routesDeclTemplate, routesList, routesParams };

    startGeneratorProcedure({
      output,
      routesConfig,
    });

    return output;
  } catch (e) {
    throw new Error('Generation failed');
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
  routesConfig.forEach((route, index) => {
    const rootSiblingsRoutes = routesConfig.filter((rt) => rt.chunkName !== route.chunkName);
    walkThoughRoutes({
      route,
      level: 0,
      output,
      siblings: rootSiblingsRoutes,
      isLast: isItemLast(routesConfig, index),
    });
  });
  output.routesObjectTemplate += '}';
  output.routesDeclTemplate += '}';
}

// -----
type WalkThoughRoutesParams = {
  route: NuxtRouteConfig;
  level: number;
  siblings?: NuxtRouteConfig[];
  parentName?: string;
  previousParams?: ParamDecl[];
  output: GeneratorOutput;
  isLast: boolean;
};
/** Mutates the output object with generated routes */
export function walkThoughRoutes({
  route,
  level,
  siblings,
  parentName,
  previousParams,
  output,
  isLast,
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
    output.routesDeclTemplate += `"${nameKey}":{`;

    // Recursive walk though children
    const allRouteParams = extractRouteParamsFromPath(route.path, previousParams);
    childrenChunks?.map((routeConfig, index) =>
      walkThoughRoutes({
        route: routeConfig,
        level: level + 1,
        siblings: extractUnMatchingSiblings(route, siblings),
        parentName: nameKey,
        previousParams: allRouteParams,
        output,
        isLast: isItemLast(childrenChunks, index),
      })
    );
    // Output
    output.routesObjectTemplate += '},';
    output.routesDeclTemplate += `}${isLast ? '' : ','}`;
  } else if (route.name) {
    let splitted: string[] = [];
    splitted = route.name.split('-');
    splitted = splitted.slice(level, splitted.length);
    if (splitted[0] === parentName) {
      splitted.splice(0, 1);
    }

    const keyName = route.path === '' ? 'index' : camelCase(splitted.join('-')) || 'index';

    // Output
    output.routesObjectTemplate += `'${keyName}': '${route.name}' as const,`;
    output.routesDeclTemplate += `"${keyName}": "${route.name}"${isLast ? '' : ','}`;
    output.routesList.push(route.name);
    const allRouteParams = extractRouteParamsFromPath(route.path, previousParams);
    output.routesParams.push({
      name: route.name,
      params: allRouteParams,
    });
  }
}
