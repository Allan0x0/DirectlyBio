import { IconBrandFacebook, IconBrandInstagram, IconBrandTiktok, IconBrandWhatsapp, IconBrandX, IconBrandYoutube, IconColorPicker, IconPlayerPlayFilled } from "@tabler/icons-react";
import { ComponentProps, ReactNode } from "react";
import { twMerge } from "tailwind-merge";
import Cap from '~/../public/images/cap.webp';
import Person from '~/../public/images/person.png';
import Sweater from '~/../public/images/sweater.webp';
import Tshirt from '~/../public/images/tshirt.webp';
import { BottomFade } from "./BottomFade";
import { FadablePhone } from "./FadablePhone";
import { PhoneToolbar } from "./PhoneToolbar";

interface Props extends Omit<ComponentProps<'div'>, "children"> {
}
export function PickThemeDisplayCard(props: Props) {
  const { className, ...rest } = props;

  const colorClassNames = [
    twMerge('bg-blue-500'),
    twMerge('bg-red-500'),
    twMerge('bg-orange-500'),
    twMerge('bg-green-500'),
    twMerge('bg-purple-500'),
    twMerge('bg-yellow-500'),
  ];

  return (
    <div className={twMerge("relative flex flex-row justify-center items-stretch gap-2 shrink-0", className)} {...rest}>
      <div className="flex flex-col justify-center items-center">
        <div className="w-32 rounded-2xl flex flex-col justify-center items-center bg-black/10 shadow-2xl overflow-hidden relative">
          <img src={Sweater} alt="Creator" className="w-full object-contain rounded-2xl" />
          <div className="border-2 border-white rounded-full p-1 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <IconPlayerPlayFilled className="text-white" size={16} />
          </div>
        </div>
      </div>
      <FadablePhone className="w-1/2 bg-white">
        <PhoneToolbar />
        <div className="flex flex-col justify-center items-center gap-2">
          <div className="rounded-full w-1/2 aspect-square bg-black/10 overflow-hidden">
            <img src={Person} alt="Creator" className="w-full object-contain" />
          </div>
          <span className="font-semibold text-xl text-stone-800">Melanie Kopelman</span>
          <div className="flex flex-row items-center gap-2">
            <IconBrandInstagram className="text-stone-400" size={16} />
            <IconBrandTiktok className="text-stone-400" size={16} />
            <IconBrandX className="text-stone-400" size={16} />
            <IconBrandWhatsapp className="text-stone-400" size={16} />
            <IconBrandYoutube className="text-stone-400" size={16} />
            <IconBrandFacebook className="text-stone-400" size={16} />
          </div>
          <div className="grid grid-cols-2 gap-4 p-4">
            <GridItem Graphic={<img src={Cap} alt="Cap" className="object-contain bg-center" />} item="Cap" price={5} />
            <GridItem Graphic={<img src={Tshirt} alt="T-shirt" className="object-contain bg-center" />} item="T-shirt" price={12} />
            {/* <GridItem Graphic={<img src={Sweater} alt="Sweater" className="object-contain bg-center" />} item="Sweater" price={25} /> */}
          </div>
        </div>
      </FadablePhone>
      <div className="flex flex-col justify-center items-center">
        <div className="flex flex-col justify-center items-center rounded-full p-2 border border-stone-400 gap-2 bg-white/80 shadow-2xl">
          <div className="border border-stone-400 p-1 rounded-full">
            <IconColorPicker className="text-stone-600" size={18} />
          </div>
          {colorClassNames.map(bgColor => (
            <div key={bgColor} className={twMerge("rounded-full w-6 h-6", bgColor)} />
          ))}
        </div>
      </div>
      <BottomFade className="h-1/3 from-purple-300" />
    </div>
  )
}

interface GridItemProps extends Omit<ComponentProps<'div'>, 'children'> {
  Graphic: ReactNode;
  item: string;
  price: number;
}
function GridItem(props: GridItemProps) {
  const { className, Graphic, item, price, ...rest } = props;
  return (
    <div className={twMerge("flex flex-col items-stretch", className)} {...rest}>
      <div className="flex flex-col items-stretch gap-2">
        <div className="w-full aspect-square rounded-xl bg-black/10 backdrop-blur-sm overflow-hidden">
          {Graphic}
        </div>
        <div className="flex flex-col items-start gap-1">
          <span className="text-xs text-stone-800">{item}</span>
          <span className="text-xs text-stone-600 font-light">$ {price.toFixed(2)}</span>
        </div>
      </div>
    </div>
  )
}