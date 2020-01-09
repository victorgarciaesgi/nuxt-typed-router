import VueRouter, { Location, Route, RouteRecord } from 'vue-router';
import { RouteNames } from './__generated';
import { ErrorHandler } from 'vue-router/types/router';
import Vue, { AsyncComponent, ComponentOptions } from 'vue';

export interface NuxtTypedRouterOptions {
  filePath?: string;
}
export type Component = ComponentOptions<Vue> | typeof Vue | AsyncComponent;

export interface TypedVueRouter extends VueRouter {
  push(location: TypedRawLocation): Promise<TypedRoute>;
  replace(location: TypedRawLocation): Promise<TypedRoute>;
  push(location: TypedRawLocation, onComplete?: Function, onAbort?: ErrorHandler): void;
  replace(location: TypedRawLocation, onComplete?: Function, onAbort?: ErrorHandler): void;
  getMatchedComponents(to?: TypedRawLocation | TypedRoute): Component[];
  resolve(
    to: TypedRawLocation,
    current?: TypedRoute,
    append?: boolean
  ): {
    location: TypedLocation;
    route: TypedRoute;
    href: string;
    normalizedTo: TypedLocation;
    resolved: TypedRoute;
  };
}

export type TypedRawLocation = string | TypedLocation;

export interface TypedLocation extends Location {
  name?: RouteNames;
}

export interface TypedRoute extends Route {
  name?: RouteNames;
}

export interface TypedRouteRecord extends RouteRecord {
  name?: RouteNames;
}
