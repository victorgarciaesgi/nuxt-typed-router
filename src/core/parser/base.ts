import { NuxtPage } from '@nuxt/schema';
import { GeneratorOutput, RouteParamsDecl } from '../../types';
import { isItemLast } from '../../utils';
import { walkThoughRoutes } from './walkRoutes';

export function constructRouteMap(routesConfig: NuxtPage[]): GeneratorOutput {
  try {
    let routesObjectTemplate = '{';
    let routesDeclTemplate = '{';
    let routesList: string[] = [];
    let routesParams: RouteParamsDecl[] = [];

    const output = { routesObjectTemplate, routesDeclTemplate, routesList, routesParams };

    startGenerator({
      output,
      routesConfig,
    });
    return output;
  } catch (e) {
    throw new Error('Generation failed');
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
    });
  });
  output.routesObjectTemplate += '}';
  output.routesDeclTemplate += '}';
}
