import { DestructuredPath } from '../../../../../core/parser/params';
import { RoutePathsDecl } from '../../../../../types';
import { customAlphabet } from 'nanoid';

const nanoid = customAlphabet('ABCDEFGHIJKLMNOPQRSTUVWXYZ', 10);

//--- temp

type ValidateUser<T> = T extends `/user/${infer hlvos}`
  ? hlvos extends ''
    ? ['Parameter id is required']
    : T
  : never;

type ValidateFoo<T> = T extends `/foo` ? T : never;

export type ValidatePath<T extends string> = T extends string
  ? T extends '/'
    ? T
    : T extends ValidateUser<T>
    ? T
    : T extends ValidateFoo<T>
    ? T
    : never
  : never;

// TODO think about query string /user/1?param=foo
// @ts-ignore
function checkRoute<T extends string>(path: ValidatePath<T> | RouteSchema) {
  //
}
checkRoute('/user');
//--- temp

export function createRoutePathSchema(routePaths: RoutePathsDecl[]) {
  return `export type RoutePathSchema = 
    ${routePaths
      .filter((f) => !!f.path)
      .map((route) => `"${route.path}"`)
      .join('|')}
  `;
}

export function createRoutePathByNameBlock(routePaths: RoutePathsDecl[]) {
  return `export type RoutePathByName = {
    ${routePaths
      .filter((f) => !!f.name)
      .map((route) => `"${route.name}": \`${route.typePath}\``)
      .join(',')}
  }`;
}

export function createValidatePathType(pathElements: DestructuredPath[][][]): string {
  let pathConditions = pathElements.map(createTypeValidatePathCondition);

  const typeNamesList = pathConditions.map((m) => m.typeName);
  const conditionsList = pathConditions.map((m) => m.condition);

  // if (!pathConditions.length) {
  //   pathConditions = ['["Type should represent a path"]'];
  // }
  return `
    ${pathConditions.length ? conditionsList.join('\n') : ''}
    export type ValidatePath<T extends string> = T extends string 
      ? T extends '/' 
        ? T 
        : ${
          pathConditions.length
            ? typeNamesList.map((t) => `${t}<T> extends true ? T`).join(': ')
            : 'never'
        } 
      : \`Error: \${${typeNamesList.map((t) => `${t}<T>`).join('|')}}\` : 'Type should be a string';
  `;
}

export function createTypeValidatePathCondition(elements: DestructuredPath[][]) {
  const typeName = `Validate${nanoid(7)}`;
  const params = new Map();
  const hasOnlyNames = elements.flat().every((elem) => elem.type === 'name');
  const condition = `type ${typeName}<T> = T extends \`/${elements
    .map((elementArray, index) => {
      return elementArray
        .map((elem) => {
          if (elem.type === 'name') {
            return elem.content;
          } else if (elem.type === 'param' || elem.type === 'optionalParam') {
            const id = nanoid(6);
            params.set(index, id);
            const isOptionalAndLast =
              elem.type === 'optionalParam' && index === elements.length - 1;
            return `\${infer ${id}}${isOptionalAndLast ? '' : ''}`;
          }
        })
        .join('');
    })
    .join('/')}\`
    ? ${
      hasOnlyNames
        ? `true :`
        : elements
            .flat()
            .map((elem, index) => {
              let output = '';
              const isLast = index === elements.length - 1;
              if (elem.type === 'name') {
                output = ``;
              }
              if (elem.type === 'param' && isLast) {
                output = `ValidParam<${params.get(index)}> extends false ? "Parameter ${
                  elem.content
                } is invalid" : true :`;
              } else if (elem.type === 'param') {
                output = `${params.get(index)} extends '' ? ["Parameter ${
                  elem.content
                } is required"] : `;
              } else if (elem.type === 'optionalParam' && isLast) {
                output = `ValidParam<${params.get(index)}> extends false ? "Parameter ${
                  elem.content
                } is invalid" : true :`;
              } else if (isLast) {
                output += 'true :';
              }
              return output;
            })
            .join('')
    } "Incorrect route path" ;`;
  return {
    typeName,
    condition,
  };
}
