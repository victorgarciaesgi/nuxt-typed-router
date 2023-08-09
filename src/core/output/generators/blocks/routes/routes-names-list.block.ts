import { moduleOptionStore } from '../../../../../../src/core/config';

export function createRoutesNamesListExport(routesList: string[]): string {
  return `
  /**
   * Exhaustive list of all the available route names in the app
   * */
  export type RoutesNamesList = ${routesList.map((m) => `'${moduleOptionStore.i18n ? m.split(moduleOptionStore.i18nOptions?.routesNameSeparator ?? '___')[0] : m}'`).join('|\n')}`;
}
