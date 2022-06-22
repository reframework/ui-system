import { PopperPlacement } from '@utils/popper/Popper';

export type PlacementAxis = 'bottom' | 'center' | 'left' | 'right' | 'top';
export type PlacementAlign = 'start' | 'end' | 'center';
export type Placement = `${PlacementAxis}-${PlacementAlign}`;

export const parseInternalPlacement = (placement: string): PopperPlacement => {
  const InternalPlacementMap = {
    top: 'before',
    bottom: 'after',
    left: 'before',
    right: 'after',
    center: 'center',
  } as const;

  const [axis, align] = placement.split('-') as [PlacementAxis, PlacementAlign];

  // X first
  if (axis === 'left' || axis === 'right' || axis === 'center') {
    return [InternalPlacementMap[axis], align];
  }

  // Y first
  return [align, InternalPlacementMap[axis]];
};
