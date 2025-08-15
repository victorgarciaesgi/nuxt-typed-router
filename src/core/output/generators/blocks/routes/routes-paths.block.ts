import type { DestructuredPath } from '../../../../../core/parser/params';
import type { RoutePathsDecl } from '../../../../../types';
import { returnIfTrue } from '../../../../../../src/utils';
import { moduleOptionStore } from '../../../../../../src/core/config';
import { camelCase, capitalize, startCase } from 'lodash-es';

function pascalCase(str?: string) {
  return startCase(camelCase(str)).replace(/ /g, '');
}

export function createRoutePathSchema(routePaths: RoutePathsDecl[]) {
  const paths = routePaths.filter((f) => !!f.path);
  return `export type RoutePathSchema = 
    ${paths.length ? paths.map((route) => `"${route.path}"`).join('|') : 'any'}
  `;
}

export function createLocaleRoutePathSchema(routePaths: RoutePathsDecl[]) {
  const paths = routePaths.filter((f) => !!f.path && !f.isLocale);
  return `export type LocaleRoutePathSchema = 
    ${paths.length ? paths.map((route) => `"${route.path}"`).join('|') : 'any'}
  `;
}

export function createValidatePathTypes(
  pathElements: DestructuredPath[][][],
  routesList: string[],
  withLocale = false
): string {
  let pathConditions = pathElements
    .map((m) => createTypeValidatePathCondition(m, withLocale))
    .filter((f) => {
      if (withLocale) {
        return !f.isLocale;
      }
      return true;
    });

  const conditionsList = pathConditions.map((m) => m.condition);

  return `
    ${pathConditions.length ? conditionsList.join('\n\n') : ''}

    export type Validate${returnIfTrue(
      withLocale,
      'Locale'
    )}Path<T extends string> = T extends string 
      ? T extends '/' 
        ? T 
         ${
           pathConditions.length
             ? `:${pathConditions.map((t) => `${t.typeName}<T> extends true ? T`).join(': ')}`
             : ''
         } 
      : string extends T
      ? T
      : ${
        pathConditions.length
          ? `\`Error: \${${pathConditions.map((t) => `${t.typeName}<T>`).join('|')}}\``
          : 'never'
      }
      : never;
  
    // RouteNameFromPath, RouteNameFromLocalePath
    export type RouteNameFrom${returnIfTrue(
      withLocale,
      'Locale'
    )}Path<T extends string> = T extends string 
      ? T extends '/' 
        ? "index"
         ${
           pathConditions.length
             ? `: ${
                 pathConditions.filter((f) => routesList.includes(f.routeName)).length
                   ? pathConditions
                       .filter((f) => routesList.includes(f.routeName))
                       .map((t) => `${t.typeName}<T> extends true ? "${t.routeName}"`)
                       .join(': ') + ": never"
                   : 'any'
      }`
             : ': never'
         } 
       : never; 
  
        `;
}

export function createTypedRouteFromPathType(
  pathElements: DestructuredPath[][][],
  withLocale?: boolean
): string {
  let pathConditions = pathElements.map((m) => createTypeValidatePathCondition(m, withLocale));

  return `
    export type ValidatePath<T extends string> = T extends string 
      ? T extends '/' 
        ? 'index' 
        : ${
          pathConditions.length
            ? pathConditions.map((t) => `${t.typeName}<T> extends true ? T`).join(': ')
            : 'never'
        } 
      : \ ${
        pathConditions.length
          ? `Error: \${${pathConditions.map((t) => `${t.typeName}<T>`).join('|')}}\``
          : 'never'
      } : 'Type should be a string';
  `;
}

export function createTypeValidatePathCondition(
  elements: DestructuredPath[][],
  withLocale?: boolean
) {
  const seedName = pascalCase(elements?.[0]?.[0]?.fullPath);
  const typeName = `Validate${returnIfTrue(withLocale, 'Locale')}${seedName}`;
  const params = new Map();
  const routeName = elements.flat()[0]?.routeName ?? 'index';
  const hasOnlyNames = elements.flat().every((elem) => elem.type === 'name');
  const isLocale = elements.flat()[0]?.isLocale ?? false;

  const condition = `type ${typeName}<T> = T extends \`/${elements
    .map((elementArray, index) => {
      return elementArray
        .map((elem) => {
          const isLast = index === elements.flat().length - 1;

          if (elem.type === 'name' && isLast) {
            const id = `T${pascalCase(elem.content)}`;
            params.set(elem.id, id);
            return `${elem.content}\${infer ${id}}`;
          } else if (elem.type === 'name') {
            return elem.content;
          } else if (elem.type === 'param' || elem.type === 'optionalParam') {
            const id = `T${pascalCase(elem.content)}`;
            params.set(elem.id, id);
            return `\${infer ${id}}`;
          } else if (elem.type === 'catchAll') {
            return `\${string}`;
          }
        })
        .join('');
    })
    .join('/')}\`
    ? ${elements
      .flat()
      .map((elem, index) => {
        let output = '';
        const isLast = index === elements.flat().length - 1;
        const isName = elem.type === 'name';
        const isOptional = elem.type === 'optionalParam';
        const isParam = elem.type === 'param';
        const isCatchAll = elem.type === 'catchAll';

        if (isName && isLast) {
          output = `ValidEndOfPath<${params.get(elem.id)}> extends false ? "End of path '${
            elem.fullPath
          }' is invalid" : true :`;
        } else if (isParam && isLast) {
          output = `ValidParam<${params.get(elem.id)}> extends false ? "Parameter {${
            elem.content
          }} of path '${elem.fullPath}' is invalid" : true :`;
        } else if (isParam) {
          output = `ValidStringPath<${params.get(elem.id)}> extends false ? "Parameter {${
            elem.content
          }} of path '${elem.fullPath}' is required" : `;
        } else if (isOptional && isLast) {
          output = `ValidParam<${params.get(elem.id)}, false> extends false ? "Parameter {${
            elem.content
          }} of path '${elem.fullPath}' is invalid" : true :`;
        } else if (isLast) {
          output += 'true :';
        }
        return output;
      })
      .join('')} false ;`;

  return {
    typeName,
    condition,
    routeName,
    isLocale,
  };
}
