import type { ComponentProps } from 'react';

import { twMerge } from 'tailwind-merge';

interface Props extends ComponentProps<'div'> {
  darkMode?: boolean;
}
export function UnderLineOnHover(props: Props) {
  const { children, darkMode, className, ...restOfProps } = props;
  return (
    <div
      className={twMerge('group flex flex-col items-stretch gap-0', className)}
      {...restOfProps}
    >
      {children}
      <span
        className={twMerge(
          'block h-0.5 max-w-0 rounded-full bg-black/80 transition-all duration-150 group-hover:max-w-full',
          darkMode && 'bg-white/80',
        )}
      />
    </div>
  );
}
