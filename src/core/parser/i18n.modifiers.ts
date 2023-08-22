import { NuxtPage } from '@nuxt/schema';
import { moduleOptionStore } from '../config';
import { RoutePathsDecl } from '../../types';

const specialCharacterRegxp = /([^a-zA-Z0-9_])/gm;

/** Will check if the is a route generated by @nuxtjs/i18n */
export function is18Sibling(source: RoutePathsDecl[], route: NuxtPage) {
  const { i18n, i18nOptions, i18nLocales } = moduleOptionStore;
  if (i18n && i18nOptions && i18nOptions?.strategy !== 'no_prefix') {
    const i18LocalesRecognizer = i18nLocales
      ?.map((m) => m.replace(specialCharacterRegxp, '\\$&'))
      .join('|');

    return !!route.path?.match(new RegExp(`^/?(${i18LocalesRecognizer})(/.*)?$`, 'g'));
  }
  return false;
}

export function modifyRoutePrefixDefaultIfI18n(route: NuxtPage) {
  const { i18n, i18nOptions, i18nLocales } = moduleOptionStore;
  if (i18n && i18nOptions && route.name) {
    const separator = i18nOptions?.routesNameSeparator ?? '___';
    const i18LocalesRecognizer = i18nLocales
      ?.map((m) => m.replace(specialCharacterRegxp, '\\$&'))
      .join('|');
    if (i18nOptions?.strategy === 'prefix_and_default') {
      const routeDefaultRegXp = new RegExp(
        `([a-zA-Z0-9-]+)${separator}(${i18LocalesRecognizer})${separator}default`,
        'g'
      );
      const match = routeDefaultRegXp.exec(route.name);
      if (match) {
        const [_, routeName] = match;
        route.name = routeName;
        return {
          ...route,
          name: routeName,
        };
      }
    } else if (i18nOptions?.strategy === 'prefix_except_default') {
      let defaultLocale = i18nLocales.find((f) => f === i18nOptions.defaultLocale)
        ? i18nOptions.defaultLocale?.replace(specialCharacterRegxp, '\\$&')
        : '';
      const routeDefaultNameRegXp = new RegExp(`^([a-zA-Z0-9-]+)${separator}${defaultLocale}`, 'g');
      const match = routeDefaultNameRegXp.exec(route.name);
      if (match) {
        const [_, routeName] = match;
        return {
          ...route,
          name: routeName,
        };
      }
    }
  }
  return route;
}
