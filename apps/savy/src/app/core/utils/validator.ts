import { validate, ValidatorOptions } from 'class-validator';

import { Class } from '@core';
import { environment } from '@environment';

export async function validator(classToBeValidated: Class, data: any) {
  const instanceToBeValidate = new classToBeValidated(data);

  return await validate(instanceToBeValidate, {
    enableDebugMessages: !environment.production,
    whitelist: true, // I suppose this creates a white list with properties
    forbidNonWhitelisted: true, // I supposes this restrict by white list criteria
    forbidUnknownValues: true, // I don't know why exists

    validationError: { target: false, value: false },
  } as ValidatorOptions);
}
