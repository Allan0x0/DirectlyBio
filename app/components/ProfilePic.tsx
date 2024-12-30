import type { Border } from '~/models/blocks';

import { type ComponentProps } from 'react';
import { twMerge } from 'tailwind-merge';

import { useBorders } from '~/hooks/useBorders';

interface Props extends Omit<ComponentProps<'a'>, 'children' | 'title'> {
  borders?: Border;
  image: {
    src: string;
    alt: string;
  };
}
export function ProfilePic(props: Props) {
  const { className, href, image, borders, ...rest } = props;

  const { className: borderClassName } = useBorders(borders || {});

  return (
    <a
      href={href}
      className={twMerge(
        'flex flex-col items-center justify-center gap-2 bg-stone-50',
        borderClassName,
        'rounded-full',
        className,
      )}
      {...rest}
    >
      <img
        src={image.src}
        alt={image.alt}
        className="object-contain h-[6rem] aspect-square rounded-full"
      />
    </a>
  );
}
