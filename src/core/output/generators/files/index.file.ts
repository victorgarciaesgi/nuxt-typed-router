import { returnIfTrue } from '../../../../utils';
import { moduleOptionStore } from '../../../config';

export function createIndexFile(): string {
  const { i18n, experimentalPathCheck } = moduleOptionStore;

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
    export { definePageMeta } from './__definePageMeta';
    
    ${returnIfTrue(
      experimentalPathCheck,
      `export type { ValidatePath, RoutePathSchema, TypedPathParameter, RouteNameFromPath } from './__paths';`
    )}
    ${returnIfTrue(i18n, `export {useLocalePath, useLocaleRoute} from './__i18n-router';`)}

    export const helpers = {
      route(
        to: TypedRouteLocationRawFromName<T, P>,
      ): [T] extends [never] ? string : Required<
        (Omit<Exclude<RouteLocationRaw, string>, 'name' | 'params'> & TypedLocationAsRelativeRaw<T>)
      > {
        return to;
      },
      path(
        to: TypedPathParameter<T>,
      ) : [T] extends [never] ? string : Required<TypedRouteLocationRawFromName<RouteNameFromPath<T>, T>> {
        return to;
      }
    } 
  `;
}
