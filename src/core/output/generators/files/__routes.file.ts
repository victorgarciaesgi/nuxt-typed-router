import { RouteParamsDecl } from '../../../../types';
import {
  createRoutesNamedLocationsExport,
  createRoutesNamedLocationsResolvedExport,
  createRoutesNamesListExport,
  createRoutesParamsRecordExport,
} from '../blocks';
export function createRoutesTypesFile({
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
  return /* typescript */ `
    ${createRoutesNamesListExport(routesList)}

    ${createRoutesParamsRecordExport(routesParams)}

    ${createRoutesNamedLocationsExport(routesParams)}

    ${createRoutesNamedLocationsResolvedExport(routesParams)}

   

    export type RoutesNamesListRecord = ${routesDeclTemplate};

    export const routesNames = ${routesObjectTemplate};
  `;
}
