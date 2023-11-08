export function createUseTypedRouteFile(): string {
  return /* typescript */ `
  import { useRoute as defaultRoute } from '#imports';
  import type { RoutesNamesList } from './__routes';
  import type {TypedRoute, TypedRouteFromName} from './__router'

  /**
   * Typed clone of \`useRoute\`
   *
   * @exemple
   *
   * \`\`\`ts
   * const route = useRoute();
   * \`\`\`
   *
   * \`\`\`ts
   * const route = useRoute('my-route-with-param-id');
   * route.params.id // autocompletes!
   * \`\`\`
   *
   * \`\`\`ts
   * const route = useRoute();
   * if (route.name === 'my-route-with-param-id') {
   *    route.params.id // autocompletes!
   * }
   * \`\`\`
   */
  export function useRoute<T extends RoutesNamesList = never>(
    name?: T
  ): [T] extends [never] ? TypedRoute : TypedRouteFromName<T> {
    const route = defaultRoute();

    return route as any;
  }
`;
}
