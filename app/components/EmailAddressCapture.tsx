import type { ComponentProps } from 'react';
import { twMerge } from 'tailwind-merge';

import { useFetcher } from '@remix-run/react';
import { action, CaptureEmailSchema } from '~/routes/capture-email';
import { useForm } from './ActionContextProvider';
import { FormTextField } from './FormInput';
import { PrimaryButton } from './PrimaryButton';
import { IconArrowUpRight } from '@tabler/icons-react';

interface Props extends ComponentProps<'div'> {}
export function EmailAddressCapture(props: Props) {
  const { className, ...rest } = props;

  const fetcher = useFetcher<typeof action>();
  const { getNameProp, isProcessing } = useForm(fetcher, CaptureEmailSchema);

  return (
    <div className={twMerge("flex flex-row items-center border rounded-full p-2 border-black shadow-normal bg-white", className)} {...rest}>
      <div className="flex flex-col items-stretch justify-center grow">
        <FormTextField
          type="email"
          placeholder="Email address"
          name={getNameProp('email').name}
          innerClassName="text-sm border-none text-black outline-none ring-none px-4 bg-transparent"
          required
        />
      </div>
      <div className="flex flex-col items-stretch shrink-0">
        <PrimaryButton
          type="submit"
          disabled={isProcessing}
          className="flex flex-row justify-center items-center gap-2 group p-4 text-sm rounded-full"
        >
          <IconArrowUpRight className="text-white" />
        </PrimaryButton>
      </div>
    </div>
  );
}
