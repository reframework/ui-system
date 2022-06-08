type InternalPlacementTuple = any;

interface Rects {
  popperRect: DOMRect;
  originRect: DOMRect;
  viewportRect: DOMRect;
  parentRect: DOMRect;
}

const getViewportRect = (): DOMRect => {
  // to do: VisualViewport
  const rect = {
    x: 0,
    y: 0,
    top: 0,
    left: 0,
    right: window.innerWidth,
    bottom: window.innerHeight,
    width: window.innerWidth,
    height: window.innerHeight,
  };

  return { ...rect, toJSON: () => rect };
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

export const flipOffset = (offset = 0) => {
  return offset >= 0 ? -offset : Math.abs(offset);
};

type PopperMiddlewareParams = {
  placement: InternalPlacementTuple;
  rects: Rects;
};

export const middleware = ({ rects }: PopperMiddlewareParams) => {
  return getOverflow(rects.popperRect);
};

export const overflowMiddleware = {
  overflow: middleware,
};
