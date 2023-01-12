import { watermarkTemplate } from '../templates';

export function createUseTypedRouteFile(routesDeclTemplate: string): string {
  return `
  ${watermarkTemplate}
  import { useRoute } from '#app';
  import { TypedRouteList } from './__routes';

  /** Acts the same as \`useRoute\`, but typed.
 *
 * @exemple
 *
 * \`\`\`ts
 * const route = useTypedRoute();
 * \`\`\`
 *
 * \`\`\`ts
 * const route = useTypedRoute('my-route-with-param-id');
 * route.params.id // autocompletes!
 * \`\`\`
 *
 * \`\`\`ts
 * const route = useTypedRoute();
 * if (route.name === 'my-route-with-param-id') {
 *    route.params.id // autocompletes!
 * }
 * \`\`\`
 */
export function useTypedRoute<T extends TypedRouteList = never>(
  name?: T
): [T] extends [never] ? TypedRoute : TypedNamedRoute<T> {
  const route = useRoute();

  return route as any;
}

  `;
}
