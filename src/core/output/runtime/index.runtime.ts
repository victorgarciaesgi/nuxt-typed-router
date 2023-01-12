import { watermarkTemplate } from '../templates';

export function createRuntimeIndexFile(): string {
  return `
  ${watermarkTemplate}
  export * from './__routes';
  export * from './__useTypedRouter';
  export * from './__useTypedRoute';
  `;
}
