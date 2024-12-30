import type { Background } from '~/models/blocks';

import { twMerge } from 'tailwind-merge';

interface Props {
  color?: Background['color'];
}
export function useBackgrounds(props: Props) {
  const { color } = props;

  const colorMap: Record<Required<Background>['color'], string> = {
    white: twMerge('bg-white'),
    black: twMerge('bg-black'),
    slate: twMerge('bg-slate-600'),
    gray: twMerge('bg-gray-600'),
    zinc: twMerge('bg-zinc-600'),
    neutral: twMerge('bg-neutral-600'),
    stone: twMerge('bg-stone-600'),
    red: twMerge('bg-red-600'),
    orange: twMerge('bg-orange-600'),
    amber: twMerge('bg-amber-600'),
    yellow: twMerge('bg-yellow-600'),
    lime: twMerge('bg-lime-600'),
    green: twMerge('bg-green-600'),
    emerald: twMerge('bg-emerald-600'),
    teal: twMerge('bg-teal-600'),
    cyan: twMerge('bg-cyan-600'),
    sky: twMerge('bg-sky-600'),
    blue: twMerge('bg-blue-600'),
    indigo: twMerge('bg-indigo-600'),
    violet: twMerge('bg-violet-600'),
    purple: twMerge('bg-purple-600'),
    fuchsia: twMerge('bg-fuchsia-600'),
    pink: twMerge('bg-pink-600'),
    rose: twMerge('bg-rose-600'),
  };

  const classNames = {
    color: color ? colorMap[color] : twMerge('bg-white/60 backdrop-blur-md'),
  };
  return {
    classNames,
    className: Object.values(classNames).join(' '),
  };
}
