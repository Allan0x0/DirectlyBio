import type { Typography } from '~/models/blocks';

import { twMerge } from 'tailwind-merge';

interface Props {
  color?: Typography['color'];
  size?: Typography['size'];
}
export function useTypography(props: Props) {
  const { color, size } = props;

  const sizeMap: Record<Required<Typography>['size'], string> = {
    1: twMerge('text-xs'),
    2: twMerge('text-sm'),
    3: twMerge('text-base'),
    4: twMerge('text-lg'),
    5: twMerge('text-xl'),
    6: twMerge('text-2xl'),
  };

  const colorMap: Record<Required<Typography>['color'], string> = {
    white: twMerge('text-white'),
    slate: twMerge('text-slate-600'),
    gray: twMerge('text-gray-600'),
    zinc: twMerge('text-zinc-600'),
    neutral: twMerge('text-neutral-600'),
    stone: twMerge('text-stone-600'),
    red: twMerge('text-red-600'),
    orange: twMerge('text-orange-600'),
    amber: twMerge('text-amber-600'),
    yellow: twMerge('text-yellow-600'),
    lime: twMerge('text-lime-600'),
    green: twMerge('text-green-600'),
    emerald: twMerge('text-emerald-600'),
    teal: twMerge('text-teal-600'),
    cyan: twMerge('text-cyan-600'),
    sky: twMerge('text-sky-600'),
    blue: twMerge('text-blue-600'),
    indigo: twMerge('text-indigo-600'),
    violet: twMerge('text-violet-600'),
    purple: twMerge('text-purple-600'),
    fuchsia: twMerge('text-fuchsia-600'),
    pink: twMerge('text-pink-600'),
    rose: twMerge('text-rose-600'),
  };

  const classNames = {
    color: color ? colorMap[color] : undefined,
    size: size ? sizeMap[size] : undefined,
  };
  return {
    classNames,
    className: Object.values(classNames).join(' '),
  };
}
