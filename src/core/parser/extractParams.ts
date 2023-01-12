import { ParamDecl } from '../../types';

const routeParamExtractRegxp = /:(\w+)/;

export function extractRouteParamsFromPath(
  path: string,
  isIndexFileForRouting: boolean,
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
    allMergedParams = previousParams
      .map((m) => ({ ...m, required: false }))
      .concat(allMergedParams);
  }
  if (!params.length && isIndexFileForRouting) {
    const lastItem = allMergedParams[allMergedParams.length - 1];
    if (lastItem) {
      lastItem.required = true;
    }
  }
  return allMergedParams;
}
