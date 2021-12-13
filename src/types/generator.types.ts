export type ParamDecl = {
  key: string;
  type: string;
  required: boolean;
};

export type RouteParamsDecl = {
  name: string;
  params: ParamDecl[];
};
