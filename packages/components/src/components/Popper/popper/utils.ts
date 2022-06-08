export type PlacementAxis = 'top' | 'bottom' | 'left' | 'right' | 'center';
export type PlacementAlign = 'end' | 'center' | 'start';
export type Placement = `${PlacementAxis}-${PlacementAlign}`;

/**
 *
 */
export enum Axis {
  X = 'X',
  Y = 'Y',
}

/**
 *
 */
const AxisToPropertyMap = {
  [Axis.X]: {
    size: 'width',
    from: 'left',
  },
  [Axis.Y]: {
    size: 'height',
    from: 'top',
  },
} as const;

/**
 * ???
 */

// to do: add boundaries
const getViewportClientRect = (): DOMRect => {
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

type OffsetBoundaries = Record<'left' | 'top', number>;

interface Rects {
  popperRect: DOMRect;
  originRect: DOMRect;
  viewportRect: DOMRect;
  parentRect: DOMRect;
}

/**
 * This method triggers reflow
 */
export const getRects = (params: {
  popperElement: HTMLElement;
  originElement: HTMLElement;
}): Rects => {
  const { popperElement, originElement } = params;
  const { offsetParent } = popperElement;

  // to do: ownDocument
  const offsetParentRect = (
    offsetParent || document.body
  ).getBoundingClientRect();

  const originRect = originElement.getBoundingClientRect();
  const popperRect = popperElement.getBoundingClientRect();

  const viewportRect = getViewportClientRect();

  return {
    parentRect,
    originRect,
    popperRect,
    viewportRect,
  };
};
