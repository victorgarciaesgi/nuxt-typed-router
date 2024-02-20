import { returnIfFalse, returnIfTrue } from '../../../../utils';
import { moduleOptionStore } from '$$/core/stores';

export function createTypedRouterFile() {
  const strictOptions = moduleOptionStore.getResolvedStrictOptions();
  const { i18n, pathCheck } = moduleOptionStore;

  return /* typescript */ `
  
  import type { Ref } from 'vue';
  import type {
    NavigationFailure,
    RouteLocation,
    RouteLocationNormalizedLoaded,
    RouteLocationRaw,
    Router,
    RouteLocationPathRaw
  } from 'vue-router';
  import type {
    RoutesNamedLocations,
    RoutesNamedLocationsResolved,
    RoutesNamesList,
    RoutesParamsRecord,
    RoutesParamsRecordResolved,
  } from './__routes';
  ${returnIfTrue(
    pathCheck,
    `import type {TypedPathParameter, RouteNameFromPath} from './__paths';`
  )}
  import type { HasOneRequiredParameter } from './__types_utils';


  // - Routes location for navigation types (ex: router.push or navigateTo)


  export type NuxtRoute<T extends RoutesNamesList = never, P extends string = never, E extends boolean = false> = 
    | TypedRouteLocationRawFromName<T, P>
    ${returnIfTrue(!pathCheck && !strictOptions.NuxtLink.strictToArgument, ` | string`)}
    ${returnIfTrue(
      pathCheck && strictOptions.NuxtLink.strictToArgument,
      ` | (E extends true ? string : never)`
    )}
    ${returnIfTrue(
      pathCheck && !strictOptions.NuxtLink.strictToArgument,
      ` | (E extends true ? string : TypedPathParameter<P>)`
    )}

  /** 
   * RouteLocationRaw with discrimanated name and params properties 
   * {@link RouteLocationRaw}
   * */
  export type TypedRouteLocationRaw<T extends string = string> =
  | (Omit<Exclude<RouteLocationRaw, string>, 'name' | 'params'> & RoutesNamedLocations)
  | Omit<RouteLocationPathRaw, 'path'>
  ${returnIfTrue(
    pathCheck && !strictOptions.router.strictRouteLocation,
    `& {path?: TypedPathParameter<T>}`
  )}
  ${returnIfTrue(!pathCheck && !strictOptions.router.strictToArgument, ` | string`)}
  ;
  

  /**
   * Alternative version of {@link TypedRouteLocationRaw} but with a name generic
   */
  export type TypedRouteLocationRawFromName<T extends RoutesNamesList, P extends string = string, E extends boolean = false> =
  | (Omit<Exclude<RouteLocationRaw, string>, 'name' | 'params'> & TypedLocationAsRelativeRaw<T>)
  | Omit<RouteLocationPathRaw, 'path'>
  ${returnIfTrue(
    pathCheck && !strictOptions.router.strictRouteLocation,
    `& {path?: TypedPathParameter<P>}`
  )}
  ${returnIfTrue(!pathCheck && !strictOptions.router.strictToArgument, ` | string`)}
  ${returnIfTrue(
    pathCheck && strictOptions.router.strictToArgument,
    `| (E extends true ? string : never)`
  )}


  /** 
   * Generic providing inference and dynamic inclusion of \`params\` property
   * {@link import('vue-router').LocationAsRelativeRaw} 
   * */
  export type TypedLocationAsRelativeRaw<T extends RoutesNamesList> = {
    name?: T;
  } & ([RoutesParamsRecord[T]] extends [never]
    ? {}
    : HasOneRequiredParameter<T> extends false
    ? { params?: RoutesParamsRecord[T] }
    : { params: RoutesParamsRecord[T] });

  
   /** 
   * Used for type assertion:
   * 
   * @usage
   * 
   * \`\`\`ts
   *  const myRoute = '/foo' as TypedRouteLocation;
   * \`\`\`
   * */
  export type TypedRouteLocation<T extends '/' = '/'> =
  TypedRouteLocationRawFromName<any, T>
  ${returnIfTrue(!pathCheck && !strictOptions.router.strictToArgument, ` & string`)}
  ${returnIfTrue(pathCheck && !strictOptions.router.strictToArgument, `& TypedPathParameter<T>`)}
  ;

  
  /** Augmented Router with typed methods
   * {@link Router}
   */
  export interface TypedRouter
    extends Omit<Router, 'removeRoute' | 'hasRoute' | 'resolve' | 'push' | 'replace' | 'currentRoute'> {
    readonly currentRoute: Ref<TypedRoute>;
    /**
     * Remove an existing route by its name.
     *
     * @param name - Name of the route to remove
     */
    removeRoute(name: RoutesNamesList): void;
    /**
     * Checks if a route with a given name exists
     *
     * @param name - Name of the route to check
     */
    hasRoute(name: RoutesNamesList): boolean;
    /**
     * Returns the {@link RouteLocation | normalized version} of a
     * {@link RouteLocationRaw | route location}. Also includes an \`href\` property
     * that includes any existing \`base\`. By default the \`currentLocation\` used is
     * \`route.currentRoute\` and should only be overriden in advanced use cases.
     *
     * @param to - Raw route location to resolve
     * @param currentLocation - Optional current location to resolve against
     */
    resolve<T extends RoutesNamesList, P extends string>(
      to: TypedRouteLocationRawFromName<T, P>,
      currentLocation?: TypedRouteLocationRaw
    ): TypedRouteLocationFromName<T>;
    ${returnIfTrue(
      pathCheck && !strictOptions.router.strictToArgument,
      `resolve<T extends string>(to: TypedPathParameter<T>, currentLocation?: TypedRouteLocationRaw): TypedRouteLocationFromName<RouteNameFromPath<T>>;`
    )}
    /**
     * Programmatically navigate to a new URL by pushing an entry in the history
     * stack.
     *
     * @param to - Route location to navigate to
     */
    push<T extends RoutesNamesList, P extends string>(to: NuxtRoute<T, P>): Promise<NavigationFailure | void | undefined>;
    /**
     * Programmatically navigate to a new URL by replacing the current entry in
     * the history stack.
     *
     * @param to - Route location to navigate to
     */
    replace<T extends RoutesNamesList, P extends string>(to: NuxtRoute<T, P>): Promise<NavigationFailure | void | undefined>;
  }

  



  // - Resolved normalized routes for current Location (ex: useRoute and currentRoute)
  
  

  /**
   * Clone of {@link RouteLocationNormalizedLoaded} with a discriminated union for name and params
   */
  export type TypedRoute = Omit<RouteLocationNormalizedLoaded, 'name' | 'params'> &
    RoutesNamedLocationsResolved;

  /**
   * Clone of {@link TypedRoute} with generic param for route name that can dynamicaly add params property
   */
  export type TypedRouteFromName<T extends RoutesNamesList> = Omit<
    RouteLocationNormalizedLoaded,
    'name' | 'params'
  > &
  TypedResolvedMatcherLocation<T>;

  /** 
   * Generic providing inference and dynamic inclusion of \`params\` property
   * {@link import('vue-router').LocationAsRelativeRaw} 
   * */
  export type TypedResolvedMatcherLocation<T extends RoutesNamesList> = {
    name: T;
  } & ([RoutesParamsRecordResolved[T]] extends [never] ? {} : { params: RoutesParamsRecordResolved[T] });
  

  /** 
   * Clone of {@link RouteLocation} with generic param for route name that can dynamicaly add params property
   * Used by Router.resolve
   * */
  export type TypedRouteLocationFromName<T extends RoutesNamesList> = TypedRouteFromName<T> & {href: string};
  `;
}
