export function createTypeUtilsRuntimeFile() {
  return /* typescript */ `
  
  import { RoutesNamesList, RoutesParamsRecord } from './__routes';

  // - Type utils
  export type ExtractRequiredParameters<T extends Record<string, any>> = Pick<
    T,
    { [K in keyof T]: undefined extends T[K] ? never : K }[keyof T]
  >;
  
  export type HasOneRequiredParameter<T extends RoutesNamesList> = [RoutesParamsRecord[T]] extends [
    never
  ]
    ? false
    : [keyof ExtractRequiredParameters<RoutesParamsRecord[T]>] extends [undefined]
    ? false
    : true;
  `;
}
