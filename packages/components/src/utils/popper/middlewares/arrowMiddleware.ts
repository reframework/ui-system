import {
  Axis,
  axisToPropertyMap,
  Popper,
  PopperPlacement,
  PopperPlacementEnum,
} from '@utils/popper/Popper';

export enum ArrowPlacementEnum {
  bottom = 'bottom',
  left = 'left',
  right = 'right',
  top = 'top',
}

const arrowPlacementToAxisMap = {
  [ArrowPlacementEnum.left]: Axis.Y,
  [ArrowPlacementEnum.right]: Axis.Y,
  [ArrowPlacementEnum.top]: Axis.X,
  [ArrowPlacementEnum.bottom]: Axis.X,
};

const SAFE_OFFSET = 10;
// TODO: import

export const getArrowPlacementEnum = (
  placement: PopperPlacement,
): ArrowPlacementEnum => {
  const [placementX, placementY] = placement;

  if (placementX === PopperPlacementEnum.before) {
    return ArrowPlacementEnum.right;
  }

  if (placementX === PopperPlacementEnum.after) {
    return ArrowPlacementEnum.left;
  }

  if (placementY === PopperPlacementEnum.before) {
    return ArrowPlacementEnum.bottom;
  }

  if (placementY === PopperPlacementEnum.after) {
    return ArrowPlacementEnum.top;
  }

  // TODO: return null
  return ArrowPlacementEnum.top;
};

export const getArrowPosition =
  (arrowElement: HTMLElement) => (params: { popper: Popper }) => {
    const { popper } = params;
    const arrowRect = arrowElement.getBoundingClientRect();

    // Arrow placement
    const arrowPlacementEnum = getArrowPlacementEnum(popper.placement);
    let { x, y } = popper.offset;

    /**
     * With an arrow, the minimum offset should be the size of the arrow
     */
    if (arrowPlacementEnum === ArrowPlacementEnum.left) {
      x += arrowRect.width;
    }

    if (arrowPlacementEnum === ArrowPlacementEnum.right) {
      x -= arrowRect.width;
    }

    if (arrowPlacementEnum === ArrowPlacementEnum.top) {
      y += arrowRect.height;
    }

    if (arrowPlacementEnum === ArrowPlacementEnum.bottom) {
      y -= arrowRect.height;
    }

    popper.move({ x, y });

    /**
     * DOMRect with arrow offset
     */
    const popperRect = popper.DOMRect;
    const originRect = popper.origin.getBoundingClientRect();
    const mainAxis = arrowPlacementToAxisMap[arrowPlacementEnum];
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

    if (arrowPlacementEnum === ArrowPlacementEnum.bottom) {
      offsetLeft = offset;
      offsetTop = popperRect.top + popperRect.height;
    }

    if (arrowPlacementEnum === ArrowPlacementEnum.top) {
      offsetLeft = offset;
      offsetTop = popperRect.top - arrowRect.height;
    }

    if (arrowPlacementEnum === ArrowPlacementEnum.left) {
      offsetLeft = popperRect.left - arrowRect.width;
      offsetTop = offset;
    }

    if (arrowPlacementEnum === ArrowPlacementEnum.right) {
      offsetLeft = popperRect.left + popperRect.width;
      offsetTop = offset;
    }

    return {
      left: offsetLeft,
      top: offsetTop,
      placement: arrowPlacementEnum,
    };
  };

export const arrowMiddleware = (arrowElement: HTMLElement) => ({
  name: 'arrow',
  middleware: getArrowPosition(arrowElement),
});
