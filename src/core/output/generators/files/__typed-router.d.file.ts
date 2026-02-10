import { returnIfTrue } from '../../../../utils';
import { moduleOptionStore } from '../../../config';

export function createTypedRouterDefinitionFile(): string {
  const strictOptions = moduleOptionStore.getResolvedStrictOptions();
  const { plugin, autoImport, i18n, pathCheck } = moduleOptionStore;

  return /* typescript */ `
    
    import type { NuxtApp, NuxtLinkProps } from 'nuxt/app';
    import type { RouteLocation, UseLinkReturn } from 'vue-router';
    import type { RoutesNamesListRecord, RoutesNamesList } from './__routes';
    import type {TypedRouter, TypedRoute, NuxtRoute} from './__router';
    import { useRoute as _useRoute } from './__useTypedRoute';
    import { useRouter as _useRouter } from './__useTypedRouter';
    import { useLink as _useLink } from './__useTypedLink';
    import { navigateTo as _navigateTo } from './__navigateTo';
    import type { AllowedComponentProps, AnchorHTMLAttributes, DefineSetupFnComponent, SlotsType, UnwrapRef, VNode, VNodeProps } from 'vue';

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
      const P extends string,
      TExternal extends boolean,
      CustomProp extends boolean = false,
    > = Omit<NuxtLinkProps<CustomProp>, 'to' | 'external'> & {
      external?: TExternal;
      to: NuxtRoute<T, P, TExternal>;
    };
    
    type NuxtLinkDefaultSlotProps<CustomProp extends boolean = false> = CustomProp extends true ? {
      href: string;
      navigate: (e?: MouseEvent) => Promise<void>;
      prefetch: (nuxtApp?: NuxtApp) => Promise<void>;
      route: (RouteLocation & {
          href: string;
      }) | undefined;
      rel: string | null;
      target: '_blank' | '_parent' | '_self' | '_top' | (string & {}) | null;
      isExternal: boolean;
      isActive: false;
      isExactActive: false;
  } : UnwrapRef<UseLinkReturn>;

  type NuxtLinkSlots<CustomProp extends boolean = false> = {
      default?: (props: NuxtLinkDefaultSlotProps<CustomProp>) => VNode[];
  };
    
        
          
  export type TypedNuxtLink = new <
    const T extends RoutesNamesList,
    const P extends string,
    CustomProp extends boolean,
    TExternal extends boolean = false,
  >(
    props: TypedNuxtLinkProps<T, P, TExternal, CustomProp>
  ) => InstanceType<
    DefineSetupFnComponent<
      TypedNuxtLinkProps<T, P, NoInfer<TExternal>, CustomProp>,
      [],
      SlotsType<NuxtLinkSlots<CustomProp>>
    >
  >;

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
          declare module 'nuxt/app' {
            interface NuxtApp extends CustomPluginProperties {}
          }
          declare module 'vue' {
            interface ComponentCustomProperties extends CustomPluginProperties {}
          }
        `
    )}
  `;
}
