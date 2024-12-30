import type { Background, Border, Spacing, Typography } from '~/models/blocks';

import { type ComponentProps } from 'react';
import { twMerge } from 'tailwind-merge';

import { useBackgrounds } from '~/hooks/useBackgrounds';
import { useBorders } from '~/hooks/useBorders';
import { useSpacing } from '~/hooks/useSpacing';
import { useTypography } from '~/hooks/useTypography';

import { Desc } from './Desc';
import { Title } from './Title';

interface Props extends Omit<ComponentProps<'a'>, 'children' | 'title'> {
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
export function CenteredText(props: Props) {
  const {
    className,
    href,
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
        'flex flex-col justify-center items-center p-4 gap-1',
        'hover:scale-[102%] transition-all duration-200',
        borderClassName,
        bgClassName,
        spacingClassName,
        className,
      )}
      {...rest}
    >
      <Title className={titleTypographyClassName}>{title.content}</Title>
      {!!desc && (
        <Desc className={descTypographyClassName}>{desc.content}</Desc>
      )}
    </a>
  );
}
