import { RouteParamsDecl } from 'types';
export declare function createRuntimeRoutesFile({ routesList, routesObjectTemplate, routesObjectName, }: {
    routesList: string[];
    routesObjectName: string;
    routesObjectTemplate: string;
}): string;
export declare function createDeclarationRoutesFile({ routesDeclTemplate, routesList, routesParams, }: {
    routesDeclTemplate: string;
    routesList: string[];
    routesParams: RouteParamsDecl[];
}): string;
export declare function createTypedRouteListExport(routesList: string[]): string;
export declare function createTypedRouteParamsExport(routesParams: RouteParamsDecl[]): string;
