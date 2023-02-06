import { NuxtPage } from '@nuxt/schema';
import { camelCase } from 'lodash-es';
import { GeneratorOutput, ParamDecl } from '../../types';
import { isItemLast } from '../../utils';
import { extractRouteParamsFromPath, replaceParamsFromPathDecl, destructurePath } from './params';
import { extractMatchingSiblings, extractUnMatchingSiblings } from './extractChunks';

type WalkThoughRoutesParams = {
  route: NuxtPage;
  level: number;
  siblings?: NuxtPage[];
  parent?: NuxtPage;
  previousParams?: ParamDecl[];
  output: GeneratorOutput;
  isLast: boolean;
};

function createKeyedName(route: NuxtPage): string {
  const splittedPaths = route.path.split('/');
  const parentPath = splittedPaths[splittedPaths.length - 1];
  const nameKey = camelCase(parentPath || 'index');

  return nameKey;
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

function hasi18nSibling(
  source: Array<Record<string, any> & { name?: string; path: string }>,
  route: NuxtPage
) {
  return source.some((rt) => {
    return (
      route.name?.match(new RegExp(`^(${rt.name})___[a-zA-Z]+`, 'g')) ||
      (rt.path !== '/' && route.path?.match(new RegExp(`/?[a-zA-Z]+${rt.path}`, 'g')))
    );
  });
}

/** Mutates the output object with generated routes */
export function walkThoughRoutes({
  route,
  level,
  siblings,
  parent,
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

  // Filter routes added by i18n module
  if (!hasi18nSibling(output.routesPaths, route)) {
    const newPath = `${parent?.path ?? ''}${
      route.path.startsWith('/') ? route.path : `/${route.path}`
    }`;
    output.routesPaths.push({
      name: route.name,
      typePath: replaceParamsFromPathDecl(newPath),
      path: newPath,
    });

    if (
      (route.children?.length && !haveMatchingSiblings) ||
      (!route.children?.length && haveMatchingSiblings && isRootSibling)
    ) {
      // - Route with children

      let childrenChunks = haveMatchingSiblings ? matchingSiblings : route.children;
      let nameKey = createKeyedName(route);
      const allRouteParams = extractRouteParamsFromPath(route.path, false, previousParams);

      const newRoute = { ...route, name: nameKey, path: newPath } satisfies NuxtPage;

      // Output
      output.routesObjectTemplate += `${nameKey}:{`;
      output.routesDeclTemplate += `"${nameKey}":{`;

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
        })
      );
      // Output
      output.routesObjectTemplate += '},';
      output.routesDeclTemplate += `}${isLast ? '' : ','}`;
    } else if (route.name) {
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
}
