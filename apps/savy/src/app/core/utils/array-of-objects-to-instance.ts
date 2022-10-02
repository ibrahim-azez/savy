import { Class } from '@core';

export function arrayOfObjectsToInstance<T = any>(
  classToBeValidated: Class,
  arr: Array<T>
): Array<T> {
  if (Array.isArray(arr))
    return arr.map((value) => new classToBeValidated(value));
  return arr;
}
