import { returnIfTrue, returnIfFalse } from '../../../../utils';
import { moduleOptionStore } from '../../../config';

export function createTypedRouterDefinitionFile(): string {
  const { plugin, autoImport, i18n } = moduleOptionStore;
  const strictOptions = moduleOptionStore.getResolvedStrictOptions();

  return /* typescript */ `
    
    import type { NuxtLinkProps } from '#app';
    import type { DefineComponent } from 'vue';
    import type { RouteLocationRaw, RouteLocationPathRaw } from 'vue-router';
    import type { RoutesNamedLocations, RoutesNamesListRecord } from './__routes';
    import type {TypedRouter, TypedRoute} from './__router';
    import { useRoute as _useRoute } from './__useTypedRoute';
    import { useRouter as _useRouter } from './__useTypedRouter';
    import { navigateTo as _navigateTo } from './__navigateTo';
    import { useLocalePath as _useLocalePath, useLocaleRoute as _useLocaleRoute} from './__i18n-router';

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
    
    type TypedNuxtLinkProps = Omit<NuxtLinkProps, 'to'> & {
      to: 
      Omit<Exclude<RouteLocationRaw, string>, 'name' | 'params'> & RoutesNamedLocations
      ${returnIfFalse(strictOptions.NuxtLink.strictToArgument, '| string')}
      ${returnIfTrue(
        strictOptions.NuxtLink.strictRouteLocation,
        `| Omit<RouteLocationPathRaw, 'path'>`,
        '| RouteLocationPathRaw'
      )}
    };
    
    export type TypedNuxtLink = DefineComponent<
      TypedNuxtLinkProps,
      {},
      {},
      import('vue').ComputedOptions,
      import('vue').MethodOptions,
      import('vue').ComponentOptionsMixin,
      import('vue').ComponentOptionsMixin,
      {},
      string,
      import('vue').VNodeProps &
        import('vue').AllowedComponentProps &
        import('vue').ComponentCustomProps,
      Readonly<TypedNuxtLinkProps>,
      {}
    >;
    
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
