export function createTypedRouterDefinitionFile(autoImport: boolean): string {
  return /* typescript */ `
    
    import type { NuxtLinkProps } from '#app';
    import type { DefineComponent } from 'vue';
    import type { RouteLocationRaw } from 'vue-router';
    import type { RoutesNamedLocations } from './__routes';
    import { useRoute as _useRoute } from './__useTypedRoute';
    import { useRouter as _useRouter } from './__useTypedRouter';
    import { navigateTo as _navigateTo } from './__navigateTo';

    declare global {
 
      ${
        autoImport
          ? /* typescript */ `
            const useRoute: typeof _useRoute;
            const useRouter: typeof _useRouter;
            const navigateTo: typeof _navigateTo;`
          : ''
      }
    }
    
    type TypedNuxtLinkProps = Omit<NuxtLinkProps, 'to'> & {
      to: string | Omit<Exclude<RouteLocationRaw, string>, 'name'> & RoutesNamedLocations;
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
  `;
}
