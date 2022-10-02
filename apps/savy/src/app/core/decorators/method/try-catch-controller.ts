import * as createError from 'http-errors';
import createHttpError = require('http-errors');

export function TryCatchController(statusCode?: number, message?: string) {
  return function (
    target: Record<string, unknown> | any,
    propertyKey: string | symbol,
    descriptor: PropertyDescriptor
  ): any {
    const originalMethod = descriptor.value;

    descriptor.value = async function (...args: Array<any>): Promise<any> {
      try {
        return await originalMethod.apply(this, args);
      } catch (error: any) {
        args[1]
          .status(
            error?.response?.statusCode ??
              error.statusCode ??
              statusCode ??
              error?.status ??
              500
          )
          .json({
            statusCode:
              error?.response?.statusCode ??
              error.statusCode ??
              statusCode ??
              error?.status ??
              500,
            message:
              message ??
              error?.response?.message ??
              error?.message ??
              'Something Went Wrong',
          });
        return;
      }
    };

    return descriptor;
  };
}
