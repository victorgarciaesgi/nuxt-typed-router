import { returnIfTrue } from '../../../../utils';
import { moduleOptionStore } from '../../../config';

export function createIndexFile(): string {
  const { i18n } = moduleOptionStore;

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
      RoutePath,
      RoutePathByName
    } from './__routes';
    export { useRoute } from './__useTypedRoute';
    export { useRouter } from './__useTypedRouter';
    export { navigateTo } from './__navigateTo';
    ${returnIfTrue(i18n, `export {useLocalePath, useLocaleRoute} from './__i18n-router.ts';`)}
  `;
}
