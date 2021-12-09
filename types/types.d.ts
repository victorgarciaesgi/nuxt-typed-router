export interface NuxtTypedRouterOptions {
    filePath?: string;
    routesObjectName?: string;
    stripAtFromName?: boolean;
}
export declare type RouteParamsDecl = {
    name: string;
    params: {
        key: string;
        type: string;
    }[];
};
