import { returnIfTrue } from '../../../../utils';
import { moduleOptionStore } from '../../../config';

export function createi18nRouterFile() {
  const { router } = moduleOptionStore.getResolvedStrictOptions();
  const { i18nLocales, experimentalPathCheck } = moduleOptionStore;
  return /* typescript */ `
  import type { RouteLocationRaw } from 'vue-router';
  import { useLocalePath as _useLocalePath, useLocaleRoute as _useLocaleRoute} from 'vue-i18n-routing';
  import type {TypedRouteLocationRawFromName, TypedLocationAsRelativeRaw, TypedRouteFromName} from './__router';
  import type {RoutesNamesList} from './__routes';
  ${returnIfTrue(
    experimentalPathCheck,
    `import type {ValidatePath, RoutePathSchema, RouteNameFromPath} from './__paths';`
  )}

  export type I18nLocales = ${
    i18nLocales.length ? i18nLocales.map((loc) => `"${loc}"`).join('|') : 'string'
  };

  export interface TypedToLocalePath {
    <T extends RoutesNamesList>(
      to: TypedRouteLocationRawFromName<T>,
      locale?: I18nLocales | undefined
    ) : [T] extends [never] ? string : Required<
    (Omit<Exclude<RouteLocationRaw, string>, 'name' | 'params'> & TypedLocationAsRelativeRaw<T>)
    >
    ${returnIfTrue(
      experimentalPathCheck && !router.strictToArgument,
      `<T extends string>(
      to: ValidatePath<T> | RoutePathSchema,
      locale?: I18nLocales | undefined
    ) : [T] extends [never] ? string : Required<TypedRouteLocationRawFromName<RouteNameFromPath<T>, T>>;`
    )}
  }

  export function useLocalePath(options?: Pick<NonNullable<Parameters<typeof _useLocalePath>[0]>, 'i18n'>): TypedToLocalePath {
     return _useLocalePath(options) as any;
  }
  
  export interface TypedLocaleRoute {
    <T extends RoutesNamesList>(to: TypedRouteLocationRawFromName<T>, locale?: I18nLocales | undefined) : TypedRouteFromName<T>
    ${returnIfTrue(
      experimentalPathCheck && !router.strictToArgument,
      ` <T extends string>(to: ValidatePath<T> | RoutePathSchema, locale?: I18nLocales | undefined) : TypedRouteFromName<RouteNameFromPath<T>>;`
    )}
  }


  export function useLocaleRoute(options?: Pick<NonNullable<Parameters<typeof _useLocaleRoute>[0]>, 'i18n'>): TypedLocaleRoute {
    return _useLocaleRoute(options) as any;
  }

  `;
}
