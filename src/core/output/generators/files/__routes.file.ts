import { GeneratorOutput, RouteParamsDecl } from '../../../../types';
import { destructurePath } from '../../../parser/params';
import {
  createRoutePathByNameBlock,
  createRoutePathSchema,
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

  const pathElements = filteredRoutesPaths
    .filter((f) => f.path && f.path !== '/')
    .map((route) => {
      return route.path
        .split('/')
        .filter((f) => f.length)
        .map(destructurePath);
    });
  console.log(JSON.stringify(pathElements));

  return /* typescript */ `
    ${createRoutesNamesListExport(filteredRoutesList)}
    export type WithoutBracket<T extends string> = T extends \`:\${string}\` ? never : T;

    ${createRoutePathSchema(filteredRoutesPaths)};

    export type RoutePath = RoutePathByName[keyof RoutePathByName] | RoutePathSchema;

    ${createRoutePathByNameBlock(filteredRoutesPaths)}

    ${createRoutesParamsRecordExport(filteredRoutesParams)}
    
    ${createRoutesParamsRecordResolvedExport(filteredRoutesParams)}

    ${createRoutesNamedLocationsExport(filteredRoutesParams)}

    ${createRoutesNamedLocationsResolvedExport(filteredRoutesParams)}

    export type RoutesNamesListRecord = ${routesDeclTemplate};

    export const routesNames = ${routesObjectTemplate};
  `;
}
