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
import {useRoute as _useRoute} from './__useTypedRoute';
import {useRouter as _useRouter} from './__useTypedRouter';
`;
