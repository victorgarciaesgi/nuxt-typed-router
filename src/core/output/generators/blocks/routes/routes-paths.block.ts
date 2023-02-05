import { RoutePathsDecl } from '../../../../../types';

// export function createRoutePathBlock() {
//   return /* typescript */ `
//     export type RoutePath<T, Key extends keyof T = keyof T> =
//       Key extends string
//       ? T[Key] extends Record<string, any>
//         ? | \`\${Key}.\${Path<T[Key], Exclude<keyof T[Key], keyof String>> & string}\`
//           | \`\${Key}.\${Exclude<keyof T[Key], keyof String> & string}\`
//           | Key
//         : T[Key] & string
//       : never;

//       export type RoutePathValue<T, P extends RoutePath<T>> =
//         P extends \`\${infer Key}.\${infer Rest}\`
//         ? Key extends keyof T
//           ? Rest extends RoutePath<T[Key]>
//             ? RoutePathValue<T[Key], Rest>
//             : never
//           : never
//         : P extends keyof T
//           ? T[P]
//           : never;
//           `;
// }

export function createRoutePathByNameBlock(routePaths: RoutePathsDecl[]) {
  return `export type RoutePathByName = {
    ${routePaths
      .filter((f) => !!f.name)
      .map((route) => `"${route.name}": \`${route.typePath}\``)
      .join(',')}
  }`;
}
