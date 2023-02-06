import { RoutePathsDecl } from '../../../../../types';

//--- temp

type ValidatePath<T extends string = never> = T extends string
  ? T extends `/`
    ? T
    : T extends `/user${infer U}`
    ? U extends ''
      ? ['Type shouldnt match /user']
      : U extends `/${infer P}`
      ? P extends ''
        ? ['Type shouldnt match /user/']
        : T
      : false
    : ['Type should not be empty']
  : ['Type should be a string'];

// @ts-ignore
function checkRoute<T extends string>(path: ValidatePath<T> | RoutePathSchema) {
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

export function createTypeValidatePathCondition(routePaths: RoutePathsDecl[]) {}
