import type { ComponentProps } from 'react';

import { NavLink } from '@remix-run/react';
import { twMerge } from 'tailwind-merge';

import { UnderLine } from './UnderLine';
import { UnderLineOnHover } from './UnderLineOnHover';

interface Props extends ComponentProps<typeof NavLink> {
  className?: string;
  children: React.ReactNode;
  underlined?: boolean;
  darkMode?: boolean;
}

export function CustomNavItem(props: Props) {
  const { to, children, className, darkMode, underlined, ...rest } = props;

  return (
    <NavLink
      to={to}
      className={() =>
        twMerge(
          'group text-base font-normal text-black',
          'transition-all duration-150 hover:text-black/80',
          darkMode && 'text-white hover:text-white/90',
          className,
        )
      }
      {...rest}
    >
      {() => (
        <CustomChild
          underlined={!!underlined}
          isActive={false}
          isPending={false}
          darkMode={darkMode}
        >
          {children}
        </CustomChild>
      )}
    </NavLink>
  );
}

function CustomChild(props: {
  underlined: boolean;
  isActive: boolean;
  isPending: boolean;
  children: React.ReactNode;
  darkMode?: boolean;
}) {
  if (props.underlined) {
    return (
      <UnderLine
        innerClassName={twMerge('bg-stone-400 group-hover:bg-stone-600')}
        isPending={props.isPending}
      >
        {props.children}
      </UnderLine>
    );
  }

  return (
    <>
      {props.isActive ? (
        <UnderLine darkMode={props.darkMode} isPending={props.isPending}>
          {props.children}
        </UnderLine>
      ) : null}
      {!props.isActive ? (
        <UnderLineOnHover darkMode={props.darkMode}>
          {props.children}
        </UnderLineOnHover>
      ) : null}
    </>
  );
}
