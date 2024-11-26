import { Link } from '@remix-run/react';
import { IconLocation } from '@tabler/icons-react';
import { ComponentProps } from 'react';
import { twMerge } from 'tailwind-merge';
import { AppLinks } from '~/models/links';

interface Props {
  className?: string;
  size?: number
}
export function Logo(props: Props) {
  const { className, size } = props;
  return <IconLocation className={twMerge("text-purple-600", className)} size={size || 30} />;
}

interface WithTextProps extends Omit<ComponentProps<typeof Link>, 'children' | 'to'> {
  darkBg?: boolean;
}
export function LogoLinkWithText(props: WithTextProps) {
  const { darkBg, className, ...rest } = props;
  return (
    <Link to={AppLinks.Home} className={twMerge("flex flex-row items-center gap-4", className)} {...rest}>
      <Logo />
      <span className={twMerge("text-black font-semibold text-xl", darkBg && 'text-white')}>Directly Bio</span>
    </Link>
  )
}
