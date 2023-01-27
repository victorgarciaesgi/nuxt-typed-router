export function createNavigateToFile() {
  return /* typescript */ `
    import { navigateTo as defaultNavigateTo } from '#app';
    import type { NavigateToOptions } from 'nuxt/dist/app/composables/router';
    import type { NavigationFailure } from 'vue-router';
    import type { TypedRouteLocationRawFromName, TypedRouteFromName } from './__router';
    import type { RoutesNamesList } from './__routes';

    /** 
   * Typed clone of \`navigateTo\`
   * 
   * @exemple
   * 
   * \`\`\`ts
   * const resolved = navigateTo({name: 'foo', params: {foo: 'bar'}});
   * \`\`\`
   */
    export const navigateTo: <T extends RoutesNamesList>(
      to: TypedRouteLocationRawFromName<T>,
      options?: NavigateToOptions
    ) => Promise<void | NavigationFailure | TypedRouteFromName<T>> = defaultNavigateTo as any;

  `;
}
