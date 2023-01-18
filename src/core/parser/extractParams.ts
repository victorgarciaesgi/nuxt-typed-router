import { ParamDecl } from '../../types';

const routeParamExtractRegxp = /(:(\w+)(\(.+\)[*+]?)?(\?)?)+/g;

export function extractRouteParamsFromPath(
  path: string,
  isIndexFileForRouting: boolean,
  previousParams?: ParamDecl[]
): ParamDecl[] {
  let params: Array<{ name: string; optional: boolean; catchAll: boolean }> = [];
  let matches: RegExpExecArray | null;
  do {
    matches = routeParamExtractRegxp.exec(path);
    if (matches) {
      const [_, mtch, key, catchAll, optional] = matches;
      if (mtch) {
        params.push({ name: key, optional: !!optional, catchAll: !!catchAll });
      }
    }
  } while (matches);

  let allMergedParams = params.map(
    ({ name, optional, catchAll }): ParamDecl => ({
      key: name,
      required: !optional,
      notRequiredOnPage: optional,
      catchAll,
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
