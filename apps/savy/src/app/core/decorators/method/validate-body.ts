// import { validator } from '@core';
import { validator, logger } from '@core';
import * as createError from 'http-errors';
import { HttpResponse } from '../../models/http-response.model';

export function ValidateBody(classToBeValidated: any) {
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ) {
    const originalMethod = descriptor.value;
    descriptor.value = async function (...args: Array<any>): Promise<any> {
      try {
        const validated = await validator(classToBeValidated, args[0].body);

        if (validated.length) {
          return args[1].status(400).send(validated);
        }

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
