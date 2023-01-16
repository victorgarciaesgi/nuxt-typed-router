import { watermarkTemplate } from '../templates';

export function createRuntimeIndexFile(): string {
  return `
  ${watermarkTemplate}
  export { routesNames } from './__routes';
  export type { TypedRouteList } from './__routes';
  export * from './__useTypedRouter';
  export * from './__useTypedRoute';
  `;
}
