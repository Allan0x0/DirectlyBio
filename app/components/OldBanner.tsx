import type { ComponentProps, ReactNode } from 'react';

import {
  IconArrowRight,
  IconBrandFacebook,
  IconBrandInstagram,
  IconBrandTiktok,
  IconBrandWhatsappFilled,
  IconBrandX,
  IconBrandYoutubeFilled,
  IconCalendarMonth,
  IconCreditCard,
  IconDownload,
} from '@tabler/icons-react';
import { twMerge } from 'tailwind-merge';

import GraduationSvg from '~/../public/images/graduation.svg';
import MasterCardSvg from '~/../public/images/mastercard.svg';
import ModelPng from '~/../public/images/transparent_model.png';
import VisaSvg from '~/../public/images/visa.svg';

import { BottomFade } from './BottomFade';

interface Props extends Omit<ComponentProps<'div'>, 'children'> {}
export function Banner(props: Props) {
  const { className, ...rest } = props;
  return (
    <div
      className={twMerge(
        'flex flex-col justify-center items-center py-6 mr-[10rem] relative shrink-0 translate-y-10',
        className,
      )}
      {...rest}
    >
      <Phone className="z-30 -translate-x-24 -translate-y-16 justify-end gap-2 bg-transparent backdrop-blur-none rounded-lg">
        <FlatCard
          className={twMerge(
            'border-none w-72 aspect-[5/2] bg-white/90 rounded-xl backdrop-blur-sm',
            'flex flex-col items-stretch gap-4 px-4 py-4 text-black shadow-2xl',
          )}
        >
          <div className="flex flex-row items-stretch gap-4">
            <div className="bg-black/10 rounded-md p-1 flex flex-col justify-center items-center">
              <img
                src={GraduationSvg}
                alt="Course"
                className="w-24 aspect-square"
              />
            </div>
            <div className="flex flex-col items-stretch gap-2">
              <span className="text-sm font-semibold">My creator course</span>
              <span className="text-[0.6rem] font-light text-stone-600">
                Everything you need to know to get started becoming a creator
              </span>
              <div className="flex flex-row items-center gap-2">
                <span className="font-bold text-stone-800 text-xs">$125</span>
                <span className="text-stone-400/60 line-through text-xs">
                  $125
                </span>
                <div className="bg-yellow-300 rounded flex flex-col justify-center items-center px-1 py-0">
                  <span className="text-[0.7rem] text-nowrap flex flex-row items-center gap-1">
                    <span style={{ fontSize: '70%' }}>★</span> 4.5
                  </span>
                </div>
                <div className="bg-red-300 rounded flex flex-col justify-center items-center px-1 py-0">
                  <span className="text-[0.7rem] text-nowrap">40% OFF</span>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-purple-600 rounded-lg text-white flex flex-row justify-center items-center shadow-lg px-4 py-3">
            <span className="text-xs">Get Started</span>
            <div className="grow" />
            <IconArrowRight size={16} />
          </div>
        </FlatCard>
        <FrontCard
          className="w-72 aspect-[5/1] bg-white/90 rounded-xl backdrop-blur-sm border-none"
          Graphic={<IconCalendarMonth className="text-green-600" />}
          title="Book A Coaching Session"
          price={59}
        />
        <FrontCard
          className="w-72 aspect-[5/1] bg-white/90 rounded-xl backdrop-blur-sm border-none"
          Graphic={<IconDownload className="text-purple-600" />}
          title="Download My Cheatsheet"
          price={15}
        />
      </Phone>
      <Phone className="-translate-x-14 -translate-y-10 z-20 gap-3 py-5 bg-gradient-to-b from-stone-400 via-white to-white">
        <div className="flex flex-col justify-center items-center px-4">
          <span
            className="text-white text-2xl font-black font-times tracking-wide"
            style={{ textShadow: '1px 1px #a1a1a1' }}
          >
            Angelica Schafer
          </span>
        </div>
        <div className="flex flex-row justify-center items-center gap-4 px-4">
          <IconBrandWhatsappFilled className="text-white" size={20} />
          <IconBrandInstagram className="text-white" size={20} />
          <IconBrandTiktok className="text-white" size={20} />
          <IconBrandX className="text-white" size={20} />
          <IconBrandYoutubeFilled className="text-white" size={20} />
          <IconBrandFacebook className="text-white" size={20} />
        </div>
        <div className="flex flex-col justify-center items-center grow">
          <img src={ModelPng} alt="User" className="object-contain" />
        </div>
        <BottomFade className="h-2/3 from-stone-500" />
      </Phone>
      <Phone className="z-10 pb-4 bg-gradient-to-b from-stone-400 via-white to-stone-400">
        <div className="w-full aspect-[2/1] bg-purple-600" />
        <div className="flex flex-col items-stretch gap-4 -translate-y-6 px-6">
          <FlatCard>
            <span className="text-xl">Content here</span>
          </FlatCard>
        </div>
        <div className="grow" />
        <div className="flex flex-col items-stretch gap-2 px-6">
          <div className="flex flex-row items-center gap-2">
            <div className="grow" />
            <span className="text-xl font-semibold text-black">$86</span>
          </div>
          <FlatCard className="flex flex-row items-center gap-2">
            <div className="grow" />
            <img src={VisaSvg} alt="Visa" className="w-6" />
            <img src={MasterCardSvg} alt="Mastercard" className="w-6" />
          </FlatCard>
          <FlatCard className="flex flex-row items-center gap-2 py-3">
            <div className="grow" />
            <IconCreditCard className="text-stone-400" size={16} />
          </FlatCard>
          <div className="flex flex-col items-stretch pt-4">
            <div className="bg-purple-600 rounded-lg text-white flex flex-row justify-center items-center shadow-lg px-4 py-3">
              <span className="text-xs">Checkout</span>
              <div className="grow" />
              <IconArrowRight size={16} />
            </div>
          </div>
        </div>
      </Phone>
    </div>
  );
}

interface PhoneProps extends ComponentProps<'div'> {}
function Phone(props: PhoneProps) {
  const { className, children, ...rest } = props;
  return (
    <div
      className={twMerge(
        'w-72 aspect-[9/16] absolute top-0 right-0 bg-black/10 rounded-3xl backdrop-blur-sm',
        'flex flex-col items-stretch overflow-hidden',
        className,
      )}
      {...rest}
    >
      {children}
    </div>
  );
}

interface FlatCardProps extends ComponentProps<'div'> {}
function FlatCard(props: FlatCardProps) {
  const { className, children, ...rest } = props;
  return (
    <div
      className={twMerge(
        'rounded-lg bg-white px-3 py-2 flex flex-col items-start shadow-xl border border-stone-300',
        className,
      )}
      {...rest}
    >
      {children}
    </div>
  );
}

interface FrontCardProps extends ComponentProps<typeof FlatCard> {
  title: string;
  price: number;
  Graphic: ReactNode;
}
function FrontCard(props: FrontCardProps) {
  const { title, price, Graphic, className, ...rest } = props;
  return (
    <FlatCard
      className={twMerge(
        'flex flex-row items-stretch gap-4 px-4 py-2 text-black shadow-2xl',
        className,
      )}
      {...rest}
    >
      <div className="flex flex-col justify-center items-center">{Graphic}</div>
      <div className="flex flex-col justify-center items-stretch">
        <span className="text-xs font-normal">{title}</span>
        <span className="text-sm font-semibold">${price}</span>
      </div>
    </FlatCard>
  );
}
