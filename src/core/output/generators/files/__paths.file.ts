import { GeneratorOutput } from '../../../../types';
import { DestructuredPath, destructurePath } from '../../../parser/params';
import { createRoutePathSchema, createValidatePathType } from '../blocks';

export function createPathsFiles({ routesPaths }: GeneratorOutput) {
  const filteredRoutesPaths = routesPaths.filter(
    (route, index) => routesPaths.findIndex((r) => route.name === r.name) === index
  );

  const pathElements = filteredRoutesPaths
    .filter((f) => f.path && f.path !== '/')
    .map((route) => {
      return route.path
        .split('/')
        .filter((f) => f.length)
        .map((m) => destructurePath(m, route.path));
    });

  const validatePathType = createValidatePathType(pathElements);

  return /* typescript */ `
    
  ${createRoutePathSchema(filteredRoutesPaths)};

  type ValidParam<T> = T extends \`\${infer A}/\${infer B}\`
  ? A extends ''
    ? false
    : B extends ''
    ? true
    : false
  : true;

  type ValidEndOfPath<T> = T extends \`/\` ? true : T extends "" ? true : false

  ${validatePathType}

  `;
}
