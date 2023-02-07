import { GeneratorOutput, RouteParamsDecl } from '../../../../types';
import { destructurePath, DestructuredPath } from '../../../parser/params';
import {
  createRoutePathByNameBlock,
  createRoutePathSchema,
  createRoutesNamedLocationsExport,
  createRoutesNamedLocationsResolvedExport,
  createRoutesNamesListExport,
  createRoutesParamsRecordExport,
  createRoutesParamsRecordResolvedExport,
  createValidatePathType,
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

  return /* typescript */ `
    ${createRoutesNamesListExport(filteredRoutesList)}
    export type WithoutBracket<T extends string> = T extends \`:\${string}\` ? never : T;

    ${createRoutesParamsRecordExport(filteredRoutesParams)}
    
    ${createRoutesParamsRecordResolvedExport(filteredRoutesParams)}

    ${createRoutesNamedLocationsExport(filteredRoutesParams)}

    ${createRoutesNamedLocationsResolvedExport(filteredRoutesParams)}

    export type RoutesNamesListRecord = ${routesDeclTemplate};

    export const routesNames = ${routesObjectTemplate};
  `;
}
