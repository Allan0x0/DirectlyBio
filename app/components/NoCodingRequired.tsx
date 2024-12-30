import type { ComponentProps, ReactNode } from 'react';

import {
  IconAlignBoxLeftStretch,
  IconBook2,
  IconBrandFacebook,
  IconBrandInstagram,
  IconBrandTiktok,
  IconBrandWhatsapp,
  IconBrandX,
  IconBrandYoutube,
  IconMusic,
  IconPhoto,
  IconShoppingBag,
} from '@tabler/icons-react';
import { twMerge } from 'tailwind-merge';

import Person from '~/../public/images/person.png';

import { BottomFade } from './BottomFade';
import { FadablePhone } from './FadablePhone';
import { PhoneToolbar } from './PhoneToolbar';

interface Props extends ComponentProps<'div'> {}
export function NoCodingRequired(props: Props) {
  const { className, ...rest } = props;
  return (
    <div
      className={twMerge('relative flex flex-col items-end pt-16', className)}
      {...rest}
    >
      <div className="w-2/5 flex flex-col items-stretch relative mr-32">
        <FadablePhone className="w-full aspect-[3/5] bg-white gap-4 py-4">
          <PhoneToolbar />
          <div className="flex flex-col justify-center items-center gap-2">
            <div className="rounded-full w-1/2 aspect-square bg-black/10 overflow-hidden">
              <img
                src={Person}
                alt="Creator"
                className="w-full object-contain"
              />
            </div>
            <span className="font-semibold text-xl text-stone-800">
              Melanie Kopelman
            </span>
            <div className="flex flex-row items-center gap-2">
              <IconBrandInstagram className="text-stone-400" size={16} />
              <IconBrandTiktok className="text-stone-400" size={16} />
              <IconBrandX className="text-stone-400" size={16} />
              <IconBrandWhatsapp className="text-stone-400" size={16} />
              <IconBrandYoutube className="text-stone-400" size={16} />
              <IconBrandFacebook className="text-stone-400" size={16} />
            </div>
          </div>
          <div className="flex flex-col items-stretch p-4">
            <div className="border-4 border-stone-200 rounded-xl border-dashed aspect-[9/6] bg-stone-50 flex flex-col justify-center items-center">
              <IconPhoto className="text-stone-200" size={48} />
            </div>
          </div>
        </FadablePhone>
        <div className="flex flex-col justify-end items-stretch absolute top-0 left-0 w-full h-full gap-4 pb-12">
          <InlineCard className="-translate-x-[16rem] rotate-[6deg] flex flex-col items-stretch gap-4">
            <div className="grid grid-cols-6 gap-4">
              <div className="flex flex-col items-stretch">
                <IconAlignBoxLeftStretch
                  size={24}
                  className="text-purple-600"
                />
              </div>
              <div className="flex flex-col items-stretch gap-2 col-span-5">
                <Title>Join My Waitlist</Title>
                <Subtitle>
                  I`m taking orders right now for my upcoming product so hurry
                  before the waitlist is full. I`ll be providing updates as we
                  near the launch date
                </Subtitle>
              </div>
            </div>
            <div className="flex flex-col justify-center items-center bg-purple-600 rounded-md py-3 text-white text-xs">
              Join Waitlist
            </div>
          </InlineCard>
          <InlineCard
            className="-translate-x-[10rem] rotate-[4deg]"
            Graphic={<IconShoppingBag size={16} className="text-green-600" />}
            title="Shop for merch"
          />
          <InlineCard
            className="-translate-x-[5rem] rotate-[2deg]"
            Graphic={<IconMusic size={16} className="text-red-600" />}
            title="Listen to my new single"
          />
          <InlineCard
            className="-translate-x-[2.5rem]"
            Graphic={<IconBook2 size={16} className="text-stone-800" />}
            title="Check out my new course"
          />
        </div>
      </div>
      <BottomFade className="h-1/4 from-yellow-300" />
    </div>
  );
}

interface InlineCardProps extends ComponentProps<'div'> {
  Graphic?: ReactNode;
  title?: string;
  subtitle?: string;
}
function InlineCard(props: InlineCardProps) {
  const { title, subtitle, Graphic, className, children, ...rest } = props;
  return (
    <div
      className={twMerge(
        'bg-white/40 backdrop-blur-xl flex flex-row items-center gap-4 rounded-xl px-4 py-3 shadow-xl border border-stone-200',
        className,
      )}
      {...rest}
    >
      {!!children && <>{children}</>}
      {!children && (
        <>
          {Graphic}
          <Title>{title}</Title>
          {!!subtitle && <Subtitle>{subtitle}</Subtitle>}
        </>
      )}
    </div>
  );
}

function Title({ children }: { children: string | undefined }) {
  return <span className="text-stone-800 text-xs">{children}</span>;
}

function Subtitle({ children }: { children: string | undefined }) {
  return (
    <span className="text-stone-600 text-xs font-light text-balance">
      {children}
    </span>
  );
}
