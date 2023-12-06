import { returnIfTrue } from '../../../../utils';
import { moduleOptionStore } from '../../../config';

export function createUseTypedLinkFile(): string {
  const strictOptions = moduleOptionStore.getResolvedStrictOptions();
  const { pathCheck } = moduleOptionStore;

  return /* typescript */ `
  
  import { useLink as defaultLink } from '#imports';
  import type {MaybeRef, Ref} from 'vue';
  import type { NavigateToOptions } from 'nuxt/dist/app/composables/router';
  import type { NavigationFailure } from 'vue-router';
  import type { TypedRouteLocationRawFromName, TypedRouteFromName, TypedRoute } from './__router';
  import type { RoutesNamesList } from './__routes';
  ${returnIfTrue(
    pathCheck,
    `import type {TypedPathParameter, RouteNameFromPath} from './__paths';`
  )}


  type LinkedRoute<T extends RoutesNamesList> = {
    route: ComputedRef<TypedRouteFromName<T> & {
        href: string;
    }>;
    href: ComputedRef<string>;
    isActive: ComputedRef<boolean>;
    isExactActive: ComputedRef<boolean>;
    navigate: (e?: MouseEvent) => Promise<void | NavigationFailure>;
};


  interface UseLinkFunction {
    <T extends RoutesNamesList, P extends string>(props: {
      to: TypedRouteLocationRawFromName<T, P>;
      replace?: MaybeRef<boolean>;
    }): LinkedRoute<T>;
    <T extends RoutesNamesList, P extends string>(props: {
      to: Ref<TypedRouteLocationRawFromName<T, P>>;
      replace?: MaybeRef<boolean>;
    }): LinkedRoute<T>;
    
    ${returnIfTrue(
      pathCheck && !strictOptions.router.strictToArgument,
      `<P extends string>(
       props: {
        to: TypedPathParameter<P>,
        replace?: MaybeRef<boolean>
       }
      ) : LinkedRoute<RouteNameFromPath<P>>
      <P extends string>(props: {
        to: Ref<TypedPathParameter<P>>;
        replace?: MaybeRef<boolean>;
      }): LinkedRoute<RouteNameFromPath<P>>;
      
      `
    )}
  }

  /** 
   * Typed clone of \`useLink\`
   * 
   * @exemple
   * 
   * \`\`\`ts
   * const router = useLink(props);
   * \`\`\`
   */
  export const useLink: UseLinkFunction = defaultLink as any;

  `;
}
