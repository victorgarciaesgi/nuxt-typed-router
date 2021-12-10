export interface NuxtTypedRouterOptions {
    filePath?: string;
    routesObjectName?: string;
    stripAtFromName?: boolean;
}
export declare type ParamDecl = {
    key: string;
    type: string;
};
export declare type RouteParamsDecl = {
    name: string;
    params: ParamDecl[];
};
