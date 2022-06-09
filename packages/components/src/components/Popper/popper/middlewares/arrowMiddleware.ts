import { axisToPropertyMap, Popper } from '@components/Popper/popper/Popper';
import {
  Axis,
  PlacementInternal,
  PlacementTuple,
} from '@components/Popper/popper/types';

export enum ArrowPlacement {
  bottom = 'bottom',
  left = 'left',
  right = 'right',
  top = 'top',
}

const arrowPlacementToAxisMap = {
  [ArrowPlacement.left]: Axis.X,
  [ArrowPlacement.right]: Axis.X,
  [ArrowPlacement.top]: Axis.Y,
  [ArrowPlacement.bottom]: Axis.Y,
};

const SAFE_OFFSET = 10;
// TODO: import

export const getArrowPlacement = (
  placement: PlacementTuple,
): ArrowPlacement => {
  const [placementX, placementY] = placement;

  if (placementX === PlacementInternal.before) {
    return ArrowPlacement.right;
  }

  if (placementX === PlacementInternal.after) {
    return ArrowPlacement.left;
  }

  if (placementY === PlacementInternal.before) {
    return ArrowPlacement.bottom;
  }

  if (placementY === PlacementInternal.after) {
    return ArrowPlacement.top;
  }

  // TODO: return null
  return ArrowPlacement.top;
};

export const getArrowPosition =
  (arrowElement: HTMLElement) => (params: { popper: Popper }) => {
    const { popper } = params;
    const arrowRect = arrowElement.getBoundingClientRect();

    // Arrow placement
    const arrowPlacement = getArrowPlacement(popper.placement);
    let { x, y } = popper.offset;

    /**
     * With an arrow, the minimum offset should be the size of the arrow
     */
    if (arrowPlacement === ArrowPlacement.left) {
      x = arrowRect.width + x;
    }

    if (arrowPlacement === ArrowPlacement.right) {
      x -= -arrowRect.width - x;
    }

    if (arrowPlacement === ArrowPlacement.top) {
      y = arrowRect.height + y;
    }

    if (arrowPlacement === ArrowPlacement.bottom) {
      y = -arrowRect.height - y;
    }

    popper.move({ x: x, y: y });

    /**
     * DOMRect with arrow offset
     */
    const popperRect = popper.DOMRect;
    const originRect = popper.origin.getBoundingClientRect();
    const mainAxis = arrowPlacementToAxisMap[arrowPlacement];
    const { from, size } = axisToPropertyMap[mainAxis];

    const MIN_OFFSET = popperRect[from] + SAFE_OFFSET;
    const MAX_OFFSET =
      popperRect[from] + popperRect[size] - (arrowRect[size] + SAFE_OFFSET);

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
      offsetTop = popperRect.top + popperRect.height;
    }

    if (arrowPlacement === ArrowPlacement.top) {
      offsetLeft = offset;
      offsetTop = popperRect.top - arrowRect.height;
    }

    if (arrowPlacement === ArrowPlacement.left) {
      offsetLeft = popperRect.left - arrowRect.width;
      offsetTop = offset;
    }

    if (arrowPlacement === ArrowPlacement.right) {
      offsetLeft = popperRect.left + popperRect.width;
      offsetTop = offset;
    }

    return {
      left: offsetLeft,
      top: offsetTop,
      placement: arrowPlacement,
    };
  };

export const arrowMiddleware = (arrowElement: HTMLElement) => ({
  name: 'arrow',
  middleware: getArrowPosition(arrowElement),
});
