import { z } from 'zod';

// type row {
//   children: block[]
// }

// row = block[]
// template {
//   mode: dark/light
//   primary_text_color
//   // bg (color, image, style?)
//   primary bg
//   secondary bg?
//   bg_style (folded_bg)
//   rows -> row[]
// }

export enum LinkType {
  CenteredText = 'CenteredText',
  CardHeader = 'CardHeader',
  StandardCard = 'StandardCard',
  Thumbnail = 'Thumbnail',
}
export const LinkTypeSchema = z.nativeEnum(LinkType);

export enum BlockType {
  ProfilePic = 'ProfilePic',
  SocialMediaLink = 'SocialMediaLink',
  ShareButton = 'ShareButton',
  SearchBar = 'SearchBar',

  CenteredText = 'CenteredText',
  CardHeader = 'CardHeader',
  StandardCard = 'StandardCard',
  Thumbnail = 'Thumbnail',

  Carousel = 'Carousel',
  YouTubeVideo = 'YouTubeVideo',
  Grow = 'Grow',
  Text = 'Text',

  Column = 'Column',
  Row = 'Row',
}
export const BlockTypeSchema = z.nativeEnum(BlockType);

export enum SocialMediaBrand {
  Instagram = 'Instagram',
  Twitter = 'Twitter',
  Youtube = 'Youtube',
  Whatsapp = 'Whatsapp',
  Facebook = 'Facebook',
  Tiktok = 'Tiktok',
  Linkedin = 'Linkedin',
  Patreon = 'Patreon',
  Medium = 'Medium',
}
export const SocialMediaBrandSchema = z.nativeEnum(SocialMediaBrand);

const ZeroTo6Schema = z
  .literal(0)
  .or(z.literal(1))
  .or(z.literal(2))
  .or(z.literal(3))
  .or(z.literal(4))
  .or(z.literal(5))
  .or(z.literal(6));

export const SpacingSchema = z
  .object({
    p: ZeroTo6Schema,
    px: ZeroTo6Schema,
    py: ZeroTo6Schema,
    gap: ZeroTo6Schema,
  })
  .partial();
export type Spacing = z.infer<typeof SpacingSchema>;

export const BackgroundSchema = z
  .object({
    color: z.enum([
      'white',
      'black',
      'slate',
      'gray',
      'zinc',
      'neutral',
      'stone',
      'red',
      'orange',
      'amber',
      'yellow',
      'lime',
      'green',
      'emerald',
      'teal',
      'cyan',
      'sky',
      'blue',
      'indigo',
      'violet',
      'purple',
      'fuchsia',
      'pink',
      'rose',
    ]),
  })
  .partial();
export type Background = z.infer<typeof BackgroundSchema>;

export const BorderSchema = z
  .object({
    shadow: z
      .literal(0)
      .or(z.literal(1))
      .or(z.literal(2))
      .or(z.literal(3))
      .or(z.literal(4)),
    width: z
      .literal(0)
      .or(z.literal(1))
      .or(z.literal(2))
      .or(z.literal(3))
      .or(z.literal(4)),
    color: z.enum([
      'white',
      'black',
      'slate',
      'gray',
      'zinc',
      'neutral',
      'stone',
      'red',
      'orange',
      'amber',
      'yellow',
      'lime',
      'green',
      'emerald',
      'teal',
      'cyan',
      'sky',
      'blue',
      'indigo',
      'violet',
      'purple',
      'fuchsia',
      'pink',
      'rose',
    ]),
  })
  .partial();
export type Border = z.infer<typeof BorderSchema>;

export const TypographySchema = z
  .object({
    size: z
      .literal(1)
      .or(z.literal(2))
      .or(z.literal(3))
      .or(z.literal(4))
      .or(z.literal(5))
      .or(z.literal(6)),
    color: z.enum([
      'white',
      'slate',
      'gray',
      'zinc',
      'neutral',
      'stone',
      'red',
      'orange',
      'amber',
      'yellow',
      'lime',
      'green',
      'emerald',
      'teal',
      'cyan',
      'sky',
      'blue',
      'indigo',
      'violet',
      'purple',
      'fuchsia',
      'pink',
      'rose',
    ]),
  })
  .partial();
export type Typography = z.infer<typeof TypographySchema>;

export const ProfilePicSchema = z.object({
  blockType: z.literal(BlockType.ProfilePic),
  borders: BorderSchema.optional(),
  image: z.object({
    imageId: z.string(),
  }),
});
export const SocialMediaLinkSchema = z.object({
  blockType: z.literal(BlockType.SocialMediaLink),
  url: z.string(),
  brand: SocialMediaBrandSchema,
  type: z.enum(['Bare', 'WithContainer']),
});
export const ShareButtonSchema = z.object({
  blockType: z.literal(BlockType.ShareButton),
  text: z.string(),
});
export const SearchBarSchema = z.object({
  blockType: z.literal(BlockType.SearchBar),
});

export const CenteredTextSchema = z.object({
  blockType: z.literal(BlockType.CenteredText),
  url: z.string(),
  title: z.object({
    content: z.string(),
    typography: TypographySchema.optional(),
  }),
  desc: z
    .object({
      content: z.string(),
      typography: TypographySchema.optional(),
    })
    .optional(),
  borders: BorderSchema.optional(),
  background: BackgroundSchema.optional(),
  spacing: SpacingSchema.optional(),
});
export const CardHeaderSchema = z.object({
  blockType: z.literal(BlockType.CardHeader),
  url: z.string(),
  image: z.object({
    imageId: z.string(),
  }),
  title: z.object({
    content: z.string(),
    typography: TypographySchema.optional(),
  }),
  desc: z
    .object({
      content: z.string(),
      typography: TypographySchema.optional(),
    })
    .optional(),
  borders: BorderSchema.optional(),
  background: BackgroundSchema.optional(),
  spacing: SpacingSchema.optional(),
});
export const StandardCardSchema = z.object({
  blockType: z.literal(BlockType.StandardCard),
  url: z.string(),
  image: z.object({
    imageId: z.string(),
  }),
  title: z.object({
    content: z.string(),
    typography: TypographySchema.optional(),
  }),
  desc: z
    .object({
      content: z.string(),
      typography: TypographySchema.optional(),
    })
    .optional(),
  borders: BorderSchema.optional(),
  background: BackgroundSchema.optional(),
  spacing: SpacingSchema.optional(),
});
export const ThumbnailSchema = z.object({
  blockType: z.literal(BlockType.Thumbnail),
  url: z.string(),
  image: z.object({
    imageId: z.string(),
  }),
  title: z.object({
    content: z.string(),
    typography: TypographySchema.optional(),
  }),
  borders: BorderSchema.optional(),
  background: BackgroundSchema.optional(),
  spacing: SpacingSchema.optional(),
});

export const BuildableBlockSchema = z.discriminatedUnion('blockType', [
  CenteredTextSchema,
  CardHeaderSchema,
  StandardCardSchema,
  ThumbnailSchema,
]);

export const CarouselSchema = z.object({
  blockType: z.literal(BlockType.Carousel),
  children: BuildableBlockSchema.array(),
});

export const YouTubeVideoSchema = z.object({
  blockType: z.literal(BlockType.Carousel),
  url: z.string(),
});

export const GrowSchema = z.object({
  blockType: z.literal(BlockType.Carousel),
  value: z.number(),
});

export const TextSchema = z.object({
  blockType: z.literal(BlockType.Carousel),
  content: z.string(),
  size: z.number(),
});

export const ColumnSchema = z.object({
  blockType: z.literal(BlockType.Column),
  children: z.any().array(),
});

export const RowSchema = z.object({
  blockType: z.literal(BlockType.Row),
  children: z.any().array(),
});

export const BlockSchema = z.discriminatedUnion('blockType', [
  ProfilePicSchema,
  SocialMediaLinkSchema,
  ShareButtonSchema,
  SearchBarSchema,

  CenteredTextSchema,
  CardHeaderSchema,
  StandardCardSchema,
  ThumbnailSchema,

  CarouselSchema,
  YouTubeVideoSchema,
  GrowSchema,
  TextSchema,

  RowSchema,
  ColumnSchema,
]);
export type Block = z.infer<typeof BlockSchema>;

export enum TemplateMode {
  Dark = 'Dark',
  Light = 'Light',
}

export enum BgStyle {
  FoldedBackground = 'FoldedBackground',
}
