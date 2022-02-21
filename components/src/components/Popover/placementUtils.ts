export type PlacementAxis = 'before' | 'end' | 'center' | 'start' | 'after';
export type Placement = `${PlacementAxis}-${PlacementAxis}`;
type BoundarySide = 'top' | 'left' | 'right' | 'bottom';

const defaultPreventOverflow = { x: true, y: true };
const defaultOffset = 0;

/**
 *
 */
enum Axis {
  XForward = 'X1',
  YForward = 'Y1',
  XBackward = 'X2',
  YBackward = 'Y2',
}

/**
 *
 */
const placementToAxisMap: Record<PlacementAxis, { x: Axis; y: Axis }> = {
  after: { x: Axis.XForward, y: Axis.YForward },
  before: { x: Axis.XBackward, y: Axis.YBackward },
  center: { x: Axis.XForward, y: Axis.YForward },
  end: { x: Axis.XBackward, y: Axis.YBackward },
  start: { x: Axis.XForward, y: Axis.YForward },
};

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
  [Axis.XForward]: {
    size: 'width',
    from: 'left',
  },
  [Axis.YForward]: {
    size: 'height',
    from: 'top',
  },
  [Axis.XBackward]: {
    size: 'width',
    from: 'right',
  },
  [Axis.YBackward]: {
    size: 'height',
    from: 'bottom',
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
  preventOverflow?: { x: boolean; y: boolean };
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
  targetRect: DOMRect;
  triggerRect: DOMRect;
  parentOffset: OffsetBoundaries;
}

export class PlacementHero {
  static getPlacement(placement: Placement, params: GetPlacementParams) {
    const {
      offsetParentRect,
      targetRect,
      triggerRect,
      preventOverflow = defaultPreventOverflow,
      offsetX = defaultOffset,
      offsetY = defaultOffset,
    } = params;

    const {
      getParentOffset,
      isAnywayOverflowing,
      getFlippedPlacement,
      getOverflow,
    } = PlacementHero;

    const [placementX, placementY] = placement.split('-') as [
      PlacementAxis,
      PlacementAxis
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
     * Axis could be x-forward x-backward, y-forward, y-backward
     */
    let axisX = placementToAxisMap[placementX].x;
    let axisY = placementToAxisMap[placementY].y;
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
      axis: axisX,
      offset: offsetX,
      parentOffset,
      targetRect,
      triggerRect,
    });

    let computedPositionY = computePlacementY({
      axis: axisY,
      offset: offsetY,
      parentOffset,
      targetRect,
      triggerRect,
    });

    /**
     * First check that flipping a placement does make sense
     */
    if (preventOverflow?.x && !anywayOverflowing.x) {
      overflowX = getOverflow({
        axis: axisX,
        computedPosition: computedPositionX,
        offsetParentRect,
        targetRect,
        viewportRect,
      });
    }

    /**
     * First check that flipping a placement does make sense
     */
    if (preventOverflow?.y && !anywayOverflowing.y) {
      overflowY = getOverflow({
        axis: axisY,
        computedPosition: computedPositionY,
        offsetParentRect,
        targetRect,
        viewportRect,
      });
    }

    if (overflowX) {
      const flippedPlacement = getFlippedPlacement(overflowX);
      axisX = placementToAxisMap[flippedPlacement].x;
      computePlacementX = PlacementHero[flippedPlacement];
      /**
       * Recalculates the placement for the X axis
       */
      computedPositionX = computePlacementX({
        axis: axisX,
        offset: params.offsetX,
        parentOffset,
        targetRect,
        triggerRect,
      });
    }

    if (overflowY) {
      const flippedPlacement = getFlippedPlacement(overflowY);
      computePlacementY = PlacementHero[flippedPlacement];
      axisY = placementToAxisMap[flippedPlacement].y;
      /**
       * Recalculates the placement for the Y axis
       */
      computedPositionY = computePlacementY({
        axis: axisY,
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

  /**
   *
   */
  private static getFlippedPlacement = (
    direction: BoundarySide
  ): PlacementAxis => {
    return direction === 'left' || direction === 'top' ? 'after' : 'before';
  };

  /**
   *
   */
  private static isAnywayOverflowing = (
    viewportRect: DOMRect,
    targetRect: DOMRect
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

    if (from === 'right' || from === 'bottom') {
      overflow = viewportSize - contentSum - (viewportSize - offsetParentFrom);
    }

    return overflow < 0 ? flippedBoundaryMap[from] : null;
  };

  private static getParentOffset = (
    originRect: DOMRect,
    parentOffsetRect: DOMRect
  ): OffsetBoundaries => {
    return {
      top: originRect.top - parentOffsetRect.top,
      left: originRect.left - parentOffsetRect.left,
      bottom: parentOffsetRect.bottom - originRect.bottom,
      right: parentOffsetRect.right - originRect.right,
    };
  };

  /**
   *
   * Placement handlers
   *
   */
  private static end(
    params: PlacementHandlerParams
  ): Partial<OffsetBoundaries> {
    return PlacementHero.start({ ...params });
  }

  /**
   *
   */
  private static before(
    params: PlacementHandlerParams
  ): Partial<OffsetBoundaries> {
    return PlacementHero.after({ ...params });
  }

  /**
   *
   */
  private static center({
    axis,
    parentOffset,
    targetRect,
    triggerRect,
    offset = defaultOffset,
  }: PlacementHandlerParams): Partial<OffsetBoundaries> {
    if (!targetRect) {
      console.error('No popover DOMRect provided');
      return {};
    }

    const { from, size } = AxisToPropertyMap[axis];

    return {
      [from]:
        parentOffset[from] +
        triggerRect[size] / 2 -
        targetRect[size] / 2 +
        offset,
    };
  }

  /**
   *
   */
  private static after({
    axis,
    offset = defaultOffset,
    triggerRect,
    parentOffset,
  }: PlacementHandlerParams): Partial<OffsetBoundaries> {
    const { from, size } = AxisToPropertyMap[axis];
    return {
      [from]: parentOffset[from] + triggerRect[size] + offset,
    };
  }

  /**
   *
   */
  private static start({
    axis,
    offset = defaultOffset,
    parentOffset,
  }: PlacementHandlerParams) {
    const { from } = AxisToPropertyMap[axis];
    return {
      [from]: parentOffset[from] + offset,
    };
  }
}
