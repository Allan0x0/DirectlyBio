import { z } from 'zod';

export const GoogleCallbackSchema = z.object({
  _json: z.object({
    sub: z.string().min(1),
    name: z.string().min(1),
    picture: z.string().min(1),
    email: z.string().min(1),
  }),
});
// accessToken, refreshToken, extraParams, profile

export enum SocialsProvider {
  GOOGLE = "Google",
  FACEBOOK = "Facebook"
}