import { returnIfTrue } from '../../../../utils';
import { moduleOptionStore } from '$$/core/stores';

export function createDefinePageMetaFile(): string {
  const strictOptions = moduleOptionStore.getResolvedStrictOptions();
  const { pathCheck } = moduleOptionStore;

  return /* typescript */ `
  
  import { definePageMeta as defaultDefinePageMeta } from '#imports';
  import type {PageMeta, NuxtError} from 'nuxt/app'
  import type {TypedRouteFromName, TypedRoute, TypedRouteLocationRawFromName, TypedRouteLocationRaw} from './__router';
  import type {RoutesNamesList} from './__routes';
  ${returnIfTrue(pathCheck, `import type {TypedPathParameter} from './__paths';`)}

  type FilteredPageMeta = {
    [T in keyof PageMeta as [unknown] extends [PageMeta[T]] ? never : T]: PageMeta[T];
  }

  export type TypedPageMeta = Omit<FilteredPageMeta, 'redirect' | 'validate' | 'key'> & {
    /**
     * Validate whether a given route can validly be rendered with this page.
     *
     * Return true if it is valid, or false if not. If another match can't be found,
     * this will mean a 404. You can also directly return an object with
     * statusCode/statusMessage to respond immediately with an error (other matches
     * will not be checked).
     */
    validate?: (route: TypedRoute) => boolean | Promise<boolean> | Partial<NuxtError> | Promise<Partial<NuxtError>>;
    key?: false | string | ((route: TypedRoute) => string);
    /** Allow types augmented by other modules */
    [key: string]: any;
  }


  /** 
   * Typed clone of \`definePageMeta\`
   * 
   * ⚠️ Types for the redirect function may be buggy or not display autocomplete
   * Use \`helpers.route\` or \`helpers.path\` to provide autocomplete.
   *
   * \`\`\`ts
   * import {helpers} from '@typed-router';
   * definePageMeta({
   *   redirect(route) {
   *      return helpers.path('/foo')
   *   }
   * });
   * \`\`\`
   * @exemple
   * 
   * \`\`\`ts
   * definePageMeta({
   *   validate(route) {
   * });
   * \`\`\`
   */
export function definePageMeta<P extends string, U extends RoutesNamesList>(
  meta: TypedPageMeta & { redirect: TypedRouteLocationRawFromName<U, P> }
): void;
${returnIfTrue(
  pathCheck && !strictOptions.router.strictToArgument,
  `export function definePageMeta<P extends string>(
  meta: TypedPageMeta & { redirect: TypedPathParameter<P> }
): void;`
)}
export function definePageMeta<P extends string = string>(
  meta: TypedPageMeta & {
    redirect?: (to: TypedRoute) => TypedRouteLocationRaw<P> ${returnIfTrue(
      pathCheck && !strictOptions.router.strictToArgument,
      ` | TypedPathParameter<P>`
    )};
  }
): void;
export function definePageMeta<P extends string = string>(
  meta: TypedPageMeta & {
    redirect?: () => TypedRouteLocationRaw<P> ${returnIfTrue(
      pathCheck && !strictOptions.router.strictToArgument,
      ` | TypedPathParameter<P>`
    )};
  }
): void;
export function definePageMeta(meta?: TypedPageMeta): void {
  return defaultDefinePageMeta(meta);
}
   
  `;
}
