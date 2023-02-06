const ExtractRegex = /(^(\/)?([^:/]+)?(:(\w+)(\(.+\)[*+]?)?(\?)?)*([^:/]+)?)+/g;
export type DestructuredPath =
  | {
      type: 'name';
      content: string;
    }
  | {
      type: 'param' | 'optionalParam' | 'catchAll';
    };

export function destructurePath(path: string): DestructuredPath[] {
  let allPathElements: DestructuredPath[] = [];
  let _path = path;
  do {
    const { pathElements, strippedPath } = extractPathElements(_path);
    allPathElements = allPathElements.concat(pathElements);
    _path = _path.replace(strippedPath, '');
  } while (_path.length);

  return allPathElements.flat();
}

function extractPathElements(partOfPath: string) {
  let pathElements: DestructuredPath[] = [];
  let strippedPath = '';
  let matches: RegExpExecArray | null;
  matches = ExtractRegex.exec(partOfPath);
  if (matches) {
    const [_, mtch, slash, path1, paramDef, key, catchAll, optional, path2] = matches;
    if (mtch) {
      strippedPath = mtch;
      if (path1) {
        pathElements.push({ type: 'name', content: path1 });
      }
      if (key) {
        pathElements.push({ type: catchAll ? 'catchAll' : optional ? 'optionalParam' : 'param' });
      }
      if (path2) {
        pathElements.push({ type: 'name', content: path2 });
      }
    }
  }

  return { pathElements, strippedPath };
}
