import { flipMiddleware } from '@components/Popper/popper/middlewares/flipMiddleware';
import { overflowMiddleware } from '@components/Popper/popper/middlewares/overflowMiddleware';
import { positionAbsoluteMiddleware } from '@components/Popper/popper/middlewares/strategyMiddleware';
import { Axis, getRects } from '@components/Popper/popper/utils';
import {
  placementUtils,
  getParentOffset,
  InternalPlacementTuple,
} from './placementUtils';

enum Strategy {
  absolute = 'absolute',
  fixed = 'fixed',
}

interface DOMRectParams {
  width: number;
  height: number;
  left: number;
  top: number;
  // optional
  bottom?: number;
  right?: number;
  x?: number;
  y?: number;
}

class DOMRectV1 implements DOMRect {
  left: number;
  top: number;
  width: number;
  height: number;
  bottom: number;
  right: number;
  x: number;
  y: number;

  static fromRect = (rect: DOMRectParams) => {
    return new DOMRect(rect as any);
  };

  constructor(params: DOMRectParams) {
    this.left = params.left;
    this.top = params.top;
    this.width = params.width;
    this.height = params.height;
    // Computed
    this.bottom = params.bottom || params.top + params.height;
    this.right = params.right || params.left + params.width;
    this.x = params.x || params.left;
    this.y = params.y || params.top;
  }

  add() {
    // todo
  }
  subtract() {
    // todo
  }

  toJSON() {
    return this;
  }
}
/**
 *
 */
type Placement = any;
const parseInternalPlacement = (() => {}) as any;
const getArrowPlacement = (() => {}) as any;

const getOverflow = (() => {}) as any;
const flipPlacement = (() => {}) as any;
const getFlippedOffset = (() => {}) as any;
const getArrowPosition = (() => {}) as any;
const getSpacerPosition = (() => {}) as any;

/**
 * TODO: move offsets to modifier
 */

export const getPosition = (
  placement: InternalPlacementTuple,
  params: {
    // parentRect: DOMRect;
    popperRect: DOMRect;
    originRect: DOMRect;
    // strategy: Strategy;
  },
) => {
  const { popperRect, originRect } = params;
  const [placementX, placementY] = placement;
  const getOffsetX = placementUtils[placementX];
  const getOffsetY = placementUtils[placementY];

  const { left: offsetLeft } = getOffsetX({
    axis: Axis.X,
    originRect,
    popperRect,
  });

  const { top: offsetTop } = getOffsetY({
    axis: Axis.Y,
    originRect,
    popperRect,
  });

  return DOMRectV1.fromRect({
    width: popperRect.width,
    height: popperRect.height,
    left: originRect.left + offsetLeft,
    top: originRect.top + offsetTop,
  });
};

export const computeV1 = (
  placement: Placement,
  params: {
    originElement: HTMLElement;
    popperElement: HTMLElement;
    //
    middlewares: (() => void)[];
  },
) => {
  const { originElement, popperElement, middlewares } = params;

  /**
   * Prepare data
   */
  const internalPlacement = parseInternalPlacement(placement);
  const rects = getRects({ originElement, popperElement });

  const position = getPosition(internalPlacement, {
    originRect: rects.originRect,
    parentRect: rects.parentRect,
    popperRect: rects.popperRect,
  });

  middlewares.map((middleware) => middleware(placement, position));
};

const POSITION = computeV1('bottom-start', {
  popperElement: document.createElement('div'),
  originElement: document.createElement('div'),
  middlewares: {
    ...overflowMiddleware,
    ...flipMiddleware,
    ...arrowMiddleware,
    ...hoverTrapMiddleware,
    ...positionAbsoluteMiddleware,
  },
});

export const computeV0 = (
  placement: Placement,
  params: {
    arrowElement: HTMLElement | null;
    originElement: HTMLElement;
    popperElement: HTMLElement;
    offsetX?: number;
    offsetY?: number;
    //
    preventOverflowX?: boolean;
    preventOverflowY?: boolean;
    spacer?: boolean;
    //
    //
    //
    middlewares: (() => void)[];
  },
) => {
  const { popperElement, originElement, arrowElement } = params;
  const rects = getRects(popperElement, originElement, arrowElement);
  /**
   * Internal placement
   */
  let [placementX, placementY] = parseInternalPlacement(placement);

  let offsetX = params.offsetX || 0;
  let offsetY = params.offsetY || 0;

  /**
   * With an arrow, the minimum offset should be the size of the arrow
   */
  if (rects.arrowRect) {
    const arrowPlacement = getArrowPlacement([placementX, placementY]);

    if (arrowPlacement === 'left') {
      offsetX = rects.arrowRect.width + offsetX;
    }

    if (arrowPlacement === 'top') {
      offsetY = rects.arrowRect.height + offsetY;
    }

    if (arrowPlacement === 'right') {
      offsetX = -rects.arrowRect.width - offsetX;
    }

    if (arrowPlacement === 'bottom') {
      offsetY = -rects.arrowRect.height - offsetY;
    }
  }

  /**
   * The first computed position, before flipping
   */
  let popperPosition = getPosition([placementX, placementY], {
    ...rects,
    offsetY,
    offsetX,
  });

  /**
   * Flipping
   * to do: add overflow strategy
   * x / y: flip | scroll | none
   */
  const overflow = getOverflow({
    popperPosition,
    ...rects,
  });

  const [flipPlacementX, flipPlacementY] = flipPlacement(
    [placementX, placementY],
    overflow,
  );

  const flipX = placementX !== flipPlacementX;
  const flipY = placementY !== flipPlacementY;

  if (flipX || flipY) {
    /**
     * Updates internal placement
     */
    if (flipX) placementX = flipPlacementX;
    if (flipY) placementY = flipPlacementY;
    /**
     * Updates offsets
     */
    if (flipX) offsetX = getFlippedOffset(offsetX);
    if (flipY) offsetY = getFlippedOffset(offsetY);
    /**
     * Updates flipped position
     */
    popperPosition = getPosition([placementX, placementY], {
      ...rects,
      offsetX,
      offsetY,
    });
  }

  /** Arrow / Spacer */

  let arrowPosition;
  let spacerPosition;

  if (rects.arrowRect) {
    arrowPosition = getArrowPosition([placementX, placementY], {
      arrowRect: rects.arrowRect,
      originRect: rects.originRect,
      popperRect: rects.popperRect,
      popperOffset: {
        left: popperPosition.left,
        top: popperPosition.top,
      },
    });
  }

  if (params.spacer) {
    spacerPosition = getSpacerPosition([placementX, placementY], {
      originRect: rects.originRect,
      popperRect: popperPosition.DOMRect,
      popperOffset: {
        left: popperPosition.left,
        top: popperPosition.top,
      },
    });
  }

  return {
    arrowPlacement: arrowPosition?.placement,
    arrowOffset: {
      left: arrowPosition?.left,
      top: arrowPosition?.top,
    },
    popperOffset: {
      left: popperPosition.left,
      top: popperPosition.top,
    },
    spacerOffset: {
      left: spacerPosition?.left,
      top: spacerPosition?.top,
      width: spacerPosition?.width,
      height: spacerPosition?.height,
    },
  };
};

/**
 *
 *
 *
 *
 *
 * Legacy
 *
 *
 *
 *
 *
 */
export function computePosition(
  placement: Placement,
  params: {
    arrowElement: HTMLElement | null;
    originElement: HTMLElement;
    popperElement: HTMLElement;
    offsetX?: number;
    offsetY?: number;
    //
    preventOverflowX?: boolean;
    preventOverflowY?: boolean;

    spacer?: boolean;
  },
) {
  const { popperElement, originElement, arrowElement } = params;
  const rects = getRects(popperElement, originElement, arrowElement);
  /**
   * Internal placement
   */
  let [placementX, placementY] = parseInternalPlacement(placement);

  let offsetX = params.offsetX || 0;
  let offsetY = params.offsetY || 0;

  /**
   * With an arrow, the minimum offset should be the size of the arrow
   */
  if (rects.arrowRect) {
    const arrowPlacement = getArrowPlacement([placementX, placementY]);

    if (arrowPlacement === 'left') {
      offsetX = rects.arrowRect.width + offsetX;
    }

    if (arrowPlacement === 'top') {
      offsetY = rects.arrowRect.height + offsetY;
    }

    if (arrowPlacement === 'right') {
      offsetX = -rects.arrowRect.width - offsetX;
    }

    if (arrowPlacement === 'bottom') {
      offsetY = -rects.arrowRect.height - offsetY;
    }
  }

  /**
   * The first computed position, before flipping
   */
  let popperPosition = getPosition([placementX, placementY], {
    ...rects,
    offsetY,
    offsetX,
  });

  /**
   * Flipping
   * to do: add overflow strategy
   * x / y: flip | scroll | none
   */
  const overflow = getOverflow({
    popperPosition,
    ...rects,
  });

  const [flipPlacementX, flipPlacementY] = flipPlacement(
    [placementX, placementY],
    overflow,
  );

  const flipX = placementX !== flipPlacementX;
  const flipY = placementY !== flipPlacementY;

  if (flipX || flipY) {
    /**
     * Updates internal placement
     */
    if (flipX) placementX = flipPlacementX;
    if (flipY) placementY = flipPlacementY;
    /**
     * Updates offsets
     */
    if (flipX) offsetX = getFlippedOffset(offsetX);
    if (flipY) offsetY = getFlippedOffset(offsetY);
    /**
     * Updates flipped position
     */
    popperPosition = getPosition([placementX, placementY], {
      ...rects,
      offsetX,
      offsetY,
    });
  }

  /** Arrow / Spacer */

  let arrowPosition;
  let spacerPosition;

  if (rects.arrowRect) {
    arrowPosition = getArrowPosition([placementX, placementY], {
      arrowRect: rects.arrowRect,
      originRect: rects.originRect,
      popperRect: rects.popperRect,
      popperOffset: {
        left: popperPosition.left,
        top: popperPosition.top,
      },
    });
  }

  if (params.spacer) {
    spacerPosition = getSpacerPosition([placementX, placementY], {
      originRect: rects.originRect,
      popperRect: popperPosition.DOMRect,
      popperOffset: {
        left: popperPosition.left,
        top: popperPosition.top,
      },
    });
  }

  return {
    arrowPlacement: arrowPosition?.placement,
    arrowOffset: {
      left: arrowPosition?.left,
      top: arrowPosition?.top,
    },
    popperOffset: {
      left: popperPosition.left,
      top: popperPosition.top,
    },
    spacerOffset: {
      left: spacerPosition?.left,
      top: spacerPosition?.top,
      width: spacerPosition?.width,
      height: spacerPosition?.height,
    },
  };
}
