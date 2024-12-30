import type { ActionData, FormFieldKey } from './forms';
import type { z } from 'zod';

import { data } from '@remix-run/node';

import { extractStringFields, StatusCode } from './core.validations';

export function badRequest<F extends FormFieldKey = string>(
  suppliedData: ActionData<F>,
) {
  return data(suppliedData, { status: StatusCode.BadRequest });
}

export function processBadRequest(
  zodError: z.ZodError<unknown>,
  fields: Record<string, FormDataEntryValue>,
  dontLog?: 'dontLog',
) {
  const { formErrors, fieldErrors } = zodError.flatten();
  if (!dontLog) {
    console.log('fields', fields);
    console.log('fieldErrors', fieldErrors);
    console.log('formErrors', formErrors);
  }
  return badRequest({
    fields: extractStringFields(fields),
    fieldErrors,
    formError: formErrors.join(', '),
  });
}
