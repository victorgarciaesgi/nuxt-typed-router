import { nanoid } from 'nanoid';

const ExtractRegex = /(^(\/)?([^:/]+)?(:(\w+)(\(.+\)[*+]?)?(\?)?)*([^:/]+)?)+/g;
export type DestructuredPath = {
  type: 'name' | 'param' | 'optionalParam' | 'catchAll';
  content: string;
  fullPath?: string;
  id: string;
};

export function destructurePath(path: string, fullPath: string): DestructuredPath[] {
  let allPathElements: DestructuredPath[] = [];
  let _path = `${path}`;
  do {
    const { pathElements, strippedPath } = extractPathElements(_path, fullPath);
    allPathElements = allPathElements.concat(pathElements);
    _path = _path.replace(strippedPath, '');
  } while (_path.length);

  return allPathElements;
}

function extractPathElements(partOfPath: string, fullPath: string) {
  let pathElements: DestructuredPath[] = [];
  let strippedPath = '';
  let matches: RegExpExecArray | null;
  matches = ExtractRegex.exec(partOfPath);
  if (matches) {
    const [_, mtch, slash, path1, paramDef, key, catchAll, optional, path2] = matches;
    if (mtch) {
      strippedPath = mtch;
      if (path1) {
        pathElements.push({ type: 'name', content: path1, fullPath, id: nanoid(6) });
      }
      if (key) {
        pathElements.push({
          type: catchAll ? 'catchAll' : optional ? 'optionalParam' : 'param',
          content: key,
          fullPath,
          id: nanoid(6),
        });
      }
      if (path2) {
        pathElements.push({ type: 'name', content: path2, fullPath, id: nanoid(6) });
      }
    }
  }

  return { pathElements, strippedPath };
}
