import { Link } from '@remix-run/react';
// import { IconLocation } from '@tabler/icons-react';
import { ComponentProps } from 'react';
import { twMerge } from 'tailwind-merge';
import { AppLinks } from '~/models/links';
import LogoImage from '~/../public/images/logo.svg';
import BareLogoImage from '~/../public/images/bare_logo.svg';

interface Props {
  className?: string;
  size?: number;
  isBare?: boolean;
}
export function Logo(props: Props) {
  const { className, size, isBare } = props;
  console.log(className, size);
  if (isBare) {
    return (<img src={BareLogoImage} alt="Logo" className={twMerge("w-10 h-10", className)} />)
  }
  return (<img src={LogoImage} alt="Logo" className={twMerge("w-10 h-10", className)} />)
  // return <IconLocation className={twMerge("text-purple-600", className)} size={size || 30} />;
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
