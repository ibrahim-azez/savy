import { validate, ValidatorOptions } from 'class-validator';

import { Class } from '@core';
import { environment } from '@environment';
import * as createError from 'http-errors';
import { StatusCodes } from 'http-status-codes';

export async function validator(
  classToBeValidated: Class,
  data: Record<string, unknown>
) {
  try {
    const instanceToBeValidate = new classToBeValidated(data);

    return await validate(instanceToBeValidate, {
      enableDebugMessages: !environment.production,
      whitelist: true, // I suppose this creates a white list with properties
      forbidNonWhitelisted: true, // I supposes this restrict by white list criteria
      forbidUnknownValues: true, // I don't know why exists

      validationError: { target: false, value: false },
    } as ValidatorOptions);
  } catch (err) {
    throw createError(StatusCodes.INTERNAL_SERVER_ERROR, 'Something went wrong');
  }
}
