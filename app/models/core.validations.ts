
import { data } from '@remix-run/node';
import { z } from 'zod';

import type { ActionData, FormFieldKey, FormFields } from './forms';

export enum ResponseMessage {
  Unauthorised = "You're not authorised to access this resource",
  InvalidId = 'Invalid ID provided',
  RecordNotFound = 'Record not found',
  DeletedRecord = 'Record was deleted',
  InvalidMethod = 'Invalid request method provided',
}

export enum StatusCode {
  BadRequest = 400,
  Unauthorised = 401,
  Forbidden = 403,
  NotFound = 404,
}

export const CleanPositiveIntSchema = z.number().positive();
export const StringNumber = z.coerce.number({
  invalid_type_error: 'Provide a valid number',
  required_error: 'Provide a number',
});
export const PositiveDecimalSchema = z.coerce.number().positive();
export const PerhapsZeroIntSchema = z.coerce.number().int().min(0);
export const PositiveIntSchema = z.coerce.number().int().min(1);
export const DateSchema = z.coerce.date();

export type inferSafeParseErrors<T extends z.ZodTypeAny> = {
  [P in keyof z.infer<T>]?: string[];
};

export function badRequest<F extends FormFieldKey = string>(
  suppliedData: ActionData<F>,
) {
  return data(suppliedData, { status: StatusCode.BadRequest });
}

export const INVALID_VALUES_FROM_SERVER =
  'Received invalid values from server, please contact out support team';

export const PresentStringSchema = z
  .string({
    invalid_type_error: 'Provide a valid string',
    required_error: 'Provide a string',
  })
  .min(1, { message: 'Use at least 1 character for the string' });

export function ComposeRecordIdSchema(
  identifier: string,
  optional?: 'optional',
) {
  const Schema = z.string({
    invalid_type_error: `Enter a valid ${identifier}`,
    required_error: `Enter a ${identifier}`,
  });
  if (optional) {
    return Schema;
  }
  return Schema.min(1, { message: `Enter a valid ${identifier}` });
}
export const RecordIdSchema = ComposeRecordIdSchema('record ID');

export const EmailSchema = z
  .string()
  .email()
  .min(4)
  .max(50)
  .transform((str) => str.toLowerCase().trim());

export function hasSuccess(data: unknown): data is { success: boolean } {
  return z.object({ success: z.literal(true) }).safeParse(data).success;
}

export function getValidatedId(rawId: unknown) {
  const result = RecordIdSchema.safeParse(rawId);
  if (!result.success) {
    throw new Response(ResponseMessage.InvalidId, {
      status: StatusCode.BadRequest,
    });
  }
  return result.data;
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

function extractStringFields(fields: Record<string, FormDataEntryValue>) {
  const result: FormFields = {};
  for (const field in fields) {
    const value = fields[field];
    if (typeof value === 'string') {
      result[field] = value;
    }
  }
  return result;
}

export function getQueryParams<T extends string>(url: string, params: T[]) {
  const urlObj = new URL(url);

  const output: Record<string, string | undefined> = {};
  for (const param of params) {
    output[param] = urlObj.searchParams.get(param) || undefined;
  }
  return output;
}

export const TitleSchema = z
  .string({
    required_error: 'Please enter the title',
    invalid_type_error: 'Please provide valid input for the title',
  })
  .min(1, 'Please enter the title first')
  .max(100, 'Please use less than 200 characters for the title');

export const RequiredImageIdSchema = z
  .string()
  .min(1, 'Please provide an image')
  .max(800);

export function formatAmount(amount: number, fractionDigits?: number) {
  const refinedAmount = Number(amount.toFixed(1));
  return refinedAmount.toLocaleString(undefined, {
    minimumFractionDigits: fractionDigits !== undefined ? fractionDigits : 2,
    maximumFractionDigits: fractionDigits !== undefined ? fractionDigits : 2,
  });
}
