import { validate } from 'class-validator';
import * as createError from 'http-errors';
import createHttpError = require('http-errors');

export function ValidateBody(classToBeValidated: any) {
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ) {
    const originalMethod = descriptor.value;
    descriptor.value = async function (...args: Array<any>): Promise<any> {
      try {
        const validated = await validate(new classToBeValidated(args[0].body), {
          whitelist: true,
          forbidNonWhitelisted: true,
          validationError: { target: false, value: false },
        });

        if (validated.length) {
          args[1].status(400).send(validated);
          return;
        }

        return await originalMethod.apply(this, args);
      } catch (error: any) {
        throw createError(
          error?.response?.statusCode ??
            error.statusCode ??
            error?.status ??
            500,

          error?.response?.message ?? error?.message ?? 'Something Went Wrong'
        );
        // args[1]
        //   .status(
        //     error?.response?.statusCode ??
        //       error.statusCode ??
        //       error?.status ??
        //       500
        //   )
        //   .json({
        // statusCode:
        //   error?.response?.statusCode ??
        //   error.statusCode ??
        //   error?.status ??
        //   500,
        // message:
        //   error?.response?.message ??
        //   error?.message ??
        //   'Something Went Wrong',
        //   });
        // return;
      }
    };
  };
}
