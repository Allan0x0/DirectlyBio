import type { ComponentProps } from 'react';
import { twMerge } from 'tailwind-merge';

type Props = ComponentProps<'div'>
export function PhoneContainer(props: Props) {
  const { className, children, ...rest } = props;
  return (
    <div
      className={twMerge(
        'border-[4px] border-black bg-white/10 shadow-large',
        'rounded-3xl overflow-hidden md:aspect-[9/18] flex flex-col items-stretch',
        className,
      )}
      {...rest}
    >
      {children}
    </div>
  );
}