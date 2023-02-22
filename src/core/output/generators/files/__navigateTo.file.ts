import { returnIfTrue } from '../../../../utils';
import { moduleOptionStore } from '../../../config';

export function createNavigateToFile() {
  const { router } = moduleOptionStore.getResolvedStrictOptions();
  const { experimentalPathCheck } = moduleOptionStore;
  return /* typescript */ `
    import { navigateTo as defaultNavigateTo } from '#app';
    import type { NavigateToOptions } from 'nuxt/dist/app/composables/router';
    import type { NavigationFailure } from 'vue-router';
    import type { TypedRouteLocationRawFromName, TypedRouteFromName, TypedRoute } from './__router';
    import type { RoutesNamesList } from './__routes';
    ${returnIfTrue(
      experimentalPathCheck,
      `import type {TypedPathParameter, RouteNameFromPath} from './__paths';`
    )}

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
    <T extends RoutesNamesList, P extends string>(
      to: TypedRouteLocationRawFromName<T, P>,
      options?: NavigateToOptions
    ) : Promise<void | NavigationFailure | TypedRouteFromName<T>>
    ${returnIfTrue(
      experimentalPathCheck && !router.strictToArgument,
      `<T extends string>(
        to: TypedPathParameter<T>,
        options?: NavigateToOptions
      ) : Promise<void | NavigationFailure | TypedRouteFromName<RouteNameFromPath<T>>>`
    )}
  }
    export const navigateTo: NavigateToFunction = defaultNavigateTo as any;

  `;
}
