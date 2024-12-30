import type { Border, Typography, Background, Spacing } from '~/models/blocks';

import { type ComponentProps } from 'react';
import { twMerge } from 'tailwind-merge';

import { useBackgrounds } from '~/hooks/useBackgrounds';
import { useBorders } from '~/hooks/useBorders';
import { useSpacing } from '~/hooks/useSpacing';
import { useTypography } from '~/hooks/useTypography';

import { Title } from './Title';

interface Props extends Omit<ComponentProps<'a'>, 'children' | 'title'> {
  image: {
    src: string;
  };
  title?: {
    content: string;
    typography?: Typography;
  };
  borders?: Border;
  background?: Background;
  spacing?: Spacing;
}
export function ThumbnailCard(props: Props) {
  const {
    className,
    href,
    image,
    title,
    background,
    borders,
    spacing,
    ...rest
  } = props;

  const { className: titleTypographyClassName } = useTypography(
    title?.typography || {},
  );

  const { className: borderClassName } = useBorders(borders || {});
  const { className: bgClassName } = useBackgrounds(background || {});
  const { className: spacingClassName } = useSpacing(spacing || {});

  return (
    <a
      href={href}
      className={twMerge(
        'flex flex-col items-center justify-center gap-2 bg-white bg-cover bg-center h-[6rem]',
        borderClassName,
        bgClassName,
        className,
      )}
      style={{ backgroundImage: `url(${image.src})` }}
      {...rest}
    >
      <div
        className={twMerge(
          'flex flex-col justify-center items-center gap-1 p-4 col-span-2',
          spacingClassName,
        )}
      >
        {!!title && (
          <Title
            className={titleTypographyClassName}
            style={{ textShadow: '1px 1px #fff' }}
          >
            {title.content}
          </Title>
        )}
      </div>
    </a>
  );
}
