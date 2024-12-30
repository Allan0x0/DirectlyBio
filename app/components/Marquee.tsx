import type { ComponentProps, ReactNode } from 'react';

import {
  IconClockHour4Filled,
  IconLayout2Filled,
  IconTool,
} from '@tabler/icons-react';
import { twMerge } from 'tailwind-merge';

export function Marquee(props: ComponentProps<'div'>) {
  const { className, children, ...rest } = props;

  return (
    <div
      className={twMerge(
        'overflow-hidden flex flex-col items-stretch bg-orange-200 border-b border-stone-800',
        className,
      )}
      {...rest}
    >
      <div className="flex flex-row items-center gap-6 animate-marqueeMobile md:animate-marquee min-w-full whitespace-nowrap">
        {children}
      </div>
    </div>
  );
}

interface ItemProps extends Omit<ComponentProps<'div'>, 'children'> {
  Icon: ReactNode;
  text: string;
}
export function MarqueeItem(props: ItemProps) {
  const { Icon, text, className, ...rest } = props;
  return (
    <div
      className={twMerge('flex flex-row items-center gap-4 p-6', className)}
      {...rest}
    >
      <div className="flex flex-col justify-center items-center">{Icon}</div>
      <div className="flex flex-col justify-center items-center">
        <span className="uppercase text-xl tracking-wide font-bold text-stone-800">
          {text}
        </span>
      </div>
    </div>
  );
}

export function IndexMarquee() {
  return (
    <Marquee>
      <MarqueeItem
        Icon={<IconTool className="text-stone-800" size={34} />}
        text="Simple & Customizable"
      />
      <MarqueeItem
        Icon={<IconClockHour4Filled className="text-stone-800" size={34} />}
        text="Launch your page in minutes"
      />
      <MarqueeItem
        Icon={<IconLayout2Filled className="text-stone-800" size={34} />}
        text="Comprehensive store builder"
      />
      <MarqueeItem
        Icon={<IconTool className="text-stone-800" size={34} />}
        text="Simple & Customizable"
      />
      <MarqueeItem
        Icon={<IconClockHour4Filled className="text-stone-800" size={34} />}
        text="Launch your page in minutes"
      />
      <MarqueeItem
        Icon={<IconLayout2Filled className="text-stone-800" size={34} />}
        text="Comprehensive store builder"
      />
      <MarqueeItem
        Icon={<IconTool className="text-stone-800" size={34} />}
        text="Simple & Customizable"
      />
      <MarqueeItem
        Icon={<IconClockHour4Filled className="text-stone-800" size={34} />}
        text="Launch your page in minutes"
      />
      <MarqueeItem
        Icon={<IconLayout2Filled className="text-stone-800" size={34} />}
        text="Comprehensive store builder"
      />
    </Marquee>
  );
}
