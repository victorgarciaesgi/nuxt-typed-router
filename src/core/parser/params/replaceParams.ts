const routeParamExtractRegxp = /(:(\w+)(\(\.[^(]\)[*+]?)?(\?)?)+/g;

type ExtractedParam = { name: string; optional: boolean; catchAll: boolean };

export function extractParamsFromPathDecl(path: string): ExtractedParam[] {
  let params: ExtractedParam[] = [];
  let matches: RegExpExecArray | null;
  do {
    matches = routeParamExtractRegxp.exec(path);
    if (matches) {
      const [_, mtch, key, catchAll, optional] = matches;
      if (mtch) {
        const _param = {
          name: key,
          optional: !!optional,
          catchAll: !!catchAll,
        } satisfies ExtractedParam;
        params.push(_param);
      }
    }
  } while (matches);

  return params;
}
