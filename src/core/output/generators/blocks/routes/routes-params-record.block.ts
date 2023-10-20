import type { RouteParamsDecl } from '../../../../../types';

export function createRoutesParamsRecordExport(routesParams: RouteParamsDecl[]): string {
  return `
  /** 
   * Routes params are only required for the exact targeted route name,
   * vue-router behaviour allow to navigate between children routes without the need to provide all the params every time.
   * So we can't enforce params when navigating between routes, only a \`[xxx].vue\` page will have required params in the type definition
   * 
   * */
  export type RoutesParamsRecord = {
    ${routesParams
      .map(
        ({ name, params }) =>
          `"${name}": ${
            params.length
              ? `{
                ${params
                  .map(
                    ({ key, required, catchAll }) =>
                      `"${key}"${required ? '' : '?'}: (string | number)${catchAll ? '[]' : ''}`
                  )
                  .join(',\n')}
        }`
              : 'never'
          }`
      )
      .join(',\n')}
  }`;
}
