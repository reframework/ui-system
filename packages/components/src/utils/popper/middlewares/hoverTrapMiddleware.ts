import { ArrowPlacementEnum } from '@utils/popper/middlewares/arrowMiddleware';
import { Popper } from '@utils/popper/Popper';

export const getHoverTrap = (params: {
  popper: Popper;
  middlewareResult: {
    arrow: {
      placement: ArrowPlacementEnum;
    };
  };
}) => {
  // out of screen
  const rectParams = {
    x: -999999,
    y: -999999,
    width: -999999,
    height: -999999,
  };

  /** Check if arrowMiddleware was before */
  if (!params?.middlewareResult?.arrow?.placement) return;

  const { popper, middlewareResult } = params;
  const placement = middlewareResult?.arrow?.placement;
  const originRect = popper.origin.getBoundingClientRect();
  const popperRect = popper.DOMRect;

  if (placement === ArrowPlacementEnum.bottom) {
    const distanceX = originRect.left - popperRect.left;
    const distanceY = originRect.top - popperRect.bottom;

    rectParams.x = popperRect.left + distanceX;
    rectParams.y = popperRect.top + popperRect.height;
    rectParams.width = originRect.width;
    rectParams.height = distanceY;
  }

  if (placement === ArrowPlacementEnum.top) {
    const distanceX = originRect.left - popperRect.left;
    const distanceY = popperRect.top - originRect.bottom;

    rectParams.x = popperRect.left + distanceX;
    rectParams.y = originRect.bottom;
    rectParams.width = originRect.width;
    rectParams.height = distanceY;
  }

  if (placement === ArrowPlacementEnum.left) {
    const distanceX = popperRect.left - originRect.right;
    const distanceY = originRect.top - popperRect.top;

    rectParams.x = popperRect.left - distanceX;
    rectParams.y = popperRect.top + distanceY;
    rectParams.width = distanceX;
    rectParams.height = originRect.height;
  }

  if (placement === ArrowPlacementEnum.right) {
    const distanceX = originRect.left - popperRect.right;
    const distanceY = originRect.top - popperRect.top;

    rectParams.x = popperRect.left + popperRect.width;
    rectParams.y = popperRect.top + distanceY;
    rectParams.width = distanceX;
    rectParams.height = originRect.height;
  }

  return DOMRectReadOnly.fromRect(rectParams).toJSON();
};

export const hoverTrapMiddleware = {
  name: 'hoverTrap',
  middleware: getHoverTrap,
};
