import { Link } from '@remix-run/react';
import type { RemixLinkProps } from '@remix-run/react/dist/components';
import type { ComponentProps } from 'react';
import { twMerge } from 'tailwind-merge';

interface getGhostButtonClassNameProps {
  className: string | undefined;
  disabled: boolean | undefined;
}
export function getGhostButtonClassName(props: getGhostButtonClassNameProps) {
  const { className: inputClassName, disabled } = props;
  const className = twMerge(
    'rounded-md transition-all duration-150 text-center p-2 text-black',
    'bg-white/[.05] hover:bg-white/10 focus:bg-white/10',
    disabled &&
      'text-stone-400/40 cursor-not-allowed bg-white/50 hover:bg-white/50',
    inputClassName || '',
  );
  return className;
}

type Props = ComponentProps<'button'>;
export function GhostButton(props: Props) {
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
      className={getGhostButtonClassName({ className, disabled })}
      disabled={disabled}
      {...restOfProps}
    >
      {children}
    </button>
  );
}

interface ButtonLinkProps extends ComponentProps<typeof Link>, RemixLinkProps {}
export function GhostButtonLink(props: ButtonLinkProps) {
  const { children, className, ...restOfProps } = props;
  return (
    <Link
      className={getGhostButtonClassName({ className, disabled: false })}
      {...restOfProps}
    >
      {children}
    </Link>
  );
}

type ExternalLinkProps = ComponentProps<'a'>;
export function GhostButtonExternalLink(props: ExternalLinkProps) {
  const { children, className, ...restOfProps } = props;
  return (
    <a
      className={getGhostButtonClassName({ className, disabled: false })}
      {...restOfProps}
    >
      {children}
    </a>
  );
}
