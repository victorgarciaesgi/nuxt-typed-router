export interface ParamDecl {
  key: string;
  type: string;
  required: boolean;
}

export interface RouteParamsDecl {
  name: string;
  params: ParamDecl[];
}

export interface GeneratorOutput {
  routesObjectTemplate: string;
  routesDeclTemplate: string;
  routesList: string[];
  routesParams: RouteParamsDecl[];
}
