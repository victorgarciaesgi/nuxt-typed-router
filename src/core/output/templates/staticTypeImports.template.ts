export const staticTypesImports = `
import type {
  NavigationFailure,
  RouteLocation,
  RouteLocationNormalizedLoaded,
  RouteLocationOptions,
  RouteQueryAndHash,
  RouteLocationRaw,
  Router,
} from 'vue-router';
import type { DefineComponent } from 'vue';
import type { NuxtLinkProps } from '#app';
import type {
  TypedRouteList,
  TypedRouteNamedMapper,
  TypedRouteParams,
  ResolvedTypedRouteNamedMapper,
} from './__routes';
import {useTypedRoute} from './__useTypedRoute';
import {useTypedRouter} from './__useTypedRouter';
`;
