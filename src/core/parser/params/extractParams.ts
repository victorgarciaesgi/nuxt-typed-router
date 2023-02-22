import { ParamDecl } from '../../../types';
import { extractParamsFromPathDecl } from './replaceParams';

export function extractRouteParamsFromPath(
  path: string,
  isIndexFileForRouting: boolean,
  previousParams?: ParamDecl[]
): ParamDecl[] {
  const params = extractParamsFromPathDecl(path);

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
