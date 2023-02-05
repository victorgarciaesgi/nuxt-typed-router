import { GeneratorOutput, RouteParamsDecl } from '../../../../types';
import {
  createRoutePathByNameBlock,
  createRoutesNamedLocationsExport,
  createRoutesNamedLocationsResolvedExport,
  createRoutesNamesListExport,
  createRoutesParamsRecordExport,
  createRoutesParamsRecordResolvedExport,
} from '../blocks';

export function createRoutesTypesFile({
  routesList,
  routesObjectTemplate,
  routesDeclTemplate,
  routesParams,
  routesPaths,
}: GeneratorOutput): string {
  const filteredRoutesList = routesList.filter(
    (routeName, index) => routesList.indexOf(routeName) === index
  );

  const filteredRoutesParams = routesParams.filter(
    (route, index) => routesParams.findIndex((r) => route.name === r.name) === index
  );

  const filteredRoutesPaths = routesPaths.filter(
    (route, index) => routesPaths.findIndex((r) => route.name === r.name) === index
  );

  return /* typescript */ `
    ${createRoutesNamesListExport(filteredRoutesList)}

    export type RoutePath = RoutePathByName[keyof RoutePathByName];

    ${createRoutePathByNameBlock(filteredRoutesPaths)}

    ${createRoutesParamsRecordExport(filteredRoutesParams)}
    
    ${createRoutesParamsRecordResolvedExport(filteredRoutesParams)}

    ${createRoutesNamedLocationsExport(filteredRoutesParams)}

    ${createRoutesNamedLocationsResolvedExport(filteredRoutesParams)}

    export type RoutesNamesListRecord = ${routesDeclTemplate};

    export const routesNames = ${routesObjectTemplate};
  `;
}
