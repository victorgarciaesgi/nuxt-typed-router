export function createRoutesNamesListExport(routesList: string[]): string {
  return `
  /**
   * Exhaustive list of all the available route names in the app
   * */
  export type RoutesNamesList = ${routesList.map((m) => `'${m}'`).join('|\n')}`;
}
