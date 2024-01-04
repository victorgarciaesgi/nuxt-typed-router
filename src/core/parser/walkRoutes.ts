import type { NuxtPage } from '@nuxt/schema';
import { camelCase } from 'lodash-es';
import type { GeneratorOutput, ParamDecl } from '../../types';
import { isItemLast } from '../../utils';
import { moduleOptionStore } from '../config';
import { extractUnMatchingSiblings } from './extractChunks';
import { is18Sibling, modifyRoutePrefixDefaultIfI18n } from './i18n.modifiers';
import { extractRouteParamsFromPath } from './params';

type WalkThoughRoutesParams = {
  route: NuxtPage;
  level: number;
  siblings?: NuxtPage[];
  parent?: NuxtPage;
  previousParams?: ParamDecl[];
  output: GeneratorOutput;
  isLast: boolean;
  isLocale: boolean;
};

function createKeyedName(route: NuxtPage, parent?: NuxtPage): string {
  const splittedPaths = route.path.split('/');
  const parentPath = splittedPaths[splittedPaths.length - 1];
  if (parent) {
    return camelCase(parentPath || 'index');
  } else {
    return camelCase(route.path.split('/').join('-')) || 'index';
  }
}

function createNameKeyFromFullName(route: NuxtPage, level: number, parentName?: string): string {
  let splitted: string[] = [];
  splitted = route.name?.split('-') ?? [];
  splitted = splitted.slice(level, splitted.length);
  if (splitted[0] === parentName) {
    splitted.splice(0, 1);
  }

  const keyName = route.path === '' ? 'index' : camelCase(splitted.join('-')) || 'index';

  return keyName;
}

/** Mutates the output object with generated routes */
export function walkThoughRoutes({
  route: _route,
  level,
  siblings,
  parent,
  previousParams,
  output,
  isLast,
  isLocale,
}: WalkThoughRoutesParams) {
  const route = modifyRoutePrefixDefaultIfI18n(_route);
  const isLocaleRoute = isLocale || is18Sibling(route.path);

  if (route.file && moduleOptionStore.resolvedIgnoredRoutes.includes(route.file)) {
    return;
  }

  const newPath = `${parent?.path ?? ''}${
    route.path.startsWith('/') || parent?.path === '/' ? route.path : `/${route.path}`
  }`;

  if (parent?.path !== '/' || newPath !== parent?.path) {
    output.routesPaths.push({
      name: route.name,
      path: newPath,
      isLocale: isLocaleRoute,
    });
  }

  // Filter routes added by i18n module
  if (route.children?.length) {
    // - Route with children

    let childrenChunks = route.children;
    let nameKey = createKeyedName(route, parent);
    const allRouteParams = extractRouteParamsFromPath(route.path, false, previousParams);

    const newRoute = { ...route, name: nameKey, path: newPath } satisfies NuxtPage;

    if (!isLocaleRoute) {
      // Output
      output.routesObjectTemplate += `${nameKey}:{`;
      output.routesDeclTemplate += `"${nameKey}":{`;
    }

    // Recursive walk though children
    childrenChunks?.map((routeConfig, index) =>
      walkThoughRoutes({
        route: routeConfig,
        level: level + 1,
        siblings: extractUnMatchingSiblings(route, siblings),
        parent: newRoute,
        previousParams: allRouteParams,
        output,
        isLast: isItemLast(childrenChunks, index),
        isLocale: isLocaleRoute,
      })
    );
    if (!isLocaleRoute) {
      output.routesObjectTemplate += '},';
      output.routesDeclTemplate += `}${isLast ? '' : ','}`;
    }

    // Output
  } else if (route.name && !isLocaleRoute) {
    // - Single route

    let keyName = createNameKeyFromFullName(route, level, parent?.name);

    output.routesObjectTemplate += `'${keyName}': '${route.name}' as const,`;
    output.routesDeclTemplate += `"${keyName}": "${route.name}"${isLast ? '' : ','}`;
    output.routesList.push(route.name);

    // Params
    const isIndexFileForRouting = route.path === '';
    const allRouteParams = extractRouteParamsFromPath(
      route.path,
      isIndexFileForRouting,
      previousParams
    );
    output.routesParams.push({
      name: route.name,
      params: allRouteParams,
    });
  }
}
