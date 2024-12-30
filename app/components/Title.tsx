import type { ComponentProps } from 'react';

import { twMerge } from 'tailwind-merge';

interface Props extends ComponentProps<'span'> {}
export function Title(props: Props) {
  const { className, children, ...rest } = props;
  return (
    <span className={twMerge('text-base', className)} {...rest}>
      {children}
    </span>
  );
}
