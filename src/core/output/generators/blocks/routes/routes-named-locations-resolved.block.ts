import type { RouteParamsDecl } from '../../../../../types';

export function createRoutesNamedLocationsResolvedExport(routesParams: RouteParamsDecl[]): string {
  return `
  /**
   * Type returned by a resolved Route that will allow to type guard the route name.
   * By default the params are unknown
   * */
  export type RoutesNamedLocationsResolved = 
  {
    name: RoutesNamesList;
    params: unknown;
  } ${
    routesParams.length
      ? `& (
    ${routesParams
      .map(
        ({ name, params }) =>
          `{name: "${name}" ${
            params.length
              ? `, params: {
                ${params
                  .map(
                    ({ key, notRequiredOnPage, catchAll }) =>
                      `"${key}"${notRequiredOnPage ? '?' : ''}: string${catchAll ? '[]' : ''}`
                  )
                  .join(',\n')}
        }`
              : ''
          }}`
      )
      .join('|\n')}
      )`
      : ''
  } 
  `;
}
