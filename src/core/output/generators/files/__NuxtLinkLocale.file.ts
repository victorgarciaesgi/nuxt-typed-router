import { moduleOptionStore } from '../../../config';

export function createNuxtLinkLocaleDefinitionFile(): string {
  const strictOptions = moduleOptionStore.getResolvedStrictOptions();

  return /* typescript */ `
    
    import type { NuxtLinkProps, PageMeta } from 'nuxt/app';
    import NuxtLink from 'nuxt/dist/app/components/nuxt-link';
    import type { RoutesNamedLocations, RoutesNamesListRecord, RoutesNamesList } from './__routes';
    import type {TypedRouter, TypedRoute, TypedRouteLocationRawFromName, TypedLocationAsRelativeRaw} from './__router';
    import type {NuxtLocaleRoute, I18nLocales} from './__i18n-router';
    
    
    type TypedNuxtLinkLocaleProps<
    T extends RoutesNamesList,
    P extends string,
    E extends boolean = false> = Omit<NuxtLinkProps, 'to' | 'external'> &
     {
      to: NuxtLocaleRoute<T, P, E>,
      external?: E,
      locale?: E extends true ? never : I18nLocales
      }
    
    export type TypedNuxtLinkLocale = new <T extends RoutesNamesList, P extends string, E extends boolean = false>(props: TypedNuxtLinkLocaleProps<T, P, E>) => Omit<
      typeof NuxtLink,
      '$props'
    > & {
      $props: TypedNuxtLinkLocaleProps<T, P, E>;
    };
    
  `;
}
