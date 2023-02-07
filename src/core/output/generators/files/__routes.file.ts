import { GeneratorOutput } from '../../../../types';
import {
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
