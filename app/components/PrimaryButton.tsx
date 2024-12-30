import type { RemixLinkProps } from '@remix-run/react/dist/components';
import type { ComponentProps } from 'react';

import { Link } from '@remix-run/react';
import { twMerge } from 'tailwind-merge';

interface GetClassNameProps {
  className: string | undefined;
  disabled: boolean | undefined;
  darkMode?: boolean;
}
function getClassName(props: GetClassNameProps) {
  const { disabled, darkMode, className: inputClassName } = props;

  const className = twMerge(
    'rounded-lg transition-all duration-150 text-center text-white p-3 py-2 font-normal',
    'bg-purple-600 rounded-full px-6',
    darkMode && 'bg-white border border-white text-black',
    disabled && 'bg-black/50 cursor-not-allowed hover:bg-black/50',
    darkMode && disabled && 'bg-white/50 hover:bg-white/50',
    inputClassName,
  );
  return className;
}

type Props = ComponentProps<'button'> & { darkMode?: boolean };
export function PrimaryButton(props: Props) {
  const {
    type = 'button',
    disabled,
    darkMode,
    className,
    ...restOfProps
  } = props;

  return (
    <button
      type={type}
      className={getClassName({ className, disabled, darkMode })}
      disabled={disabled}
      {...restOfProps}
    />
  );
}

interface ButtonLinkProps extends ComponentProps<typeof Link>, RemixLinkProps {
  darkMode?: boolean;
}
export function PrimaryButtonLink(props: ButtonLinkProps) {
  const { className, darkMode, children, ...restOfProps } = props;

  return (
    <Link
      className={getClassName({ className, darkMode, disabled: false })}
      {...restOfProps}
    >
      {children}
    </Link>
  );
}

type ExternalLinkProps = ComponentProps<'a'> & { darkMode?: boolean };
export function PrimaryButtonExternalLink(props: ExternalLinkProps) {
  const { className, children, darkMode, ...restOfProps } = props;

  return (
    <a
      className={getClassName({ className, darkMode, disabled: false })}
      {...restOfProps}
    >
      {children}
    </a>
  );
}
