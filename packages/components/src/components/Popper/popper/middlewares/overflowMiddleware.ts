import { Popper } from '@components/Popper/popper/Popper';

const getViewportRect = (): DOMRect => {
  // to do: VisualViewport

  return DOMRectReadOnly.fromRect({
    x: 0,
    y: 0,
    width: window.innerWidth,
    height: window.innerHeight,
  });
};

/**
 *
 *
 */
export const getOverflow = (popperRect: DOMRect) => {
  const { width, height } = getViewportRect();

  // | < 0

  return {
    left: popperRect.left,
    right: width - (popperRect.left + popperRect.width),
    top: popperRect.top,
    bottom: height - (popperRect.top + popperRect.height),
  };
};

type PopperMiddlewareParams = {
  popper: Popper;
};

export const middleware = ({ popper }: PopperMiddlewareParams) => {
  return getOverflow(popper.DOMRect);
};

export const overflowMiddleware = {
  name: 'overflow',
  middleware,
};
