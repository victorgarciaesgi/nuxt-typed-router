export interface NuxtTypedRouterOptions {
  filePath?: string;
  routesObjectName?: string;
  stripAtFromName?: boolean;
}

export type ParamDecl = {
  key: string;
  type: string;
};

export type RouteParamsDecl = {
  name: string;
  params: ParamDecl[];
};
