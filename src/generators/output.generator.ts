import { RouteParamsDecl } from '../types';
import { signatureTemplate, staticDeclarations, staticDeclImports } from './output.templates';

export function createRuntimePluginFile(routesDeclTemplate: string): string {
  return `
  ${signatureTemplate}
  import { defineNuxtPlugin } from '#app';

  export default defineNuxtPlugin(() => {
    const router = useRouter();
    const routesList = ${routesDeclTemplate};

    return {
      provide: {
        typedRouter: router as TypedRouter,
        routesList,
      },
    };
  });
  `;
}

export function createRuntimeTypeRouterFile(routesDeclTemplate: string): string {
  return `
  ${signatureTemplate}
  import { useNuxtApp } from '#app';
  import { TypedRouter } from './typed-router';
  import { RouteListDecl } from './__routes';

  /** Returns instances of $typedRouter and $routesList fully typed to use in your components or your Vuex/Pinia store
   * 
   * @exemple
   * 
   * \`\`\`ts
   * const { router, routes } = useTypedRouter();
   * \`\`\`
   */
  export const useTypedRouter = (): {
    /** Export of $router with type check */
    router: TypedRouter,
    /** Contains a typed dictionnary of all your route names (for syntax sugar) */
    routes: RouteListDecl
  } => {
    const { $router } = useNuxtApp();

    const routesList = ${routesDeclTemplate};

    return {
      router: $router,
      routes: routesList,
    } as any;
  };

  `;
}

export function createRuntimeUseTypeRouteFile(routesDeclTemplate: string): string {
  return `
  ${signatureTemplate}
  import { useNuxtApp } from '#app';
  import { TypedRouteList } from './__routes';

  /** Acts the same as \`useRoute\`, but typed.
 *
 * @exemple
 *
 * \`\`\`ts
 * const route = useTypedRoute();
 * \`\`\`
 *
 * \`\`\`ts
 * const route = useTypedRoute('my-route-with-param-id');
 * route.params.id // autocompletes!
 * \`\`\`
 *
 * \`\`\`ts
 * const route = useTypedRoute();
 * if (route.name === 'my-route-with-param-id') {
 *    route.params.id // autocompletes!
 * }
 * \`\`\`
 */
export function useTypedRoute<T extends TypedRouteList = never>(
  name?: T
): [T] extends [never] ? TypedRoute : TypedNamedRoute<T> {
  const { $route } = useNuxtApp();

  return $route as any;
}

  `;
}

export function createRuntimeIndexFile(): string {
  return `
  ${signatureTemplate}
  export * from './__routes';
  export * from './__useTypedRouter';
  export * from './__useTypedRoute';
  `;
}

export function createRuntimeRoutesFile({
  routesList,
  routesObjectTemplate,
  routesObjectName,
  routesDeclTemplate,
  routesParams,
}: {
  routesList: string[];
  routesObjectName: string;
  routesObjectTemplate: string;
  routesDeclTemplate: string;
  routesParams: RouteParamsDecl[];
}): string {
  return `
    ${signatureTemplate}

    export const ${routesObjectName} = ${routesObjectTemplate};

    ${createTypedRouteListExport(routesList)}

    export type RouteListDecl = ${routesDeclTemplate};

    ${createTypedRouteParamsExport(routesParams)}

    ${createTypedRouteNamedMapperExport(routesParams)}

    ${createResolvedTypedRouteNamedMapperExport(routesParams)}
  `;
}

export function createDeclarationRoutesFile(): string {
  return `
    ${signatureTemplate}
    ${staticDeclImports}

    ${staticDeclarations}
  `;
}

export function createTypedRouteListExport(routesList: string[]): string {
  return `export type TypedRouteList = ${routesList.map((m) => `'${m}'`).join('|\n')}`;
}

export function createTypedRouteParamsExport(routesParams: RouteParamsDecl[]): string {
  return `export type TypedRouteParams = {
    ${routesParams
      .map(
        ({ name, params }) =>
          `"${name}": ${
            params.length
              ? `{
          ${params
            .map(({ key, required, type }) => `"${key}"${required ? '' : '?'}: ${type}`)
            .join(',\n')}
        }`
              : 'never'
          }`
      )
      .join(',\n')}
  }`;
}

export function createTypedRouteNamedMapperExport(routesParams: RouteParamsDecl[]): string {
  return `export type TypedRouteNamedMapper = 
    ${routesParams
      .map(
        ({ name, params }) =>
          `{name: "${name}" ${
            params.length
              ? `, params${params.some((s) => s.required) ? '' : '?'}: {
          ${params
            .map(({ key, required, type }) => `"${key}"${required ? '' : '?'}: ${type}`)
            .join(',\n')}
        }`
              : ''
          }}`
      )
      .join('|\n')}
  `;
}

export function createResolvedTypedRouteNamedMapperExport(routesParams: RouteParamsDecl[]): string {
  return `export type ResolvedTypedRouteNamedMapper = 
  {
    name: TypedRouteList;
    params: unknown;
  } & (
    ${routesParams
      .map(
        ({ name, params }) =>
          `{name: "${name}" ${
            params.length
              ? `, params: {
          ${params.map(({ key, type }) => `"${key}": ${type}`).join(',\n')}
        }`
              : ''
          }}`
      )
      .join('|\n')}
      )
  `;
}
