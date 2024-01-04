import type { NuxtPage } from '@nuxt/schema';
import type { GeneratorOutput, RouteParamsDecl, RoutePathsDecl } from '../../types';
import { isItemLast } from '../../utils';
import { walkThoughRoutes } from './walkRoutes';
import { moduleOptionStore } from '../config';
import { modifyPrefixForLocaleRouteName } from './i18n.modifiers';

export function constructRouteMap(routesConfig: NuxtPage[]): GeneratorOutput {
  try {
    const { i18nOptions } = moduleOptionStore;
    let routesObjectTemplate = '{';
    let routesDeclTemplate = '{';
    let routesList: string[] = [];
    let routesParams: RouteParamsDecl[] = [];
    let routesPaths: RoutePathsDecl[] = [];

    const output = {
      routesObjectTemplate,
      routesDeclTemplate,
      routesList,
      routesParams,
      routesPaths,
    };

    startGenerator({
      output,
      routesConfig,
    });

    if (i18nOptions?.strategy === 'prefix') {
      output.routesList = [
        ...new Set(
          output.routesList.map((m) => modifyPrefixForLocaleRouteName(m)).filter((f) => !!f)
        ),
      ];
      output.routesParams = [
        ...new Set(
          output.routesParams
            .map((m) => {
              return {
                ...m,
                name: modifyPrefixForLocaleRouteName(m.name),
              };
            })
            .filter((f) => !!f)
        ),
      ];
      console.log(output.routesList);
    }

    return output;
  } catch (e) {
    throw new Error(`Generation failed: ${e}`);
  }
}

type StartGeneratorParams = {
  output: GeneratorOutput;
  routesConfig: NuxtPage[];
};

export function startGenerator({ output, routesConfig }: StartGeneratorParams): void {
  routesConfig.forEach((route, index) => {
    const rootSiblingsRoutes = routesConfig.filter((rt) => rt.path !== route.path);
    walkThoughRoutes({
      route,
      level: 0,
      output,
      siblings: rootSiblingsRoutes,
      isLast: isItemLast(routesConfig, index),
      isLocale: false,
    });
  });
  output.routesObjectTemplate += '}';
  output.routesDeclTemplate += '}';
}
