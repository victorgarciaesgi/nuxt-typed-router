import { moduleOptionStore } from '../../../config';

export function createi18nRouterFile() {
  const { i18nLocales } = moduleOptionStore;
  return /* typescript */ `

  import { useLocalePath as _useLocalePath, useLocaleRoute as _useLocaleRoute} from 'vue-i18n-routing';
  import type {TypedRouteLocationRawFromName, TypedRouteFromName} from './__router';
  import type {RoutesNamesList} from './__routes';

  export type I18nLocales = ${
    i18nLocales.length ? i18nLocales.map((loc) => `"${loc}"`).join('|') : 'string'
  };

  export type TypedToLocalePath = <T extends RoutesNamesList>(to: TypedRouteLocationRawFromName<T>, locale?: I18nLocales | undefined) => TypedRouteLocationRawFromName<T>;

  export function useLocalePath(options?: Pick<NonNullable<Parameters<typeof _useLocalePath>[0]>, 'i18n'>): TypedToLocalePath {
     return _useLocalePath(options) as any;
  }
  
  export type TypedLocaleRoute = <T extends RoutesNamesList>(to: TypedRouteLocationRawFromName<T>, locale?: I18nLocales | undefined) => TypedRouteFromName<T>;


  export function useLocaleRoute(options?: Pick<NonNullable<Parameters<typeof _useLocaleRoute>[0]>, 'i18n'>): TypedLocaleRoute {
    return _useLocaleRoute(options) as any;
  }

  `;
}
