import type { ComponentProps } from 'react';

import { twMerge } from 'tailwind-merge';

interface Props extends ComponentProps<'div'> {}
export function PhoneContainer(props: Props) {
  const { className, children, ...rest } = props;
  return (
    <div
      className={twMerge(
        'border-[12px] lg:border-[14px] border-black/75 bg-white/10',
        'rounded-[3.5rem] lg:rounded-[4rem] overflow-hidden',
        'md:aspect-[9/18] flex flex-col items-stretch',
        className,
      )}
      {...rest}
    >
      {children}
    </div>
  );
}

// className={twMerge(
//   'border-t-[12px] border-l-[12px] border-r-[12px] lg:border-[14px] border-black/75 bg-white/10',
//   'rounded-t-[3.5rem] lg:rounded-[4rem] overflow-hidden',
//   'max-h-[28rem] md:max-h-none md:aspect-[9/18]',
//   className,
// )}
