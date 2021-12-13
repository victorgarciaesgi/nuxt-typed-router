import { NuxtRouteConfig } from '@nuxt/types/config/router';
import { ParamDecl, RouteParamsDecl } from 'types';

export async function constructRouteMap(routesConfig: NuxtRouteConfig[]): Promise<void> {
  try {
    let routesObjectTemplate = '{';
    let routesDeclTemplate = '{';
    let routesList: string[] = [];
    let routesParams: RouteParamsDecl[] = [];
  } catch (e) {
    return Promise.reject(e);
  }
}

// -----
type StartGeneratorProcedureParams = {
  routesObjectTemplate: string;
  routesDeclTemplate: string;
  routesList: string[];
  routesParams: RouteParamsDecl[];
  routesConfig: NuxtRouteConfig[];
};
export function startGeneratorProcedure({
  routesDeclTemplate,
  routesList,
  routesObjectTemplate,
  routesParams,
}: StartGeneratorProcedureParams) {
  //
}

// -----
type WalkThoughRoutesParams = {
  routes: NuxtRouteConfig[];
  level: number;
  siblings?: NuxtRouteConfig[];
  parentName?: string;
  previousParams?: ParamDecl[];
};
export function walkThoughRoutes({
  routes,
  level,
  siblings,
  parentName,
  previousParams,
}: WalkThoughRoutesParams) {
  //
}
