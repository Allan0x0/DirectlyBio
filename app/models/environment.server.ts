import { z } from 'zod';

import { PresentStringSchema } from './core.validations';

const EnvSchema = z.object({
  SESSION_SECRET: PresentStringSchema,
  SERVER_URL: PresentStringSchema,

  GOOGLE_CLIENT_ID: PresentStringSchema,
  GOOGLE_CLIENT_SECRET: PresentStringSchema,

  CLOUDINARY_CLOUD_NAME: PresentStringSchema,
  CLOUDINARY_API_KEY: PresentStringSchema,
  CLOUDINARY_API_SECRET: PresentStringSchema,
  CLOUDINARY_UPLOAD_RESET: PresentStringSchema,
});
const result = EnvSchema.safeParse(process.env);
if (!result.success) {
  console.log('Error occurred reading environment variables', result.error);
  process.exit(1);
}
export const Env = result.data;
