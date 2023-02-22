export * from './tsd.utils';
export * from './typecheck';

export function timeout(count: number) {
  return new Promise((resolve) => setTimeout(resolve, count));
}
