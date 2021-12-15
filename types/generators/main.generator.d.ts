import { NuxtRouteConfig } from '@nuxt/types/config/router';
import { GeneratorOutput, ParamDecl, RouteParamsDecl } from '../types';
export declare function constructRouteMap(routesConfig: NuxtRouteConfig[]): Promise<GeneratorOutput>;
declare type StartGeneratorProcedureParams = {
    output: GeneratorOutput;
    routesConfig: NuxtRouteConfig[];
};
export declare function startGeneratorProcedure({ output, routesConfig, }: StartGeneratorProcedureParams): void;
declare type WalkThoughRoutesParams = {
    route: NuxtRouteConfig;
    level: number;
    siblings?: NuxtRouteConfig[];
    parentName?: string;
    previousParams?: ParamDecl[];
    output: {
        routesObjectTemplate: string;
        routesDeclTemplate: string;
        routesList: string[];
        routesParams: RouteParamsDecl[];
    };
};
export declare function walkThoughRoutes({ route, level, siblings, parentName, previousParams, output, }: WalkThoughRoutesParams): void;
export {};
