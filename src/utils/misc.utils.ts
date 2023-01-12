export function isItemLast(array: any[] | undefined, index: number): boolean {
  return array ? index === array.length - 1 : false;
}
