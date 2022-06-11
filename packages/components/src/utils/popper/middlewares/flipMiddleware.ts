import {
  Popper,
  PopperPlacementEnum,
  PopperPlacement,
} from '@utils/popper/Popper';

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
    return a < 0 ? PopperPlacementEnum.after : PopperPlacementEnum.before;
  },
  start: (_: number, b: number) => {
    return b < 0 ? PopperPlacementEnum.end : PopperPlacementEnum.start;
  },
  center: (a: number, b: number) => {
    const isA = a < 0;
    const isB = b < 0;
    if (isA === isB) return PopperPlacementEnum.center;
    // TODO: prevent overflow
    return isA ? PopperPlacementEnum.after : PopperPlacementEnum.before;
  },
  end: (a: number) => {
    return a < 0 ? PopperPlacementEnum.start : PopperPlacementEnum.end;
  },
  after: (_: number, b: number) => {
    return b < 0 ? PopperPlacementEnum.before : PopperPlacementEnum.after;
  },
};

const flipPlacement = (
  placement: PopperPlacement,
  { left, right, top, bottom }: Overflow,
) => {
  const [placementX, placementY] = placement;
  const flippedX = flipPlacementUtils[placementX](left, right);
  const flippedY = flipPlacementUtils[placementY](top, bottom);
  return [flippedX, flippedY] as PopperPlacement;
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
