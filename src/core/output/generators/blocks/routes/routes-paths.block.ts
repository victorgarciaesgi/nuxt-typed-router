import { camelCase, startCase } from 'lodash-es';
import { returnIfTrue } from '../../../../../../src/utils';
import type { RoutePathsDecl } from '../../../../../types';
import type { DestructuredPath } from '../../../../parser/pathControl';
import { moduleOptionStore } from '../../../../stores';

function pascalCase(str?: string) {
  return startCase(camelCase(str)).replace(/ /g, '');
}

export function createRoutePathSchema(routePaths: RoutePathsDecl[]) {
  const { i18nOptions } = moduleOptionStore;
  return `export type RoutePathSchema = 
    ${routePaths
      .filter((f) => !!f.path)
      .map((route) => `"${route.path}"`)
      .join('|')}
  `;
}

export function createLocaleRoutePathSchema(routePaths: RoutePathsDecl[]) {
  return `export type LocaleRoutePathSchema = 
    ${routePaths
      .filter((f) => !!f.path && !f.isLocale)
      .map((route) => `"${route.path}"`)
      .join('|')}
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
             ? `: ${pathConditions
                 .filter((f) => routesList.includes(f.routeName))
                 .map((t) => `${t.typeName}<T> extends true ? "${t.routeName}"`)
                 .join(': ')} : never`
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
  const seedName = pascalCase(elements[0][0].fullPath);
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
