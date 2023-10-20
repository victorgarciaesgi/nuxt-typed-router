import { nanoid } from 'nanoid';
import type { RoutePathsDecl } from '../../../../src/types';

const ExtractRegex = /(^(\/)?([^:/]+)?(:(\w+)(\((.*)\)[*+]?)?(\?)?)*([^:/]+)?)+/g;
export type DestructuredPath = {
  type: 'name' | 'param' | 'optionalParam' | 'catchAll';
  content: string;
  fullPath?: string;
  id: string;
  routeName: string;
  isLocale: boolean;
};

export function destructurePath(path: string, route: RoutePathsDecl): DestructuredPath[] {
  let allPathElements: DestructuredPath[] = [];
  let _path = `${path}`;
  do {
    const { pathElements, strippedPath } = extractPathElements(_path, route);
    allPathElements = allPathElements.concat(pathElements);
    _path = _path.replace(strippedPath, '');
  } while (_path.length);

  return allPathElements;
}

function extractPathElements(partOfPath: string, route: RoutePathsDecl) {
  let pathElements: DestructuredPath[] = [];
  let strippedPath = '';
  let matches: RegExpExecArray | null;
  matches = ExtractRegex.exec(partOfPath);
  if (matches) {
    const [_, mtch, slash, path1, paramDef, key, catchAll, parentheseContent, optional, path2] =
      matches;
    if (mtch) {
      strippedPath = mtch;

      const sharedProperties = {
        fullPath: route.path,
        routeName: route.name!,
        isLocale: route.isLocale,
      };
      if (path1) {
        pathElements.push({
          type: 'name',
          content: path1,
          id: nanoid(6),
          ...sharedProperties,
        });
      }
      if (key) {
        pathElements.push({
          type: catchAll && parentheseContent ? 'catchAll' : optional ? 'optionalParam' : 'param',
          content: key,
          id: nanoid(6),
          ...sharedProperties,
        });
      }
      if (path2) {
        pathElements.push({
          type: 'name',
          content: path2,
          id: nanoid(6),
          ...sharedProperties,
        });
      }
    }
  }

  return { pathElements, strippedPath };
}
