export function createIndexFile(): string {
  return /* typescript */ `

  export type {
    TypedLocationAsRelativeRaw,
    TypedResolvedMatcherLocation,
    TypedRoute,
    TypedRouteFromName,
    TypedRouteLocationFromName,
    TypedRouteLocationRaw,
    TypedRouteLocationRawFromName,
    TypedRouter,
  } from './__router';
  export { routesNames } from './__routes';
  export type {
    RoutesNamedLocations,
    RoutesNamedLocationsResolved,
    RoutesNamesList,
    RoutesNamesListRecord,
    RoutesParamsRecord,
  } from './__routes';
  export { useRoute } from './__useTypedRoute';
  export { useRouter } from './__useTypedRouter';
  export { navigateTo } from './__navigateTo';
  `;
}
