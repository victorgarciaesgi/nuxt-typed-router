import { returnIfTrue } from '../../../../utils';
import { moduleOptionStore } from '$$/core/stores';

export function createi18nRouterFile() {
  const { router, NuxtLink } = moduleOptionStore.getResolvedStrictOptions();
  const { i18nOptions, pathCheck, i18nLocales } = moduleOptionStore;

  const LocalePathType =
    i18nOptions?.strategy === 'no_prefix' ? 'TypedPathParameter' : 'TypedLocalePathParameter';

  return /* typescript */ `
  import type { RouteLocationRaw } from 'vue-router';
  import { useLocalePath as _useLocalePath, useLocaleRoute as _useLocaleRoute} from 'vue-i18n-routing';
  import type {I18nCommonRoutingOptionsWithComposable} from 'vue-i18n-routing';
  import type {TypedRouteLocationRawFromName, TypedLocationAsRelativeRaw, TypedRouteFromName} from './__router';
  import type {RoutesNamesList} from './__routes';
  ${returnIfTrue(
    pathCheck,
    `import type {TypedLocalePathParameter, TypedPathParameter, RouteNameFromLocalePath} from './__paths';`
  )}

  export type I18nLocales = ${
    i18nLocales?.length ? i18nLocales.map((loc) => `"${loc}"`).join('|') : 'string'
  };


  export type NuxtLocaleRoute<T extends RoutesNamesList = never, P extends string = never, E extends boolean = false> = 
    | TypedRouteLocationRawFromName<T, P>
    ${returnIfTrue(!pathCheck && !NuxtLink.strictToArgument, ` | string`)}
    ${returnIfTrue(pathCheck && NuxtLink.strictToArgument, ` | (E extends true ? string : never)`)}
    ${returnIfTrue(
      pathCheck && !NuxtLink.strictToArgument,
      ` | (E extends true ? string : ${LocalePathType}<P>)`
    )}

  export interface TypedToLocalePath {
    <T extends RoutesNamesList, P extends string>(
      to: TypedRouteLocationRawFromName<T, P>,
      locale?: I18nLocales | undefined
    ) : [T] extends [never] ? string : Required<
    (Omit<Exclude<RouteLocationRaw, string>, 'name' | 'params'> & TypedLocationAsRelativeRaw<T>)
    >
    ${returnIfTrue(
      pathCheck && !router.strictToArgument,
      `<T extends string>(
      to: ${LocalePathType}<T>,
      locale?: I18nLocales | undefined
    ) : [T] extends [never] ? string : Required<TypedRouteLocationRawFromName<RouteNameFromLocalePath<T>, T>>;`
    )}
  }

  export function useLocalePath(options?: I18nCommonRoutingOptionsWithComposable): TypedToLocalePath {
     return _useLocalePath(options) as any;
  }
  
  export interface TypedLocaleRoute {
    <T extends RoutesNamesList, P extends string>(to: TypedRouteLocationRawFromName<T, P>, locale?: I18nLocales | undefined) : TypedRouteFromName<T>
    ${returnIfTrue(
      pathCheck && !router.strictToArgument,
      ` <T extends string>(to: ${LocalePathType}<T>, locale?: I18nLocales | undefined) : TypedRouteFromName<RouteNameFromLocalePath<T>>;`
    )}
  }


  export function useLocaleRoute(options?: I18nCommonRoutingOptionsWithComposable): TypedLocaleRoute {
    return _useLocaleRoute(options) as any;
  }

  `;
}
