import type { ComponentProps } from 'react';
import { twMerge } from 'tailwind-merge';

interface Props {
  children: string;
}

const baseClassName = twMerge(
  'flex flex-col items-center justify-center rounded-xl bg-stone-400/40 px-2 backdrop-blur-sm',
);

export function Chip(props: Props) {
  const { children } = props;
  return (
    <div className={baseClassName}>
      <span className="text-xs font-light text-stone-600">{children}</span>
    </div>
  );
}

export function ChipButton(props: ComponentProps<'button'>) {
  const { children, className, ...rest } = props;
  return (
    <button
      className={twMerge(
        baseClassName,
        'transition-all duration-75 hover:bg-stone-400/40',
        className,
      )}
      {...rest}
    >
      {children}
    </button>
  );
}
