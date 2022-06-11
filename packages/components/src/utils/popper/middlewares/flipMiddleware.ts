import { Popper, PopperPlacementEnum } from '@utils/popper/Popper';

type Overflow = {
  left: number;
  right: number;
  top: number;
  bottom: number;
};

const flipOffset = (offset = 0) => {
  return offset > 0 ? -offset : Math.abs(offset);
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

export const flip = (params: {
  popper: Popper;
  middlewareResult: { overflow: Overflow };
}) => {
  const { popper, middlewareResult } = params;
  const { overflow } = middlewareResult;

  const [placementX, placementY] = popper.placement;

  const flippedPlacementX = flipPlacementUtils[placementX](
    overflow.left,
    overflow.right,
  );

  const flippedPlacementY = flipPlacementUtils[placementY](
    overflow.top,
    overflow.bottom,
  );

  const flipX = placementX !== flippedPlacementX;
  const flipY = placementY !== flippedPlacementY;

  if (!flipX && !flipY) return;

  popper.setPlacement([flippedPlacementX, flippedPlacementY]);

  let { x: flippedOffsetX, y: flippedOffsetY } = popper.offset;

  if (flipX) flippedOffsetX = flipOffset(flippedOffsetX);
  if (flipY) flippedOffsetY = flipOffset(flippedOffsetY);

  popper.offset = {
    x: flippedOffsetX,
    y: flippedOffsetY,
  };

  console.log(popper.offset, 'flipped');
};

export const flipMiddleware = {
  name: 'flip',
  middleware: flip,
};
