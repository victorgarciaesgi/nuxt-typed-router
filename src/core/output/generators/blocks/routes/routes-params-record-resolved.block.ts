import type { RouteParamsDecl } from '../../../../../types';

export function createRoutesParamsRecordResolvedExport(routesParams: RouteParamsDecl[]): string {
  return `
  /** 
   * Record resolved used for resolved routes
   * 
   * */
  export type RoutesParamsRecordResolved = {
    ${routesParams
      .map(
        ({ name, params }) =>
          `"${name}": ${
            params.length
              ? `{
                ${params
                  .map(
                    ({ key, notRequiredOnPage, catchAll }) =>
                      `"${key}"${notRequiredOnPage ? '?' : ''}: string${catchAll ? '[]' : ''}`
                  )
                  .join(',\n')}
        }`
              : 'never'
          }`
      )
      .join(',\n')}
  }`;
}
