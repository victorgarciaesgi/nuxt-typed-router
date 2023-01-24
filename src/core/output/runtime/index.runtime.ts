import { watermarkTemplate } from '../templates';

export function createRuntimeIndexFile(): string {
  return /* typescript */ `
  ${watermarkTemplate}
  export { routesNames } from './__routes';
  export type { TypedRouteList, TypedRouteNamedMapper, TypedRouteParams } from './__routes';
  export {useRouter} from './__useTypedRouter';
  export {useRoute} from './__useTypedRoute';
  export type {TypedRoute, TypedRouter, TypedNamedRoute } from './__router';
  export * from './__utils';
  `;
}
