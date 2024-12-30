import type { ComponentProps } from 'react';

import { twMerge } from 'tailwind-merge';

import { FormTextField } from './FormInput';
import { Logo } from './Logo';
import { PrimaryButton } from './PrimaryButton';

interface Props extends ComponentProps<'div'> {
  inputName: string;
  url: string;
}
export function ClaimPage(props: Props) {
  const { className, url, inputName, ...rest } = props;

  return (
    <div
      className={twMerge('flex flex-col items-stretch', className)}
      {...rest}
    >
      <div className="flex flex-row items-center border rounded-full p-2 border-black shadow-xl bg-white">
        <div className="flex flex-col justify-center items-center px-4">
          <Logo size={20} isBare />
        </div>
        <div className="flex flex-col items-start">
          <span className="text-black text-sm">{url}&nbsp;/</span>
        </div>
        <div className="flex flex-col items-stretch justify-center grow">
          <FormTextField
            name={inputName}
            placeholder="name"
            innerClassName={twMerge(
              'text-sm border-none text-black outline-none ring-none px-1 bg-transparent',
            )}
            required
          />
        </div>
        <div className="hidden md:flex flex-col items-stretch shrink-0">
          <PrimaryButton
            type="submit"
            className="flex flex-row justify-center items-center gap-2 group py-4 px-6 text-sm rounded-full"
          >
            <span className="text-sm font-bold tracking-wide">Claim</span>
          </PrimaryButton>
        </div>
      </div>
      <div className="flex md:hidden flex-col items-stretch py-2">
        <PrimaryButton
          type="submit"
          className="flex flex-row justify-center items-center gap-2 group py-4 px-6 text-sm rounded-full"
        >
          <span className="text-sm font-bold tracking-wide">Claim</span>
        </PrimaryButton>
      </div>
    </div>
  );
}
