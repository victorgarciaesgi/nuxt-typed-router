import { returnIfTrue } from '../../../../utils';
import { moduleOptionStore } from '../../../config';

export function createNavigateToFile() {
  const { router } = moduleOptionStore.getResolvedStrictOptions();
  const { pathCheck } = moduleOptionStore;
  return /* typescript */ `
    import { navigateTo as defaultNavigateTo } from '#imports';
    import type { NavigateToOptions } from 'nuxt/dist/app/composables/router';
    import type { NavigationFailure } from 'vue-router';
    import type { TypedRouteLocationRawFromName, TypedRouteFromName, TypedRoute } from './__router';
    import type { RoutesNamesList } from './__routes';
    ${returnIfTrue(
      pathCheck,
      `import type {TypedPathParameter, RouteNameFromPath} from './__paths';`
    )}

    type TypedNavigateToOptions<E extends boolean> = Omit<NavigateToOptions, 'external'> & {
      external?: E
    }

    /** 
   * Typed clone of \`navigateTo\`
   * 
   * @exemple
   * 
   * \`\`\`ts
   * const resolved = navigateTo({name: 'foo', params: {foo: 'bar'}});
   * \`\`\`
   */
  

  interface NavigateToFunction {
    <T extends RoutesNamesList, P extends string, E extends boolean = false>(
      to: TypedRouteLocationRawFromName<T, P>,
      options?: TypedNavigateToOptions<E>
    ) : Promise<void | NavigationFailure | TypedRouteFromName<T>>
    ${returnIfTrue(
      pathCheck && !router.strictToArgument,
      `<T extends string, E extends boolean = false>(
        to: (E extends true ? string : TypedPathParameter<T>),
        options?: TypedNavigateToOptions<E>
      ) : Promise<void | NavigationFailure | TypedRouteFromName<RouteNameFromPath<T>>>`
    )}
  }
  
  export const navigateTo: NavigateToFunction = defaultNavigateTo as any;

  `;
}
