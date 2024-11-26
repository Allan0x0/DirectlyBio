import type { ComponentProps } from 'react';
import { twMerge } from 'tailwind-merge';

export function UnderLineOnHover(props: ComponentProps<'div'>) {
  const { children, className, ...restOfProps } = props;
  return (
    <div
      className={twMerge('group flex flex-col items-stretch gap-0', className)}
      {...restOfProps}
    >
      {children}
      <span className="block h-0.5 max-w-0 rounded-full bg-black/80 transition-all duration-150 group-hover:max-w-full" />
    </div>
  );
}
