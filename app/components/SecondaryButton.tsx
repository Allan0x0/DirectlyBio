import type { RemixLinkProps } from '@remix-run/react/dist/components';
import type { ComponentProps } from 'react';

import { Link } from '@remix-run/react';
import { twMerge } from 'tailwind-merge';

interface GetClassNameProps {
  className: string | undefined;
  disabled: boolean | undefined;
}
function getClassName(props: GetClassNameProps) {
  const { className: inputClassName, disabled } = props;
  const className = twMerge(
    'rounded-lg transition-all duration-150 text-center py-2 px-6 text-primary-600',
    'bg-copy focus:bg-copy/90 rounded-full font-normal',
    disabled &&
      'text-stone-400/40 cursor-not-allowed bg-white/50 hover:bg-white/50',
    inputClassName || '',
  );
  return className;
}

type Props = ComponentProps<'button'>;
export function SecondaryButton(props: Props) {
  const {
    className,
    children,
    type = 'button',
    disabled,
    ...restOfProps
  } = props;
  return (
    <button
      type={type}
      className={getClassName({ className, disabled })}
      disabled={disabled}
      {...restOfProps}
    >
      {children}
    </button>
  );
}

interface ButtonLinkProps extends ComponentProps<typeof Link>, RemixLinkProps {}
export function SecondaryButtonLink(props: ButtonLinkProps) {
  const { children, className, ...restOfProps } = props;
  return (
    <Link
      className={getClassName({ className, disabled: false })}
      {...restOfProps}
    >
      {children}
    </Link>
  );
}

type ExternalLinkProps = ComponentProps<'a'>;
export function SecondaryButtonExternalLink(props: ExternalLinkProps) {
  const { children, className, ...restOfProps } = props;
  return (
    <a
      className={getClassName({ className, disabled: false })}
      {...restOfProps}
    >
      {children}
    </a>
  );
}
