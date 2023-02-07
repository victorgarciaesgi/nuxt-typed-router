import { returnIfTrue, returnIfFalse } from '../../../../utils';
import { moduleOptionStore } from '../../../config';

export function createTypedRouterDefinitionFile(): string {
  const strictOptions = moduleOptionStore.getResolvedStrictOptions();
  const { plugin, autoImport, i18n, experimentalPathCheck } = moduleOptionStore;

  return /* typescript */ `
    
    import type { NuxtLinkProps } from '#app';
    import NuxtLink from 'nuxt/dist/app/components/nuxt-link';
    import type { RouteLocationRaw, RouteLocationPathRaw } from 'vue-router';
    import type { RoutesNamedLocations, RoutesNamesListRecord } from './__routes';
    import type {TypedRouter, TypedRoute} from './__router';
    import { useRoute as _useRoute } from './__useTypedRoute';
    import { useRouter as _useRouter } from './__useTypedRouter';
    import { navigateTo as _navigateTo } from './__navigateTo';
    import { useLocalePath as _useLocalePath, useLocaleRoute as _useLocaleRoute} from './__i18n-router';
    ${returnIfTrue(
      experimentalPathCheck,
      `import type {ValidatePath, RoutePathSchema} from './__paths';`
    )}

    declare global {
 
      ${returnIfTrue(
        autoImport,
        /* typescript */ `
            const useRoute: typeof _useRoute;
            const useRouter: typeof _useRouter;
            const navigateTo: typeof _navigateTo;
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
    
    type TypedNuxtLinkProps<T extends string> = Omit<NuxtLinkProps, 'to'> & (
    ${returnIfTrue(
      experimentalPathCheck && !strictOptions.NuxtLink.strictToArgument,
      `| { to: ValidatePath<T> | RoutePathSchema }`
    )}
    | {
      to: 
        | Omit<Exclude<RouteLocationRaw, string>, 'name' | 'params'> & RoutesNamedLocations
        | Omit<RouteLocationPathRaw, 'path'>
        ${returnIfTrue(
          experimentalPathCheck && !strictOptions.NuxtLink.strictRouteLocation,
          `& {path?: ValidatePath<T> | RoutePathSchema}`,
          '| RouteLocationPathRaw'
        )}
        ${returnIfTrue(
          !experimentalPathCheck && !strictOptions.NuxtLink.strictToArgument,
          '| string'
        )}
    });
    
    export type TypedNuxtLink = new <T extends string>(props: TypedNuxtLinkProps<T>) => Omit<
      typeof NuxtLink,
      '$props'
    > & {
      $props: TypedNuxtLinkProps<T>;
    };
    
    declare module '@vue/runtime-core' {
      export interface GlobalComponents {
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
