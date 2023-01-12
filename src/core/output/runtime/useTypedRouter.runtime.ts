import { watermarkTemplate } from '../templates';

export function createRuntimeUseTypedRouterFile(routesDeclTemplate: string): string {
  return `
  ${watermarkTemplate}
  import { useRouter } from '#app';
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
    const router = useRouter();

    const routesList = ${routesDeclTemplate};

    return {
      router,
      routes: routesList,
    } as any;
  };

  `;
}
