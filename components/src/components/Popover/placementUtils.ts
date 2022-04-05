/* eslint-disable prefer-const */
export type PlacementAxis = 'before' | 'end' | 'center' | 'start' | 'after';
export type Placement = `${PlacementAxis}-${PlacementAxis}`;
type BoundarySide = 'top' | 'left' | 'right' | 'bottom';

const asyncRAF = async (callback: Function) => {
  return new Promise((resolve) => {
    requestAnimationFrame((timestamp) => {
      resolve(callback(timestamp));
    });
  });
};

/**
 *
 */
enum Axis {
  X = 'X',
  Y = 'Y',
}

/**
 *
 */
const flippedBoundaryMap: Record<BoundarySide, BoundarySide> = {
  top: 'bottom',
  bottom: 'top',
  left: 'right',
  right: 'left',
};

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
 *
 */
const viewport = {
  getBoundingDOMRect: (): DOMRect => {
    return {
      x: 0,
      y: 0,
      top: 0,
      left: 0,
      right: window.innerWidth,
      bottom: window.innerHeight,
      width: window.innerWidth,
      height: window.innerHeight,
      toJSON: () => ({}),
    };
  },
};

type OffsetBoundaries = Record<BoundarySide, number>;

interface GetPlacementParams {
  offsetParentRect: DOMRect;
  offsetX?: number;
  offsetY?: number;
  targetRect: DOMRect;
  triggerRect: DOMRect;
  preventOverflowX?: boolean;
  preventOverflowY?: boolean;
}

interface GetOverflowParams {
  axis: Axis;
  computedPosition: Partial<OffsetBoundaries>;
  targetRect: DOMRect;
  offsetParentRect: DOMRect;
  viewportRect: DOMRect;
}

interface PlacementHandlerParams {
  axis: Axis;
  offset?: number;
  targetRect?: DOMRect;
  triggerRect: DOMRect;
  parentOffset: OffsetBoundaries;
}

export class PlacementHero {
  static getPlacement_V0(placement: Placement, params: GetPlacementParams) {
    const {
      offsetParentRect,
      targetRect,
      triggerRect,
      preventOverflowX = false,
      preventOverflowY = true,
      offsetX = 0,
      offsetY = 0,
    } = params;

    const {
      getParentOffset,
      isAnywayOverflowing,
      getFlippedPlacement,
      getOverflow,
    } = PlacementHero;

    const [placementX, placementY] = placement.split('-') as [
      PlacementAxis,
      PlacementAxis,
    ];
    /**
     * Viewport (window) boundaries
     */
    const viewportRect = viewport.getBoundingDOMRect();
    /**
     * Checks if viewport is larger then popup and flipping placement does make sense
     */
    const anywayOverflowing = isAnywayOverflowing(viewportRect, targetRect);
    /**
     * First relative parent offset
     */
    const parentOffset = getParentOffset(triggerRect, offsetParentRect);
    /**
     * Placement handlers e.g. before, start, end, center, after
     */
    let computePlacementX = PlacementHero[placementX];
    let computePlacementY = PlacementHero[placementY];
    /**
     * Overflowing
     */
    let overflowX;
    let overflowY;

    let computedPositionX = computePlacementX({
      axis: Axis.X,
      offset: offsetX,
      parentOffset,
      targetRect,
      triggerRect,
    });

    let computedPositionY = computePlacementY({
      axis: Axis.Y,
      offset: offsetY,
      parentOffset,
      targetRect,
      triggerRect,
    });

    /**
     * First check that flipping a placement does make sense
     */
    if (preventOverflowX && !anywayOverflowing.x) {
      overflowX = getOverflow({
        axis: Axis.X,
        computedPosition: computedPositionX,
        offsetParentRect,
        targetRect,
        viewportRect,
      });
    }

    /**
     * First check that flipping a placement does make sense
     */
    if (preventOverflowY && !anywayOverflowing.y) {
      overflowY = getOverflow({
        axis: Axis.Y,
        computedPosition: computedPositionY,
        offsetParentRect,
        targetRect,
        viewportRect,
      });
    }

    if (overflowX) {
      const flippedPlacement = getFlippedPlacement(overflowX);
      computePlacementX = PlacementHero[flippedPlacement];
      /**
       * Recalculates the placement for the X axis
       */
      computedPositionX = computePlacementX({
        axis: Axis.X,
        offset: params.offsetX,
        parentOffset,
        targetRect,
        triggerRect,
      });
    }

    if (overflowY) {
      const flippedPlacement = getFlippedPlacement(overflowY);
      computePlacementY = PlacementHero[flippedPlacement];
      /**
       * Recalculates the placement for the Y axis
       */
      computedPositionY = computePlacementY({
        axis: Axis.Y,
        offset: params.offsetX,
        parentOffset,
        targetRect,
        triggerRect,
      });
    }

    return {
      ...computedPositionX,
      ...computedPositionY,
    };
  }

  static getPlacement(placement: Placement, params: GetPlacementParams) {
    const {
      offsetParentRect,
      targetRect,
      triggerRect,
      // preventOverflowX = false,
      // preventOverflowY = true,
      // offsetX = 0,
      // offsetY = 0,
    } = params;

    const {
      getParentOffset,
      isAnywayOverflowing,
      // getFlippedPlacement,
      // getOverflow,
    } = PlacementHero;

    const [placementX, placementY] = placement.split('-') as [
      PlacementAxis,
      PlacementAxis,
    ];
    /**
     * Viewport (window) boundaries
     */
    const viewportRect = viewport.getBoundingDOMRect();
    /**
     * Checks if viewport is larger then popup and flipping placement does make sense
     */
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const anywayOverflowing = isAnywayOverflowing(viewportRect, targetRect);
    /**
     * First relative parent offset
     */
    const parentOffset = getParentOffset(triggerRect, offsetParentRect);
    /**
     * Placement handlers e.g. before, start, end, center, after
     */
    const computePlacementX = PlacementHero[placementX];
    const computePlacementY = PlacementHero[placementY];
    /**
     * Overflowing
     */
    // let overflowX;
    // let overflowY;

    const computedPositionX = computePlacementX({
      axis: Axis.X,
      // offset: offsetX,
      parentOffset,
      triggerRect,
    });

    const computedPositionY = computePlacementY({
      axis: Axis.Y,
      // offset: offsetY,
      parentOffset,
      triggerRect,
    });

    return {
      inset: '0 auto auto 0',
      transform: `translate3d(${computedPositionX.left}, ${computedPositionY.top}, 0px)`,
    };
  }

  /**
   *
   */
  private static getFlippedPlacement = (
    direction: BoundarySide,
  ): PlacementAxis => {
    return direction === 'left' || direction === 'top' ? 'after' : 'before';
  };

  /**
   *
   */
  private static isAnywayOverflowing = (
    viewportRect: DOMRect,
    targetRect: DOMRect,
  ) => {
    return {
      x: viewportRect.width < targetRect.width * 2,
      y: viewportRect.height < targetRect.height * 2,
    };
  };

  /**
   *
   */
  private static getOverflow = (params: GetOverflowParams) => {
    const {
      axis,
      computedPosition,
      offsetParentRect,
      targetRect,
      viewportRect,
    } = params;

    const { size, from } = AxisToPropertyMap[axis];
    const { [size]: viewportSize } = viewportRect;
    const { [from]: offsetParentFrom } = offsetParentRect;

    let overflow = 0;
    const contentSum = targetRect[size] + computedPosition[from]!;

    if (from === 'left' || from === 'top') {
      overflow = viewportSize - (contentSum + offsetParentFrom);
    }

    // if (from === 'right' || from === 'bottom') {
    //   overflow = viewportSize - contentSum - (viewportSize - offsetParentFrom);
    // }

    return overflow < 0 ? flippedBoundaryMap[from] : null;
  };

  private static getParentOffset = (
    originRect: DOMRect,
    parentOffsetRect: DOMRect,
  ): OffsetBoundaries => {
    return {
      top: originRect.top - parentOffsetRect.top,
      left: originRect.left - parentOffsetRect.left,
      bottom: 0, // parentOffsetRect.bottom - originRect.bottom,
      right: 0, // parentOffsetRect.right - originRect.right,
    };
  };

  /**
   *
   * Placement handlers
   *
   */
  private static end({
    axis,
    parentOffset,
    triggerRect,
    offset = 0,
  }: PlacementHandlerParams): Partial<OffsetBoundaries> {
    const { from, size } = AxisToPropertyMap[axis];
    const l = parentOffset[from] + triggerRect[size] + offset;
    return {
      [from]: `calc(${l}px - 100%)`,
    };
  }

  /**
   *
   */
  private static before({
    axis,
    parentOffset,
    offset = 0,
  }: PlacementHandlerParams): Partial<OffsetBoundaries> {
    const { from } = AxisToPropertyMap[axis];

    return {
      [from]: `calc(${parentOffset[from] + offset}px - 100%)`,
    };
  }

  /**
   *
   */
  private static center({
    axis,
    parentOffset,
    triggerRect,
    offset = 0,
  }: PlacementHandlerParams): Partial<OffsetBoundaries> {
    const { from, size } = AxisToPropertyMap[axis];
    const l = parentOffset[from] + triggerRect[size] / 2 + offset;

    return {
      [from]: `calc(${l}px - 50%)`,
    };
  }

  /**
   *
   */
  private static after({
    axis,
    offset = 0,
    triggerRect,
    parentOffset,
  }: PlacementHandlerParams): Partial<OffsetBoundaries> {
    const { from, size } = AxisToPropertyMap[axis];
    return {
      [from]: `${parentOffset[from] + triggerRect[size] + offset}px`,
    };
  }

  /**
   *
   */
  private static start({
    axis,
    offset = 0,
    parentOffset,
  }: PlacementHandlerParams) {
    const { from } = AxisToPropertyMap[axis];
    return {
      [from]: `${parentOffset[from] + offset}px`,
    };
  }

  // REFLOW
  static getComputedRects = async (
    targetElement: HTMLElement,
    referenceElement: HTMLElement,
  ) => {
    return asyncRAF(() => {
      // if (!targetElement || !referenceElement) return;

      let referenceRect;
      let offsetParentRect;
      let targetRect;

      // reflow
      const { offsetParent } = targetElement;
      // reflow
      offsetParentRect = (
        offsetParent || document.body
      ).getBoundingClientRect();
      // reflow
      referenceRect = referenceElement.getBoundingClientRect();
      // reflow
      targetRect = targetElement.getBoundingClientRect();

      if (!offsetParentRect || !referenceRect) return;

      return {
        offsetParentRect,
        targetRect,
        referenceRect,
      };
    });
  };
}
