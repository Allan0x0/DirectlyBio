import type { ComponentProps } from 'react';

import { twMerge } from 'tailwind-merge';

interface Props extends ComponentProps<'div'> {
  isPending?: boolean;
  innerClassName?: string;
  darkMode?: boolean;
}
export function UnderLine(props: Props) {
  const {
    darkMode,
    children,
    isPending,
    className,
    innerClassName,
    ...restOfProps
  } = props;
  return (
    <div
      className={twMerge('group flex flex-col items-stretch gap-0', className)}
      {...restOfProps}
    >
      {children}
      <span
        className={twMerge(
          'block h-0.5 max-w-full rounded-full bg-black/80',
          darkMode && 'bg-white/80',
          isPending && 'animate-pulse',
          innerClassName,
        )}
      />
    </div>
  );
}
