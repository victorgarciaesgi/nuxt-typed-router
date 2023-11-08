import { returnIfTrue } from '../../../../utils';
import { moduleOptionStore } from '../../../config';

export function createi18nRouterFile() {
  const { router, NuxtLink } = moduleOptionStore.getResolvedStrictOptions();
  const { i18nOptions, pathCheck, i18nLocales, nuxtLinkLocaleExists: nLLE } = moduleOptionStore;

  const LocalePathType =
    i18nOptions?.strategy === 'no_prefix' ? 'TypedPathParameter' : 'TypedLocalePathParameter';

  return /* typescript */ `
  import type { RouteLocationRaw${returnIfTrue(nLLE, `, RouteLocationPathRaw`)} } from 'vue-router';
  import { useLocalePath as _useLocalePath, useLocaleRoute as _useLocaleRoute} from 'vue-i18n-routing';
  import type {TypedRouteLocationRawFromName, TypedLocationAsRelativeRaw, TypedRouteFromName} from './__router';
  import type { RoutesNamesList${returnIfTrue(nLLE,`, RoutesNamedLocations`)} } from './__routes';
  ${returnIfTrue(
    pathCheck,
    `import type {TypedLocalePathParameter, TypedPathParameter, RouteNameFromLocalePath} from './__paths';`
  )}
  ${returnIfTrue(
    nLLE,
    `import NuxtLink from "nuxt/dist/app/components/nuxt-link";
  import type { NuxtLinkProps } from "#imports";`,
  )}

  export type I18nLocales = ${
    i18nLocales?.length ? i18nLocales.map((loc) => `"${loc}"`).join('|') : 'string'
  };

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

  export function useLocalePath(options?: Pick<NonNullable<Parameters<typeof _useLocalePath>[0]>, 'i18n'>): TypedToLocalePath {
     return _useLocalePath(options) as any;
  }

  export interface TypedLocaleRoute {
    <T extends RoutesNamesList, P extends string>(to: TypedRouteLocationRawFromName<T, P>, locale?: I18nLocales | undefined) : TypedRouteFromName<T>
    ${returnIfTrue(
      pathCheck && !router.strictToArgument,
      ` <T extends string>(to: ${LocalePathType}<T>, locale?: I18nLocales | undefined) : TypedRouteFromName<RouteNameFromLocalePath<T>>;`
    )}
  }


  export function useLocaleRoute(options?: Pick<NonNullable<Parameters<typeof _useLocaleRoute>[0]>, 'i18n'>): TypedLocaleRoute {
    return _useLocaleRoute(options) as any;
  }
  ${returnIfTrue(
    nLLE,
    `
  type TypedNuxtLinkLocaleProps<T extends string, E extends boolean = false> = Omit<NuxtLinkProps, 'to' | 'external'> &
   {
    to: 
      | Omit<Exclude<RouteLocationRaw, string>, 'name' | 'params'> & RoutesNamedLocations
      | Omit<RouteLocationPathRaw, 'path'>
      ${returnIfTrue(
        pathCheck && !NuxtLink.strictRouteLocation,
        `& {path?: (E extends true ? string : ${LocalePathType}<T>)}`,
      )}
      ${returnIfTrue(!pathCheck && !NuxtLink.strictToArgument, ` | string`)}
      ${returnIfTrue(
        pathCheck && NuxtLink.strictToArgument,
        ` | (E extends true ? string : void)`,
      )}
      ${returnIfTrue(
        pathCheck && !NuxtLink.strictToArgument,
        ` | (E extends true ? string : ${LocalePathType}<T>)`,
      )},
    external?: E
    }


     
  export type TypedNuxtLinkLocale = new <P extends string, E extends boolean = false>(props: TypedNuxtLinkLocaleProps<P, E>) => Omit<
    typeof NuxtLink,
    '$props'
  > & {
    $props: TypedNuxtLinkLocaleProps<P, E>;
  };
  
  // Declare runtime-core instead of vue for compatibility issues with pnpm
  declare module 'vue' {
    interface GlobalComponents {
      NuxtLinkLocale: TypedNuxtLinkLocale;
    }
  }`)}

  `;
}
