import type { ComponentProps } from 'react';

import { twMerge } from 'tailwind-merge';

interface Props extends ComponentProps<'div'> {
  message: string;
}
export function EmptyList(props: Props) {
  const { message, children, className } = props;
  return (
    <div
      className={twMerge(
        'flex flex-col items-center justify-center',
        className,
      )}
    >
      <span className="text-sm text-stone-400">{message}</span>
      {children ? <>{children}</> : null}
    </div>
  );
}
