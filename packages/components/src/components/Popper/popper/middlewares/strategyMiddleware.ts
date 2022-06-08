/**
 * Parent offset
 *
 */

interface Rects {
  popperRect: DOMRect;
  originRect: DOMRect;
}

/**
 * This method triggers reflow
 */
export const getRects = (params: {
  popperElement: HTMLElement;
  originElement: HTMLElement;
}) => {
  const { popperElement, originElement } = params;
  const originRect = originElement.getBoundingClientRect();
  const popperRect = popperElement.getBoundingClientRect();

  return {
    originRect,
    popperRect,
  };
};

const getParentRect = (popperElement: HTMLElement) => {
  return (popperElement.offsetParent || document.body).getBoundingClientRect();
};

export const getParentOffset = (
  originRect: DOMRect,
  parentRect: DOMRect,
): { left: number; top: number } => {
  // to do: ownDocument

  return {
    top: originRect.top - parentRect.top,
    left: originRect.left - parentRect.left,
  };
};

const middleWare = (
  _,
  { strategy, popperRect, originRect, popperElement }: Rects,
) => {
  //

  const parentRect = getParentRect(popperElement);

  /**
   * The left and top offsets from the first relative parent
   */
  const parentOffset = getParentOffset(originRect, parentRect);
  left = parentOffset.left + offsetLeft;
  top = parentOffset.top + offsetTop;
};

export const positionAbsoluteMiddleware = {
  positionAbsolute: middleWare,
};
