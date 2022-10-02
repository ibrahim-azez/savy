import { HttpResponse } from './http-response.model';
export abstract class CrudService<T> {
  abstract create(...args: any[]): Promise<any>;
  abstract update(item: number, itemToBeUpdated: Partial<T>): Promise<T | null>;
  abstract getBy(item: T): Promise<T | null>;
  abstract getAll(item: T): Promise<Array<T> | null>;
  abstract delete(id: number): Promise<HttpResponse>;
}
