import { RouteParamsDecl } from '../../../../types';
import {
  createTypedRouteListExport,
  createResolvedTypedRouteNamedMapperExport,
  createTypedRouteNamedMapperExport,
  createTypedRouteParamsExport,
} from './routesTypes.runtime';
import { watermarkTemplate } from '../../templates';

export function createRuntimeRoutesFile({
  routesList,
  routesObjectTemplate,
  routesDeclTemplate,
  routesParams,
}: {
  routesList: string[];
  routesObjectTemplate: string;
  routesDeclTemplate: string;
  routesParams: RouteParamsDecl[];
}): string {
  return `
    ${watermarkTemplate}

    export const routesNames = ${routesObjectTemplate};

    ${createTypedRouteListExport(routesList)}

    export type RouteListDecl = ${routesDeclTemplate};

    /** 
     * Routes params are only required for the exact targeted route name,
     * vue-router behaviour allow to navigate between children routes without the need to provide all the params every time.
     * So we can't enforce params when navigating between routes, only a \`[xxx].vue\` page will have required params in the type definition
     * 
     * 
     * */
    ${createTypedRouteParamsExport(routesParams)}

    ${createTypedRouteNamedMapperExport(routesParams)}

    ${createResolvedTypedRouteNamedMapperExport(routesParams)}
  `;
}
