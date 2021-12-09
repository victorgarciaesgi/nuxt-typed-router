export interface NuxtTypedRouterOptions {
  filePath?: string;
  routesObjectName?: string;
  stripAtFromName?: boolean;
}

export type RouteParamsDecl = {
  name: string;
  params: {
    key: string;
    type: string;
  }[];
};
