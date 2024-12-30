import type { ComponentProps } from 'react';

import {
  IconBrandFacebook,
  IconBrandInstagram,
  IconBrandTiktok,
  IconBrandWhatsapp,
  IconBrandX,
  IconBrandYoutube,
} from '@tabler/icons-react';
import { twMerge } from 'tailwind-merge';

import { SocMediaBadge } from './SocMediaBadge';

interface Props extends Omit<ComponentProps<'div'>, 'children'> {}
export function SocialMediaTiles(props: Props) {
  const { className, ...rest } = props;
  return (
    <div
      className={twMerge('flex flex-row items-center gap-2 pb-6', className)}
      {...rest}
    >
      <SocMediaBadge className="-mr-6">
        <IconBrandInstagram className="text-purple-600" />
      </SocMediaBadge>
      <SocMediaBadge className="-mr-6">
        <IconBrandTiktok className="text-black" />
      </SocMediaBadge>
      <SocMediaBadge className="-mr-6">
        <IconBrandX className="text-sky-400" />
      </SocMediaBadge>
      <SocMediaBadge className="-mr-6">
        <IconBrandWhatsapp className="text-green-600" />
      </SocMediaBadge>
      <SocMediaBadge className="-mr-6">
        <IconBrandYoutube className="text-red-600" />
      </SocMediaBadge>
      <SocMediaBadge className="-mr-6">
        <IconBrandFacebook className="text-sky-600" />
      </SocMediaBadge>
    </div>
  );
}
