import VueRouter, { Location, Route, RouteRecord } from 'vue-router';
import { RouteNames } from './__generated.ts';

interface SafeVueRouter extends VueRouter {
  push(location: SafeRawLocation): Promise<SafeRoute>;
  replace(location: SafeRawLocation): Promise<SafeRoute>;
  push(location: SafeRawLocation, onComplete?: Function, onAbort?: ErrorHandler): void;
  replace(location: SafeRawLocation, onComplete?: Function, onAbort?: ErrorHandler): void;
  getMatchedComponents(to?: SafeRawLocation | SafeRoute): Component[];
  resolve(
    to: SafeRawLocation,
    current?: SafeRoute,
    append?: boolean
  ): {
    location: SafeLocation;
    route: SafeRoute;
    href: string;
    normalizedTo: SafeLocation;
    resolved: SafeRoute;
  };
}

type SafeRawLocation = string | SafeLocation;

interface SafeLocation extends Location {
  name?: RouteNames;
}

interface SafeRoute extends Route {
  name?: RouteNames;
}

interface SafeRouteRecord extends RouteRecord {
  name?: RouteNames;
}

declare module 'vue/types/vue' {
  interface Vue {
    $safeRouter: SafeVueRouter;
    $safeRoute: SafeRoute;
  }
}

declare module 'vuex/types/index' {
  interface Store<S> {
    $safeRouter: SafeVueRouter;
  }
}
