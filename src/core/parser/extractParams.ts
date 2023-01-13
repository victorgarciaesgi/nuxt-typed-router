import { ParamDecl } from '../../types';

const routeParamExtractRegxp = /(:(\w+)(\?)?)+/g;

export function extractRouteParamsFromPath(
  path: string,
  isIndexFileForRouting: boolean,
  previousParams?: ParamDecl[]
): ParamDecl[] {
  let params: Array<{ name: string; required: boolean }> = [];
  let matches: RegExpExecArray | null;
  do {
    matches = routeParamExtractRegxp.exec(path);
    if (matches) {
      const [_, mtch, key, optional] = matches;
      if (mtch) {
        params.push({ name: key, required: !optional });
      }
    }
  } while (matches);

  let allMergedParams = params.map(
    ({ name, required }): ParamDecl => ({
      key: name,
      type: 'string | number',
      required,
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
