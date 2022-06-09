import { Popper } from '@components/Popper/popper/Popper';
import {
  PlacementInternal,
  PlacementTuple,
} from '@components/Popper/popper/types';

type Overflow = {
  left: number;
  right: number;
  top: number;
  bottom: number;
};

const flipOffset = (offset = 0) => {
  return offset >= 0 ? -offset : Math.abs(offset);
};

export const flipPlacementUtils = {
  before: (a: number) => {
    return a < 0 ? PlacementInternal.after : PlacementInternal.before;
  },
  start: (_: number, b: number) => {
    return b < 0 ? PlacementInternal.end : PlacementInternal.start;
  },
  center: (a: number, b: number) => {
    const isA = a < 0;
    const isB = b < 0;
    if (isA === isB) return PlacementInternal.center;
    // TODO: prevent overflow
    return isA ? PlacementInternal.after : PlacementInternal.before;
  },
  end: (a: number) => {
    return a < 0 ? PlacementInternal.start : PlacementInternal.end;
  },
  after: (_: number, b: number) => {
    return b < 0 ? PlacementInternal.before : PlacementInternal.after;
  },
};

const flipPlacement = (
  placement: PlacementTuple,
  { left, right, top, bottom }: Overflow,
) => {
  const [placementX, placementY] = placement;
  const flippedX = flipPlacementUtils[placementX](left, right);
  const flippedY = flipPlacementUtils[placementY](top, bottom);
  console.log(placementX, placementY, flippedX, flippedY, 'FLIPPED');
  return [flippedX, flippedY] as PlacementTuple;
};

export const flip = (params: {
  popper: Popper;
  middlewareResult: { overflow: Overflow };
}) => {
  const { popper, middlewareResult } = params;
  const { overflow } = middlewareResult;

  popper.setPlacement(flipPlacement(popper.placement, overflow));
  popper.offset = {
    x: flipOffset(popper.offset.x),
    y: flipOffset(popper.offset.y),
  };
};

export const flipMiddleware = {
  name: 'flip',
  middleware: flip,
};
