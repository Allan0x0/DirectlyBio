import type { ReactNode } from 'react';

import { Form } from '@remix-run/react';
import { IconBrand4chan } from '@tabler/icons-react';
import { twMerge } from 'tailwind-merge';

import GoogleLogo from '~/../public/images/google.svg';
import { SocialsProvider } from '~/models/auth.validations';

export function SocialMediaButton(props: {
  provider: SocialsProvider;
  label: string;
}) {
  const { provider, label } = props;

  const baseClassName = twMerge(
    'rounded-md px-6 py-2 flex flex-row items-center gap-4',
    'transition-all duration-150',
  );

  const [Icon, className]: [ReactNode, string] = (() => {
    if (provider === SocialsProvider.GOOGLE) {
      const icon = <img src={GoogleLogo} alt="Google" className="w-6 h-6" />;
      const className = twMerge(
        baseClassName,
        'bg-white text-black hover:bg-white/80',
      );
      return [icon, className];
    }
    const icon = <IconBrand4chan />;
    const className = twMerge(baseClassName, 'bg-black text-black');
    return [icon, className];
  })();

  return (
    <Form action={`/auth/${provider}`} method="post">
      <button type="submit" className={className}>
        {Icon}
        <span>{label}</span>
      </button>
    </Form>
  );
}
