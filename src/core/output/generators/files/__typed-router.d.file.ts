import { returnIfTrue } from '../../../../utils';
import { moduleOptionStore } from '$$/core/stores';

export function createTypedRouterDefinitionFile(): string {
  const strictOptions = moduleOptionStore.getResolvedStrictOptions();
  const { plugin, autoImport, i18n, pathCheck } = moduleOptionStore;

  return /* typescript */ `
    
    import type { NuxtLinkProps, PageMeta } from 'nuxt/app';
    import NuxtLink from 'nuxt/dist/app/components/nuxt-link';
    import type { RouteLocationRaw, RouteLocationPathRaw } from 'vue-router';
    import type { RoutesNamedLocations, RoutesNamesListRecord, RoutesNamesList } from './__routes';
    import type {TypedRouter, TypedRoute, TypedRouteLocationRawFromName, TypedLocationAsRelativeRaw, NuxtRoute} from './__router';
    import { useRoute as _useRoute } from './__useTypedRoute';
    import { useRouter as _useRouter } from './__useTypedRouter';
    import { useLink as _useLink } from './__useTypedLink';
    import { navigateTo as _navigateTo } from './__navigateTo';
    ${returnIfTrue(
      i18n,
      `import { useLocalePath as _useLocalePath, useLocaleRoute as _useLocaleRoute} from './__i18n-router';
      import type {TypedNuxtLinkLocale} from './__NuxtLinkLocale'`
    )}

    import {definePageMeta as _definePageMeta} from './__definePageMeta';

    ${returnIfTrue(pathCheck, `import type {TypedPathParameter} from './__paths';`)}


    declare global {
 
      ${returnIfTrue(
        autoImport,
        /* typescript */ `
            const useRoute: typeof _useRoute;
            const useRouter: typeof _useRouter;
            const useLink: typeof _useLink;
            const navigateTo: typeof _navigateTo;
            const definePageMeta: typeof _definePageMeta;
            
            ${returnIfTrue(
              i18n,
              /* typescript */ `
              const useLocalePath: typeof _useLocalePath;
              const useLocaleRoute: typeof _useLocaleRoute;
            `
            )}
          `
      )}
    }
    
    type TypedNuxtLinkProps<
    T extends RoutesNamesList,
    P extends string,
    E extends boolean = false> = Omit<NuxtLinkProps, 'to' | 'external'> &
     {
      to: NuxtRoute<T, P, E>,
      external?: E
      }
    
        
          
    export type TypedNuxtLink = new <T extends RoutesNamesList, P extends string, E extends boolean = false>(props: TypedNuxtLinkProps<T, P, E>) => Omit<
      typeof NuxtLink,
      '$props'
    > & {
      $props: TypedNuxtLinkProps<T, P, E>;
    };
    
    declare module 'vue' {
      interface GlobalComponents {
        NuxtLink: TypedNuxtLink;
        ${returnIfTrue(i18n, ` NuxtLinkLocale: TypedNuxtLinkLocale;`)}
      }
    }

    ${returnIfTrue(
      plugin,
      /* typescript */ `
          interface CustomPluginProperties {
            $typedRouter: TypedRouter,
            $typedRoute: TypedRoute,
            $routesNames: RoutesNamesListRecord
          }
          declare module '#app' {
            interface NuxtApp extends CustomPluginProperties {}
          }
          declare module 'vue' {
            interface ComponentCustomProperties extends CustomPluginProperties {}
          }
        `
    )}
  `;
}
