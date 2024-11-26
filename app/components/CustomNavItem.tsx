import { NavLink } from '@remix-run/react';
import type { ComponentProps } from 'react';
import { twMerge } from 'tailwind-merge';

import { UnderLine } from './UnderLine';
import { UnderLineOnHover } from './UnderLineOnHover';

interface Props extends ComponentProps<typeof NavLink> {
  className?: string;
  children: React.ReactNode;
  underlined?: boolean;
}

export function CustomNavItem(props: Props) {
  const { to, children, className, underlined, ...rest } = props;

  return (
    <NavLink
      to={to}
      className={() =>
        twMerge(
          'group text-base font-normal text-black',
          'transition-all duration-150 hover:text-black/80',
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
        <UnderLine isPending={props.isPending}>{props.children}</UnderLine>
      ) : null}
      {!props.isActive ? (
        <UnderLineOnHover>{props.children}</UnderLineOnHover>
      ) : null}
    </>
  );
}
