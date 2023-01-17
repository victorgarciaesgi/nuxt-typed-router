import { watermarkTemplate } from '../templates';

export function createRuntimeIndexFile(): string {
  return `
  ${watermarkTemplate}
  export { routesNames } from './__routes';
  export type { TypedRouteList } from './__routes';
  export {useRouter} from './__useTypedRouter';
  export {useRoute} from './__useTypedRoute';
  `;
}
