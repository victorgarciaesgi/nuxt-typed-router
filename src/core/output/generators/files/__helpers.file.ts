import { returnIfFalse, returnIfTrue } from '../../../../utils';
import { moduleOptionStore } from '../../../config';

export function createHelpersFile() {
  const { pathCheck } = moduleOptionStore;

  return /* typescript */ `
  
  

  import type { RouteLocationRaw } from 'vue-router';
  import type { TypedRouteLocationRawFromName, TypedLocationAsRelativeRaw } from './__router';
  import type { RoutesNamesList } from './__routes';
  ${returnIfTrue(
    pathCheck,
    `import type {TypedPathParameter, RouteNameFromPath} from './__paths';`
  )}

export const helpers = {
  route<T extends RoutesNamesList = never, P extends string = never>(
    to: TypedRouteLocationRawFromName<T, P>
  ): [T] extends [never]
    ? string
    : Required<
        Omit<Exclude<RouteLocationRaw, string>, 'name' | 'params' | 'path'> & TypedLocationAsRelativeRaw<T>
      > {
    return to as any;
  },
  path<T extends string = never>(
    to: TypedPathParameter<T>
  ): [T] extends [never]
    ? string
    : Required<TypedRouteLocationRawFromName<RouteNameFromPath<T>, T>> {
    return to as any;
  },
};

   
  `;
}
