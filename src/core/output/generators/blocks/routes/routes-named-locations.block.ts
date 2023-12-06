import type { RouteParamsDecl } from '../../../../../types';

export function createRoutesNamedLocationsExport(routesParams: RouteParamsDecl[]): string {
  return `
  /**
   * Discriminated union that will allow to infer params based on route name
   * It's used for programmatic navigation like router.push or <NuxtLink/>
   * */
  export type RoutesNamedLocations = 
    ${
      routesParams.length
        ? routesParams
            .map(
              ({ name, params }) =>
                `{name: "${name}" ${
                  params.length
                    ? `, params${params.some((s) => s.required) ? '' : '?'}: {
          ${params
            .map(
              ({ key, required, catchAll }) =>
                `"${key}"${required ? '' : '?'}: (string | number)${catchAll ? '[]' : ''}`
            )
            .join(',\n')}
        }`
                    : ''
                }}`
            )
            .join('|\n')
        : "''"
    }
  `;
}
