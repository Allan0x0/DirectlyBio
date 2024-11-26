import { Link } from '@remix-run/react';
import type { ComponentProps } from 'react';


import { AppLinks } from '~/models/links';

import { UnderLineOnHover } from './UnderLineOnHover';

type Props = Omit<ComponentProps<typeof Link>, 'to'>
export function HomeLink(props: Props) {
  const { children, className, ...rest } = props;
  return (
    <Link to={AppLinks.Home} className={className} {...rest}>
      <UnderLineOnHover>
        <h1 className="group cursor-pointer text-lg uppercase text-stone-600 transition-all duration-150">
          {children}
        </h1>
      </UnderLineOnHover>
    </Link>
  );
}
