import { ComponentProps } from 'react';
import { twMerge } from 'tailwind-merge';

import { CustomNavItem } from '~/components/CustomNavItem';
import { LogoLinkWithText } from '~/components/Logo';
import { PrimaryButtonLink } from '~/components/PrimaryButton';
import { AppLinks } from '~/models/links';

interface Props extends ComponentProps<'div'> {
  isLoggedIn: boolean;
}
export function Toolbar(props: Props) {
  const { className, isLoggedIn, ...rest } = props;

  return (
    <div className={twMerge("grid grid-cols-2 gap-6 py-8", className)} {...rest}>
      <div className="flex flex-row items-center justify-start px-16 gap-12">
        <LogoLinkWithText />
        <CustomNavItem to={AppLinks.Plans}>Pricing</CustomNavItem>
      </div>
      <div className="flex flex-row justify-end items-center px-16 gap-8">
        {!isLoggedIn ? <>
          <CustomNavItem to={AppLinks.Login}>Log In</CustomNavItem>
          <PrimaryButtonLink className="rounded-full px-6" to="#signup">Sign Up</PrimaryButtonLink>
        </> : null}
        {isLoggedIn ? <>
          <PrimaryButtonLink to={AppLinks.MyPage.Index}>My Page</PrimaryButtonLink>
          <CustomNavItem to={AppLinks.Logout}>Log Out</CustomNavItem>
        </> : null}
      </div>
    </div>
  )
}