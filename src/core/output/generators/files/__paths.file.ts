import { GeneratorOutput } from '../../../../types';
import { destructurePath } from '../../../parser/params';
import { createRoutePathSchema, createValidatePathTypes } from '../blocks';

export function createPathsFiles({ routesPaths }: GeneratorOutput) {
  const filteredRoutesPaths = routesPaths
    .filter(
      (route, index) =>
        routesPaths.findIndex((r) => route.name === r.name) === index &&
        !routesPaths.find((r) => `${route.path}/` === r.path)
    )
    .sort((a, b) => {
      const pathCountA = a.path.split('/');
      const pathCountB = b.path.split('/');
      pathCountA.splice(0, 1);
      pathCountB.splice(0, 1);
      const maxIndex = Math.max(pathCountA.length, pathCountB.length) - 1;

      let order = 0;
      let index = 0;
      let reason: string = '';

      let alphabetOrder: number;
      let hasElement: number;
      let hasParam: number;
      let indexOfParam: number;
      do {
        alphabetOrder = pathCountA[index]?.localeCompare(pathCountB[index]);
        hasElement = (pathCountA[index] != null ? 1 : 0) - (pathCountB[index] != null ? 1 : 0);
        hasParam =
          (pathCountA[index]?.includes(':') ? 1 : 0) - (pathCountB[index]?.includes(':') ? 1 : 0);
        indexOfParam = pathCountB[index]?.indexOf(':') - pathCountA[index]?.indexOf(':');

        if (alphabetOrder !== 0 && index === 0) {
          order = alphabetOrder;
          reason = 'Alphabet-0';
          break;
        } else {
          if (hasElement !== 0) {
            order = hasElement;
            reason = 'No element';
            break;
          } else if (hasParam !== 0) {
            order = hasParam;
            reason = 'No param';
            break;
          } else if (hasParam === 0 && indexOfParam !== 0) {
            order = indexOfParam;
            reason = 'Param index';
            break;
          } else if (alphabetOrder !== 0) {
            order = alphabetOrder;
            reason = 'Alphabet';
            break;
          }
        }
        index = index + 1;
      } while (index < maxIndex);
      // console.log(a.path, b.path, order, reason);
      return order;
    });

  const pathElements = filteredRoutesPaths
    .filter((f) => f.path && f.path !== '/')
    .map((route) => {
      return route.path
        .split('/')
        .filter((f) => f.length)
        .map((m) => destructurePath(m, route.path, route.name!));
    });

  const validatePathTypes = createValidatePathTypes(pathElements);

  return /* typescript */ `
    
  ${createRoutePathSchema(filteredRoutesPaths)};

  type ValidParam<T> = T extends \`\${infer A}/\${infer B}\`
  ? A extends ''
    ? B extends ''
      ? true
      : false
    : B extends ''
    ? true
    : false
  : T extends \`\${string} \${string}\`
   ? false 
   : true;

  type ValidEndOfPath<T> = T extends \`/\`
    ? true
    : T extends ''
    ? true
    : T extends \`\${string} \${string}\`
    ? false 
    : T extends \`?\${string}\`
    ? true
    : T extends \`#\${string}\`
    ? true
    : false;

  ${validatePathTypes}

  `;
}
