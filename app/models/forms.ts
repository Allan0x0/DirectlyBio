import { z } from 'zod';

export type FormFieldKey = string | number | symbol;

export type FormFields<K extends FormFieldKey = string> = Partial<
  Record<K, string>
>;
export type FieldErrors<K extends FormFieldKey = string> = Partial<
  Record<K, string[] | undefined>
>;

export interface ActionData<K extends FormFieldKey = string> {
  formError?: string;
  fields?: FormFields<K>;
  fieldErrors?: FieldErrors<K>;
}

const FormErrorSchema = z.object({
  formError: z.string().min(1),
});
export function hasFormError(
  data: unknown,
): data is z.infer<typeof FormErrorSchema> {
  return FormErrorSchema.safeParse(data).success;
}

const FieldErrorsSchema = z.object({
  fieldErrors: z.record(z.string().array().optional()),
});
export function hasFieldErrors(
  data: unknown,
): data is z.infer<typeof FieldErrorsSchema> {
  return FieldErrorsSchema.safeParse(data).success;
}

const FieldsSchema = z.object({
  fields: z.record(z.string()),
});
export function hasFields(data: unknown): data is z.infer<typeof FieldsSchema> {
  return FieldsSchema.safeParse(data).success;
}

const Schema = z.object({
  errorMessage: z.string(),
});
export function hasErrorMessage(data: unknown): data is z.infer<typeof Schema> {
  return Schema.safeParse(data).success;
}

export function fieldErrorsToArr(fieldErrors: FieldErrors) {
  const output: string[] = [];
  for (const key of Object.keys(fieldErrors)) {
    const errors = fieldErrors[key];
    if (errors) {
      output.push(errors.join(', '));
    }
  }
  return output;
}

export async function getRawFormFields(request: Request) {
  const formData = await request.formData();
  return Object.fromEntries(formData.entries());
}

export function flattenFieldErrors(fieldErrors: FieldErrors) {
  const errors: string[] = [];
  for (const key of Object.keys(fieldErrors)) {
    errors.push(`${key}: ${fieldErrors[key]?.join(', ')}`);
  }
  return errors.join(', ');
}
