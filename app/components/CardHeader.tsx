import type { Border, Typography, Background, Spacing } from '~/models/blocks';

import { type ComponentProps } from 'react';
import { twMerge } from 'tailwind-merge';

import { useBackgrounds } from '~/hooks/useBackgrounds';
import { useBorders } from '~/hooks/useBorders';
import { useSpacing } from '~/hooks/useSpacing';
import { useTypography } from '~/hooks/useTypography';

import { Desc } from './Desc';
import { Title } from './Title';

interface Props extends Omit<ComponentProps<'a'>, 'children' | 'title'> {
  image: {
    src: string;
  };
  title: {
    content: string;
    typography?: Typography;
  };
  desc?: {
    content: string;
    typography?: Typography;
  };
  borders?: Border;
  background?: Background;
  spacing?: Spacing;
}
export function CardHeader(props: Props) {
  const {
    className,
    href,
    image,
    title,
    desc,
    background,
    borders,
    spacing,
    ...rest
  } = props;

  const { className: titleTypographyClassName } = useTypography(
    title.typography || {},
  );
  const { className: descTypographyClassName } = useTypography(
    desc?.typography || {},
  );
  const { className: borderClassName } = useBorders(borders || {});
  const { className: bgClassName } = useBackgrounds(background || {});
  const { className: spacingClassName } = useSpacing(spacing || {});

  return (
    <a
      href={href}
      className={twMerge(
        'flex flex-row items-stretch gap-2 bg-white overflow-hidden',
        'hover:scale-[102%] transition-all duration-200',
        borderClassName,
        bgClassName,
        className,
      )}
      {...rest}
    >
      <div className="flex flex-col justify-center items-start bg-stone-50 overflow-hidden">
        <img
          src={image.src}
          alt={title.content}
          className="object-contain h-[6rem] aspect-square"
        />
      </div>
      <div
        className={twMerge(
          'flex flex-col justify-center items-start gap-1 p-4 col-span-2',
          spacingClassName,
        )}
      >
        <Title className={titleTypographyClassName}>{title.content}</Title>
        {!!desc && (
          <Desc className={descTypographyClassName}>{desc.content}</Desc>
        )}
      </div>
    </a>
  );
}
