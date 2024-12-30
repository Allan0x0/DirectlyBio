import type { ActionFunctionArgs } from '@remix-run/node';

import { z } from 'zod';

import { prisma } from '~/db.server';
import { badRequest, processBadRequest } from '~/models/core.validations';
import { getErrorMessage } from '~/models/errors';
import { getRawFormFields } from '~/models/forms';

export const CaptureEmailSchema = z.object({
  email: z.string().email().min(5),
});
export async function action({ request }: ActionFunctionArgs) {
  try {
    const fields = await getRawFormFields(request);
    const result = CaptureEmailSchema.safeParse(fields);
    if (!result.success) {
      return processBadRequest(result.error, fields);
    }
    const { email } = result.data;

    const numRecords = await prisma.subscription.count({
      where: { email },
    });
    if (numRecords) {
      throw new Error('Email already recorded');
    }
    if (!numRecords) {
      await prisma.subscription.create({
        data: { email },
      });
    }

    return { success: true };
  } catch (error) {
    return badRequest({ formError: getErrorMessage(error) });
  }
}
