import { z } from 'zod';

export const SetProfilePictureSchema = z.object({
  imageId: z
    .string()
    .min(1, 'Please provide an image for your profile picture')
    .max(
      50,
      'Please use at most 50 characters for your profile picture image ID',
    ),
});

export const SaveSocialMediaLinksSchema = z.object({
  twitter: z
    .string()
    .max(100, 'Please use less than 100 characters of the twitter link'),
  github: z
    .string()
    .max(100, 'Please use less than 100 characters of the github link'),
  instagram: z
    .string()
    .max(100, 'Please use less than 100 characters of the instagram link'),
  youTube: z
    .string()
    .max(100, 'Please use less than 100 characters of the youTube link'),
  email: z
    .string()
    .max(100, 'Please use less than 100 characters of the email link'),
});

export enum SocialMedia {
  Twitter = 'Twitter',
  Github = 'Github',
  Instagram = 'Instagram',
  YouTube = 'YouTube',
  Email = 'Email',
}
