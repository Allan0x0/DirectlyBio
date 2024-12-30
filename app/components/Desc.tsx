import type { ComponentProps } from 'react';

import { twMerge } from 'tailwind-merge';

interface Props extends ComponentProps<'span'> {}
export function Desc(props: Props) {
  const { className, children, ...rest } = props;
  return (
    <span
      className={twMerge(
        'text-xs text-inherit opacity-40 font-normal',
        className,
      )}
      {...rest}
    >
      {children}
    </span>
  );
}
