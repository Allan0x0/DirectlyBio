import type { Spacing } from '~/models/blocks';

import { twMerge } from 'tailwind-merge';

interface Props {
  p?: Spacing['p'];
  px?: Spacing['px'];
  py?: Spacing['py'];
  gap?: Spacing['gap'];
}
export function useSpacing(props: Props) {
  const { p, px, py, gap } = props;

  const pMap: Record<Required<Spacing>['p'], string> = {
    0: twMerge('p-0'),
    1: twMerge('p-2'),
    2: twMerge('p-4'),
    3: twMerge('p-6'),
    4: twMerge('p-8'),
    5: twMerge('p-10'),
    6: twMerge('p-12'),
  };

  const pxMap: Record<Required<Spacing>['px'], string> = {
    0: twMerge('px-0'),
    1: twMerge('px-2'),
    2: twMerge('px-4'),
    3: twMerge('px-6'),
    4: twMerge('px-8'),
    5: twMerge('px-10'),
    6: twMerge('px-12'),
  };

  const pyMap: Record<Required<Spacing>['py'], string> = {
    0: twMerge('py-0'),
    1: twMerge('py-2'),
    2: twMerge('py-4'),
    3: twMerge('py-6'),
    4: twMerge('py-8'),
    5: twMerge('py-10'),
    6: twMerge('py-12'),
  };

  const gapMap: Record<Required<Spacing>['gap'], string> = {
    0: twMerge('gap-0'),
    1: twMerge('gap-4'),
    2: twMerge('gap-6'),
    3: twMerge('gap-8'),
    4: twMerge('gap-10'),
    5: twMerge('gap-12'),
    6: twMerge('gap-14'),
  };

  const classNames = {
    p: p ? pMap[p] : undefined,
    px: px ? pxMap[px] : undefined,
    py: py ? pyMap[py] : undefined,
    gap: gap ? gapMap[gap] : undefined,
  };
  return {
    classNames,
    className: Object.values(classNames).join(' '),
  };
}
