import { watermarkTemplate } from '../templates';

export function createUseTypedRouteFile(routesDeclTemplate: string): string {
  return /* typescript */ `
  ${watermarkTemplate}
  import { useRoute as defaultRoute } from '#app';
  import type { TypedRouteList } from './__routes';
  import type {TypedRoute, TypedNamedRoute} from './__router'

  /** Acts the same as \`useRoute\`, but typed.
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
export function useRoute<T extends TypedRouteList = never>(
  name?: T
): [T] extends [never] ? TypedRoute : TypedNamedRoute<T> {
  const route = defaultRoute();

  return route as any;
}


`;
}
