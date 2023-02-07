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
        .map(destructurePath);
    });

  const validatePathType = createValidatePathType(pathElements);
  console.log(validatePathType);

  return /* typescript */ `
    
  ${createRoutePathSchema(filteredRoutesPaths)};

  type ValidParam<T> = T extends \`\${infer A}/\${infer B}\`
  ? A extends ''
    ? false
    : B extends ''
    ? true
    : false
  : true;

  ${validatePathType}

  `;
}
