import { returnIfTrue } from '../../../../utils';
import { moduleOptionStore } from '../../../config';

export function createTypedRouterDefinitionFile(): string {
  const strictOptions = moduleOptionStore.getResolvedStrictOptions();
  const { plugin, autoImport, i18n, experimentalPathCheck } = moduleOptionStore;

  return /* typescript */ `
    
    import type { NuxtLinkProps, PageMeta } from '#app';
    import NuxtLink from 'nuxt/dist/app/components/nuxt-link';
    import type { RouteLocationRaw, RouteLocationPathRaw } from 'vue-router';
    import type { RoutesNamedLocations, RoutesNamesListRecord, RoutesNamesList } from './__routes';
    import type {TypedRouter, TypedRoute, TypedRouteLocationRawFromName, TypedLocationAsRelativeRaw} from './__router';
    import { useRoute as _useRoute } from './__useTypedRoute';
    import { useRouter as _useRouter } from './__useTypedRouter';
    import { navigateTo as _navigateTo } from './__navigateTo';
    import { useLocalePath as _useLocalePath, useLocaleRoute as _useLocaleRoute} from './__i18n-router';
    import {definePageMeta as _definePageMeta} from './__definePageMeta';

    ${returnIfTrue(experimentalPathCheck, `import type {TypedPathParameter} from './__paths';`)}


    declare global {
 
      ${returnIfTrue(
        autoImport,
        /* typescript */ `
            const useRoute: typeof _useRoute;
            const useRouter: typeof _useRouter;
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
    
    type TypedNuxtLinkProps<T extends string> = Omit<NuxtLinkProps, 'to'> &
     {
      to: 
        | Omit<Exclude<RouteLocationRaw, string>, 'name' | 'params'> & RoutesNamedLocations
        | Omit<RouteLocationPathRaw, 'path'>
        ${returnIfTrue(
          experimentalPathCheck && !strictOptions.NuxtLink.strictRouteLocation,
          `& {path?: TypedPathParameter<T>}`
        )}
        ${returnIfTrue(
          !experimentalPathCheck && !strictOptions.NuxtLink.strictToArgument,
          ` | string`
        )}
        ${returnIfTrue(
          experimentalPathCheck && !strictOptions.NuxtLink.strictToArgument,
          ` | TypedPathParameter<T>`
        )}
      }
    
        
          
    export type TypedNuxtLink = new <P extends string>(props: TypedNuxtLinkProps<P>) => Omit<
      typeof NuxtLink,
      '$props'
    > & {
      $props: TypedNuxtLinkProps<P>;
    };
    
    declare module 'vue' {
      interface GlobalComponents {
        NuxtLink: TypedNuxtLink;
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
