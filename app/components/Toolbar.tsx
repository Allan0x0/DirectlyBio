import type { ComponentProps } from 'react';

import { twMerge } from 'tailwind-merge';

import { CustomNavItem } from '~/components/CustomNavItem';
import { LogoLinkWithText } from '~/components/Logo';
import { PrimaryButtonLink } from '~/components/PrimaryButton';
import { AppLinks } from '~/models/links';

import ToolbarMenu from './ToolbarMenu';

interface Props extends ComponentProps<'div'> {
  isLoggedIn: boolean;
  isOnIndexPage?: boolean;
}
export function Toolbar(props: Props) {
  const { className, isLoggedIn, isOnIndexPage, ...rest } = props;

  return (
    <div
      className={twMerge(
        'grid grid-cols-2 gap-4 md:gap-6 py-8 text-white',
        className,
      )}
      {...rest}
    >
      <div className="flex flex-row items-center justify-start px-4 md:px-16 gap-8 md:gap-12">
        <LogoLinkWithText darkMode />
        <CustomNavItem darkMode to={AppLinks.Plans}>
          Pricing
        </CustomNavItem>
      </div>
      <div className="flex md:hidden flex-row justify-end items-center px-4">
        <ToolbarMenu />
      </div>
      <div className="hidden md:flex flex-row justify-end items-center px-16 gap-8">
        {!isLoggedIn ? (
          <>
            <CustomNavItem darkMode to={AppLinks.Login}>
              Log In
            </CustomNavItem>
            <PrimaryButtonLink
              darkMode
              className="rounded-full px-6"
              to={isOnIndexPage ? '#signup' : AppLinks.Join}
            >
              Sign Up
            </PrimaryButtonLink>
          </>
        ) : null}
        {isLoggedIn ? (
          <>
            <PrimaryButtonLink to={AppLinks.Home}>My Page</PrimaryButtonLink>
            <CustomNavItem darkMode to={AppLinks.Logout}>
              Log Out
            </CustomNavItem>
          </>
        ) : null}
      </div>
    </div>
  );
}
