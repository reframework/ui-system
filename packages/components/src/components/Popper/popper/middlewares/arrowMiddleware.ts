enum ArrowPlacement {
  top = 'top',
  left = 'left',
  right = 'right',
  bottom = 'bottom',
}

enum InternalPlacement {
  after = 'after',
  before = 'before',
  center = 'center',
  start = 'start',
  end = 'end',
}

const SAFE_OFFSET = 10;
// TODO: import
type PlacementTuple = [InternalPlacement, InternalPlacement];

const AxisToPropertyMap = {} as any;
const Axis = {} as any;

export const getArrowPlacement = (
  placement: PlacementTuple,
): ArrowPlacement => {
  const [placementX, placementY] = placement;

  if (placementX === InternalPlacement.before) {
    return ArrowPlacement.right;
  }

  if (placementX === InternalPlacement.after) {
    return ArrowPlacement.left;
  }

  if (placementY === InternalPlacement.before) {
    return ArrowPlacement.bottom;
  }

  if (placementY === InternalPlacement.after) {
    return ArrowPlacement.top;
  }

  // TODO: return null
  return ArrowPlacement.top;
};

export const getArrowPosition = (
  popperPlacement: PlacementTuple,
  params: {
    originRect: DOMRect;
    popperRect: DOMRect;
    arrowRect: DOMRect;
    popperOffset: { left: number; top: number };
  },
) => {
  const arrowPlacement = getArrowPlacement(popperPlacement);
  const axis = [ArrowPlacement.top, ArrowPlacement.bottom].includes(
    arrowPlacement,
  )
    ? Axis.X
    : Axis.Y;

  const { popperRect, originRect, arrowRect, popperOffset } = params;

  const { from, size } = AxisToPropertyMap[axis];

  const MIN_OFFSET = popperOffset[from] + SAFE_OFFSET;
  const MAX_OFFSET =
    popperOffset[from] + popperRect[size] - (arrowRect[size] + SAFE_OFFSET);

  const A = originRect[from] - popperRect[from];
  const B = originRect[size] / 2 - arrowRect[size] / 2;
  const C = popperRect[from];

  let offset = A + B + C;
  if (offset < MIN_OFFSET) offset = MIN_OFFSET;
  if (offset > MAX_OFFSET) offset = MAX_OFFSET;

  let offsetLeft = 0;
  let offsetTop = 0;

  if (arrowPlacement === ArrowPlacement.bottom) {
    offsetLeft = offset;
    offsetTop = popperOffset.top + popperRect.height;
  }

  if (arrowPlacement === ArrowPlacement.top) {
    offsetLeft = offset;
    offsetTop = popperOffset.top - arrowRect.height;
  }

  if (arrowPlacement === ArrowPlacement.left) {
    offsetLeft = popperOffset.left - arrowRect.width;
    offsetTop = offset;
  }

  if (arrowPlacement === ArrowPlacement.right) {
    offsetLeft = popperOffset.left + popperRect.width;
    offsetTop = offset;
  }

  return {
    left: offsetLeft,
    top: offsetTop,
    placement: arrowPlacement,
  };
};
