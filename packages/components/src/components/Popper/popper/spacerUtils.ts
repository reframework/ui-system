// TODO import
const getArrowPlacement = (() => {}) as any;
type InternalPlacementTuple = any;

export const getSpacerPosition = (
  popperPlacement: InternalPlacementTuple,
  params: {
    popperRect: DOMRect;
    originRect: DOMRect;
    popperOffset: { left: number; top: number };
  },
) => {
  const spacerPlacement = getArrowPlacement(popperPlacement);
  const { popperRect, originRect, popperOffset } = params;

  if (spacerPlacement === 'bottom') {
    const distanceX = originRect.left - popperRect.left;
    const distanceY = originRect.top - popperRect.bottom;

    return {
      left: popperOffset.left + distanceX,
      top: popperOffset.top + popperRect.height,
      width: originRect.width,
      height: distanceY,
    };
  }

  if (spacerPlacement === 'top') {
    const distanceX = originRect.left - popperRect.left;
    const distanceY = popperRect.top - originRect.bottom;

    return {
      left: popperOffset.left + distanceX,
      top: originRect.bottom,
      width: originRect.width,
      height: distanceY,
    };
  }

  if (spacerPlacement === 'left') {
    const distanceX = popperRect.left - originRect.right;
    const distanceY = originRect.top - popperRect.top;

    return {
      left: popperOffset.left - distanceX,
      top: popperOffset.top + distanceY,
      width: distanceX,
      height: originRect.height,
    };
  }

  if (spacerPlacement === 'right') {
    const distanceX = originRect.left - popperRect.right;
    const distanceY = originRect.top - popperRect.top;

    return {
      left: popperOffset.left + popperRect.width,
      top: popperOffset.top + distanceY,
      width: distanceX,
      height: originRect.height,
    };
  }
};
