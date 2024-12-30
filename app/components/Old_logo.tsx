import type { ComponentProps } from 'react';

import { Link } from '@remix-run/react';
// import { IconLocation } from '@tabler/icons-react';
import { IconLocation } from '@tabler/icons-react';
import { twMerge } from 'tailwind-merge';

// import BareLogoImage from '~/../public/images/bare_logo.svg';
// import LogoImage from '~/../public/images/logo.svg';
import { AppLinks } from '~/models/links';

interface Props {
  className?: string;
  isBare?: boolean;
  size?: number;
}
export function Logo(props: Props) {
  const { className, size, isBare } = props;
  // if (isBare) {
  //   return (
  //     <img
  //       src={BareLogoImage}
  //       alt="Logo"
  //       className={twMerge('w-10 h-10 bg-white rounded-full', className)}
  //     />
  //   );
  // }
  // return (
  //   <img
  //     src={LogoImage}
  //     alt="Logo"
  //     className={twMerge('w-10 h-10', className)}
  //   />
  // );
  if (isBare) {
    return (
      <IconLocation
        className={twMerge('text-white', className)}
        size={size || 30}
      />
    );
  }
  return (
    <IconLocation
      className={twMerge('text-purple-600', className)}
      size={size || 30}
    />
  );
}

interface WithTextProps
  extends Omit<ComponentProps<typeof Link>, 'children' | 'to'> {
  darkMode?: boolean;
  isBare?: boolean;
}
export function LogoLinkWithText(props: WithTextProps) {
  const { darkMode, isBare, className, ...rest } = props;
  return (
    <Link
      to={AppLinks.Home}
      className={twMerge('flex flex-row items-center gap-4', className)}
      {...rest}
    >
      <Logo isBare={isBare || false} />
      <span
        className={twMerge(
          'text-black font-semibold text-xl',
          darkMode && 'text-white',
        )}
      >
        Directly Bio
      </span>
    </Link>
  );
}
