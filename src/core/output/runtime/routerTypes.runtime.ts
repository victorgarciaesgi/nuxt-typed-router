export function createRuntimeRouterTypes() {
  return /* typescript */ `
  import type {
    NavigationFailure,
    RouteLocation,
    RouteLocationNormalizedLoaded,
    RouteLocationOptions,
    RouteLocationRaw,
    RouteQueryAndHash,
    Router,
  } from 'vue-router';
  import type {
    ResolvedTypedRouteNamedMapper,
    TypedRouteList,
    TypedRouteNamedMapper,
    TypedRouteParams,
  } from './__routes';

  // Type utils
  type ExtractRequiredParameters<T extends Record<string, any>> = Pick<
    T,
    { [K in keyof T]: undefined extends T[K] ? never : K }[keyof T]
  >;
  
  type HasOneRequiredParameter<T extends TypedRouteList> = [TypedRouteParams[T]] extends [never]
    ? false
    : [keyof ExtractRequiredParameters<TypedRouteParams[T]>] extends [undefined]
    ? false
    : true;
  
  type TypedLocationAsRelativeRaw<T extends TypedRouteList> = {
    name?: T;
  } & ([TypedRouteParams[T]] extends [never]
    ? {}
    : HasOneRequiredParameter<T> extends false
    ? { params?: TypedRouteParams[T] }
    : { params: TypedRouteParams[T] });
  
  type ResolvedTypedLocationAsRelativeRaw<T extends TypedRouteList> = {
    name: T;
  } & ([TypedRouteParams[T]] extends [never] ? {} : { params: TypedRouteParams[T] });
  
  export type TypedNamedRouteLocation<T extends TypedRouteList> =
  | (Omit<Exclude<RouteLocationRaw, string>, 'name' | 'params'> & TypedLocationAsRelativeRaw<T>)
  | string;
  
  type TypedRouteLocationRaw =
    | (Omit<Exclude<RouteLocationRaw, string>, 'name' | 'params'> & TypedRouteNamedMapper)
    | string;
  
  type _TypedRoute = Omit<RouteLocationNormalizedLoaded, 'name' | 'params'> &
    ResolvedTypedRouteNamedMapper;
  type _TypedNamedRoute<T extends TypedRouteList> = Omit<
    RouteLocationNormalizedLoaded,
    'name' | 'params'
  > &
    ResolvedTypedLocationAsRelativeRaw<T>;
  
  /** Augmented Router interface */
  interface _TypedRouter
    extends Omit<Router, 'removeRoute' | 'hasRoute' | 'resolve' | 'push' | 'replace' | 'currentRoute'> {
    readonly currentRoute: _TypedRoute;
    /**
     * Remove an existing route by its name.
     *
     * @param name - Name of the route to remove
     */
    removeRoute(name: TypedRouteList): void;
    /**
     * Checks if a route with a given name exists
     *
     * @param name - Name of the route to check
     */
    hasRoute(name: TypedRouteList): boolean;
    /**
     * Returns the {@link RouteLocation | normalized version} of a
     * {@link RouteLocationRaw | route location}. Also includes an \`href\` property
     * that includes any existing \`base\`. By default the \`currentLocation\` used is
     * \`route.currentRoute\` and should only be overriden in advanced use cases.
     *
     * @param to - Raw route location to resolve
     * @param currentLocation - Optional current location to resolve against
     */
    resolve(
      to: TypedRouteLocationRaw,
      currentLocation?: RouteLocationNormalizedLoaded
    ): RouteLocation & {
      href: string;
    };
    /**
     * Programmatically navigate to a new URL by pushing an entry in the history
     * stack.
     *
     * @param to - Route location to navigate to
     */
    push(to: TypedRouteLocationRaw): Promise<NavigationFailure | void | undefined>;
    /**
     * Programmatically navigate to a new URL by replacing the current entry in
     * the history stack.
     *
     * @param to - Route location to navigate to
     */
    replace(to: TypedRouteLocationRaw): Promise<NavigationFailure | void | undefined>;
  }
  
  export interface TypedRouter extends _TypedRouter {}
  export type TypedRoute = _TypedRoute;
  export type TypedNamedRoute<T extends TypedRouteList> = _TypedNamedRoute<T>;
  `;
}
