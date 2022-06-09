import { ArrowPlacement } from '@components/Popper/popper/middlewares/arrowMiddleware';
import { Popper } from '@components/Popper/popper/Popper';

export const getHoverTrap = (params: {
  popper: Popper;
  middlewareResult: {
    arrow: {
      placement: ArrowPlacement;
    };
  };
}) => {
  const { popper, middlewareResult } = params;
  const { placement } = middlewareResult.arrow;
  const originRect = popper.origin.getBoundingClientRect();
  const popperRect = popper.DOMRect;

  const rectParams = {
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  };

  if (placement === ArrowPlacement.bottom) {
    const distanceX = originRect.left - popperRect.left;
    const distanceY = originRect.top - popperRect.bottom;

    rectParams.x = popperRect.left + distanceX;
    rectParams.y = popperRect.top + popperRect.height;
    rectParams.width = originRect.width;
    rectParams.height = distanceY;
  }

  if (placement === ArrowPlacement.top) {
    const distanceX = originRect.left - popperRect.left;
    const distanceY = popperRect.top - originRect.bottom;

    rectParams.x = popperRect.left + distanceX;
    rectParams.y = originRect.bottom;
    rectParams.width = originRect.width;
    rectParams.height = distanceY;
  }

  if (placement === ArrowPlacement.left) {
    const distanceX = popperRect.left - originRect.right;
    const distanceY = originRect.top - popperRect.top;

    rectParams.x = popperRect.left - distanceX;
    rectParams.y = popperRect.top + distanceY;
    rectParams.width = distanceX;
    rectParams.height = originRect.height;
  }

  if (placement === ArrowPlacement.right) {
    const distanceX = originRect.left - popperRect.right;
    const distanceY = originRect.top - popperRect.top;

    rectParams.x = popperRect.left + popperRect.width;
    rectParams.y = popperRect.top + distanceY;
    rectParams.width = distanceX;
    rectParams.height = originRect.height;
  }

  return DOMRectReadOnly.fromRect(rectParams);
};

export const hoverTrapMiddleware = {
  name: 'hoverTrap',
  middleware: getHoverTrap,
};
