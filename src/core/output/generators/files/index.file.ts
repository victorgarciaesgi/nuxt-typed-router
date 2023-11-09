import { returnIfTrue } from '../../../../utils';
import { moduleOptionStore } from '../../../config';

export function createIndexFile(): string {
  const { i18n, i18nOptions, pathCheck } = moduleOptionStore;
  const hasPrefixStrategy = i18n && i18nOptions?.strategy !== 'no_prefix';

  return /* typescript */ `

    export type {
      TypedLocationAsRelativeRaw,
      TypedResolvedMatcherLocation,
      TypedRoute,
      TypedRouteFromName,
      TypedRouteLocation,
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
    export { useLink } from './__useTypedLink';
    export { navigateTo } from './__navigateTo';
    export { definePageMeta } from './__definePageMeta';
    export { helpers } from './__helpers';
    
    ${returnIfTrue(
      pathCheck,
      `export type { ValidatePath, RoutePathSchema, TypedPathParameter, RouteNameFromPath, ${returnIfTrue(
        hasPrefixStrategy,
        `TypedLocalePathParameter`
      )} } from './__paths';`
    )}
    ${returnIfTrue(
      i18n,
      `export {useLocalePath, useLocaleRoute} from './__i18n-router';
      export type {TypedToLocalePath, TypedLocaleRoute, I18nLocales} from './__i18n-router';`
    )}

    
  `;
}
