import type { ComponentProps } from 'react';

import { Link } from '@remix-run/react';
import { IconLocation } from '@tabler/icons-react';
import { twMerge } from 'tailwind-merge';

import { AppLinks } from '~/models/links';

interface Props {
  className?: string;
  isBare?: boolean;
  darkMode?: boolean;
  size?: number;
}
export function Logo(props: Props) {
  const { className, darkMode, size, isBare } = props;
  if (isBare) {
    return (
      <IconLocation
        className={twMerge(
          'text-purple-600',
          darkMode && 'text-white',
          className,
        )}
        size={size || 22}
      />
    );
  }
  return (
    <div
      className={twMerge(
        'rounded-full bg-purple-600 p-2',
        darkMode && 'bg-white',
      )}
    >
      <IconLocation
        className={twMerge(
          'text-white',
          darkMode && 'text-purple-600',
          className,
        )}
        size={size || 22}
      />
    </div>
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
      className={twMerge('flex flex-row items-center gap-2', className)}
      {...rest}
    >
      <Logo isBare={isBare || false} darkMode={darkMode} />
      <span
        className={twMerge(
          'text-black font-semibold text-xl text-nowrap',
          darkMode && 'text-white',
        )}
      >
        Directly Bio
      </span>
    </Link>
  );
}
