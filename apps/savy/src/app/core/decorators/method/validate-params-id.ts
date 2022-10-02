// import { validator } from '@core';
import { validator, logger } from '@core';
import * as createError from 'http-errors';

export function ValidateParamsId() {
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ) {
    const originalMethod = descriptor.value;
    descriptor.value = async function (...args: Array<any>): Promise<any> {
      try {
        const id = args[0].params['id'];
        if (!id)
          return args[1].status(404).json({
            statsCode: 404,
            message: 'you did not give an id',
          });

        return await originalMethod.apply(this, args);
      } catch (error: any) {
        logger.error(error);
        throw createError(
          error?.response?.statusCode ??
            error.statusCode ??
            error?.status ??
            500,

          error?.response?.message ?? error?.message ?? 'Something Went Wrong'
        );
      }
    };
  };
}
