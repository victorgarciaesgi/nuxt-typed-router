import { returnIfTrue } from '../../../../utils';
import { moduleOptionStore } from '../../../config';

export function createDefinePageMetaFile(): string {
  const strictOptions = moduleOptionStore.getResolvedStrictOptions();
  const { experimentalPathCheck } = moduleOptionStore;

  return /* typescript */ `
  
  import { definePageMeta as defaultDefinePageMeta } from '#imports';
  import type {PageMeta, NuxtError} from '#app'
  import type {TypedRouteFromName, TypedRoute, TypedRouteLocationRawFromName, TypedRouteLocationRaw} from './__router';
  import type {RoutesNamesList} from './__routes';
  ${returnIfTrue(experimentalPathCheck, `import type {TypedPathParameter} from './__paths';`)}

  type FilteredPageMeta = {
    [T in keyof PageMeta as [unknown] extends [PageMeta[T]] ? never : T]: PageMeta[T];
  }

  export type TypedPageMeta<T extends RoutesNamesList> = Omit<FilteredPageMeta, 'redirect' | 'validate' | 'key'> & {
    /**
     * Validate whether a given route can validly be rendered with this page.
     *
     * Return true if it is valid, or false if not. If another match can't be found,
     * this will mean a 404. You can also directly return an object with
     * statusCode/statusMessage to respond immediately with an error (other matches
     * will not be checked).
     */
    validate?: (route: [T] extends [never] ? TypedRoute : TypedRouteFromName<T>) => boolean | Promise<boolean> | Partial<NuxtError> | Promise<Partial<NuxtError>>;
    key?: false | string | ((route: [T] extends [never] ? TypedRoute : TypedRouteFromName<T>) => string);
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
   * definePageMeta('current-location-name', {
   *   validate(route) {
   * });
   * // or
   * definePageMeta({
   *   validate(route) {
   * });
   * \`\`\`
   */
export function definePageMeta<P extends string, U extends RoutesNamesList>(
  meta: TypedPageMeta<never> & { redirect: TypedRouteLocationRawFromName<U, P> }
): void;
${returnIfTrue(
  experimentalPathCheck && !strictOptions.router.strictToArgument,
  `export function definePageMeta<P extends string>(
  meta: TypedPageMeta<never> & { redirect: TypedPathParameter<P> }
): void;`
)}
export function definePageMeta<P extends string = string>(
  meta: TypedPageMeta<never> & {
    redirect?: (to: TypedRoute) => TypedRouteLocationRaw<P> ${returnIfTrue(
      experimentalPathCheck && !strictOptions.router.strictToArgument,
      ` | TypedPathParameter<P>`
    )};
  }
): void;
export function definePageMeta<P extends string = string>(
  meta: TypedPageMeta<never> & {
    redirect?: () => TypedRouteLocationRaw<P> ${returnIfTrue(
      experimentalPathCheck && !strictOptions.router.strictToArgument,
      ` | TypedPathParameter<P>`
    )};
  }
): void;
export function definePageMeta<
  T extends RoutesNamesList,
  P extends string,
  U extends RoutesNamesList
>(routeName: T, meta: TypedPageMeta<T> & { redirect: TypedRouteLocationRawFromName<U, P> }): void;
${returnIfTrue(
  experimentalPathCheck && !strictOptions.router.strictToArgument,
  `export function definePageMeta<T extends RoutesNamesList, P extends string>(
  routeName: T,
  meta: TypedPageMeta<T> & { redirect: TypedPathParameter<P> }
): void;`
)}
export function definePageMeta<
  T extends RoutesNamesList,
  P extends string,
  U extends RoutesNamesList
>(
  routeName: T,
  meta: TypedPageMeta<T> & {
    redirect?: (to: TypedRouteFromName<T>) => TypedRouteLocationRaw<P> ${returnIfTrue(
      experimentalPathCheck && !strictOptions.router.strictToArgument,
      ` | TypedPathParameter<P>`
    )};
  }
): void;
export function definePageMeta<T extends RoutesNamesList, P extends string>(
  routeName: T,
  meta: TypedPageMeta<T> & {
    redirect?: () => TypedRouteLocationRaw<P> ${returnIfTrue(
      experimentalPathCheck && !strictOptions.router.strictToArgument,
      ` | TypedPathParameter<P>`
    )};
  }
): void;
export function definePageMeta(metaOrName: any, meta?: any): void {
  if (typeof metaOrName === 'string') {
    return defaultDefinePageMeta(meta as any);
  } else {
    return defaultDefinePageMeta(metaOrName as any);
  }
}

   
  `;
}
