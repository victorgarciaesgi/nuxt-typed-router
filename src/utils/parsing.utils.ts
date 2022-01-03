import { ParamDecl } from '../types';

const routeParamExtractRegxp = /:(\w+)/;

export function extractRouteParamsFromPath(
  path: string,
  previousParams?: ParamDecl[]
): ParamDecl[] {
  const params: string[] = path.match(routeParamExtractRegxp) ?? [];
  params?.shift();
  let allMergedParams = params.map(
    (m): ParamDecl => ({
      key: m,
      type: 'string | number',
      required: true,
    })
  );
  if (previousParams?.length) {
    allMergedParams = allMergedParams.concat(
      previousParams.map((m) => ({ ...m, required: false }))
    );
  }
  return allMergedParams;
}
