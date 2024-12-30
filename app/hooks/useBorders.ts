import type { Border } from '~/models/blocks';

import { twMerge } from 'tailwind-merge';

interface Props {
  shadow?: Border['shadow'];
  width?: Border['width'];
  color?: Border['color'];
}
export function useBorders(props: Props) {
  const { shadow, width, color } = props;

  const shadowMap: Record<Required<Border>['shadow'], string> = {
    0: twMerge('shadow-none'),
    1: twMerge('shadow-md'),
    2: twMerge('shadow-lg'),
    3: twMerge('shadow-xl'),
    4: twMerge('shadow-2xl'),
  };

  const widthMap: Record<Required<Border>['width'], string> = {
    0: twMerge('border-0'),
    1: twMerge('border'),
    2: twMerge('border-2'),
    3: twMerge('border-4'),
    4: twMerge('border-8'),
  };

  const colorMap: Record<Required<Border>['color'], string> = {
    white: twMerge('border-white'),
    black: twMerge('border-black'),
    slate: twMerge('border-slate-600'),
    gray: twMerge('border-gray-600'),
    zinc: twMerge('border-zinc-600'),
    neutral: twMerge('border-neutral-600'),
    stone: twMerge('border-stone-600'),
    red: twMerge('border-red-600'),
    orange: twMerge('border-orange-600'),
    amber: twMerge('border-amber-600'),
    yellow: twMerge('border-yellow-600'),
    lime: twMerge('border-lime-600'),
    green: twMerge('border-green-600'),
    emerald: twMerge('border-emerald-600'),
    teal: twMerge('border-teal-600'),
    cyan: twMerge('border-cyan-600'),
    sky: twMerge('border-sky-600'),
    blue: twMerge('border-blue-600'),
    indigo: twMerge('border-indigo-600'),
    violet: twMerge('border-violet-600'),
    purple: twMerge('border-purple-600'),
    fuchsia: twMerge('border-fuchsia-600'),
    pink: twMerge('border-pink-600'),
    rose: twMerge('border-rose-600'),
  };

  const classNames = {
    shadow: shadow ? shadowMap[shadow] : undefined,
    width: width ? widthMap[width] : undefined,
    color: color ? colorMap[color] : undefined,
    radius: twMerge('rounded-lg'),
  };
  return {
    classNames,
    className: Object.values(classNames).join(' '),
  };
}
