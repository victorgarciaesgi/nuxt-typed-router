export function isItemLast(array: any[] | undefined, index: number): boolean {
  return array ? index === array.length - 1 : false;
}

export function returnIfTrue(condition: boolean | undefined, template: string, otherwise?: string) {
  if (condition) {
    return template;
  }
  return otherwise ?? '';
}

export function returnIfFalse(
  condition: boolean | undefined,
  template: string,
  otherwise?: string
) {
  if (!condition) {
    return template;
  }
  return otherwise ?? '';
}
