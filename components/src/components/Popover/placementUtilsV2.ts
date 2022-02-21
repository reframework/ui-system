export type PlacementAxis = 'before' | 'end' | 'center' | 'start' | 'after';
export type Placement = `${PlacementAxis}-${PlacementAxis}`;

enum Axis {
  XForward = 'X1',
  YForward = 'Y1',
  XBackward = 'X2',
  YBackward = 'Y2',
}

const placementToAxisMap = {
  after: { x: Axis.XForward, y: Axis.YForward },
  before: { x: Axis.XBackward, y: Axis.YBackward },
  center: { x: Axis.XForward, y: Axis.YForward },
  end: { x: Axis.XBackward, y: Axis.YBackward },
  start: { x: Axis.XForward, y: Axis.YForward },
};

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

export const viewport = {
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

interface ViewportOffset {
  top: number;
  left: number;
  bottom: number;
  right: number;
}

interface GetPlacementParams {
  offsetParentRect: DOMRect;
  offsetX?: number;
  offsetY?: number;
  targetRect?: DOMRect;
  triggerRect: DOMRect;
}

interface PlacementHandlerParams {
  axis: Axis;
  offset?: number;
  targetRect?: DOMRect;
  triggerRect: DOMRect;
  parentOffset: ViewportOffset;
}

const splitPlacement = (placement: Placement) => {
  return placement.split('-') as [PlacementAxis, PlacementAxis];
};

const getFlipPlacement = (direction: 'left' | 'right' | 'top' | 'bottom') => {
  if (direction === 'left') return 'after';
  if (direction === 'right') return 'before';
  if (direction === 'top') return 'after';
  return 'before';
  //
};

export class PlacementHero {
  static getPlacement(placement: Placement, params: GetPlacementParams) {
    const { offsetParentRect, targetRect, triggerRect } = params;
    const [placementX, placementY] = splitPlacement(placement);
    const viewportRect = viewport.getBoundingDOMRect();

    /**
     * Axis could x-left x-right, y-top, y-bottom
     */
    let xAxis = placementToAxisMap[placementX].x;
    let yAxis = placementToAxisMap[placementY].y;
    /**
     * Placement handlers e.g. before, start, end ...
     */
    let xHandler = PlacementHero[placementX];
    let yHandler = PlacementHero[placementY];

    const parentOffset = PlacementHero.getParentOffset(
      params.triggerRect,
      params.offsetParentRect
    );

    let computedPositionX = xHandler({
      axis: xAxis,
      offset: params.offsetX,
      parentOffset,
      targetRect,
      triggerRect,
    });

    let computedPositionY = yHandler({
      axis: yAxis,
      offset: params.offsetX,
      parentOffset,
      targetRect,
      triggerRect,
    });

    const overflowX = PlacementHero.getOverflow({
      axis: xAxis,
      computedPosition: computedPositionX,
      targetRect,
      offsetParentRect,
      viewportRect,
    });

    const overflowY = PlacementHero.getOverflow({
      axis: yAxis,
      computedPosition: computedPositionY,
      targetRect,
      offsetParentRect,
      viewportRect,
    });

    if (overflowX.direction) {
      if (targetRect && viewportRect.width > targetRect?.width * 2) {
        const flipPlacement = getFlipPlacement(overflowX.direction);
        xAxis = placementToAxisMap[flipPlacement].x;
        xHandler = PlacementHero[flipPlacement];
        computedPositionX = xHandler({
          axis: xAxis,
          offset: params.offsetX,
          parentOffset,
          targetRect,
          triggerRect,
        });
        console.log('SHould work X');
      }

      console.log('Has overflow X', overflowX);
    }

    if (overflowY.direction) {
      if (targetRect && viewportRect.height > targetRect?.height * 2) {
        const flipPlacement = getFlipPlacement(overflowY.direction);
        yHandler = PlacementHero[flipPlacement];
        yAxis = placementToAxisMap[flipPlacement].y;
        computedPositionY = yHandler({
          axis: yAxis,
          offset: params.offsetX,
          parentOffset,
          targetRect,
          triggerRect,
        });

        console.log('SHould work Y');
      }

      console.log('Has overflow Y', overflowY);
    }

    return {
      ...computedPositionX,
      ...computedPositionY,
    };
  }

  static getOverflow = (params: {
    axis: Axis;
    computedPosition: Partial<ViewportOffset>;
    targetRect: DOMRect;
    offsetParentRect: DOMRect;
    viewportRect: DOMRect;
  }) => {
    const {
      axis,
      computedPosition,
      offsetParentRect,
      targetRect,
      viewportRect,
    } = params;

    const { size, from } = AxisToPropertyMap[axis];
    const { [size]: viewportSize } = viewportRect;
    const contentSize = targetRect[size] + computedPosition[from]!;
    let overflow = 0;

    if (from === 'left' || from === 'top') {
      overflow = viewportSize - (contentSize + offsetParentRect[from]);
    }

    if (from === 'right' || from === 'bottom') {
      overflow =
        viewportSize - contentSize - (viewportSize - offsetParentRect[from]);
    }

    if (overflow >= 0) return { direction: null, overflow: 0 };

    if (from === 'left') return { direction: 'right', overflow };
    if (from === 'right') return { direction: 'left', overflow };
    if (from === 'top') return { direction: 'bottom', overflow };
    if (from === 'bottom') return { direction: 'top', overflow };

    return { direction: null, overflow: 0 };
  };

  // getTargetRect
  /**
   * todo parentOffset
   *
   * add viewport type: body/window
   */
  static getParentOffset = (
    originRect: DOMRect,
    // it is not viewport rect, its a offsetParentRect
    viewportRect: DOMRect
  ): ViewportOffset => {
    return {
      top: originRect.top - viewportRect.top,
      left: originRect.left - viewportRect.left,
      // backward positioning
      bottom: viewportRect.bottom - originRect.bottom,
      right: viewportRect.right - originRect.right,
    };
  };

  /**
   *
   */
  static end(params: PlacementHandlerParams): Partial<ViewportOffset> {
    return PlacementHero.start({ ...params });
  }

  /**
   *
   */
  static before(params: PlacementHandlerParams): Partial<ViewportOffset> {
    return PlacementHero.after({ ...params });
  }

  /**
   *
   */
  static center({
    axis,
    parentOffset,
    targetRect,
    triggerRect,
    offset = 0,
  }: PlacementHandlerParams): Partial<ViewportOffset> {
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

  static centerV2({
    axis,
    parentOffset,
    targetRect,
    triggerRect,
    offset = 0,
  }: PlacementHandlerParams): Partial<ViewportOffset> {
    if (!targetRect) {
      console.error('No popover DOMRect provided');
      return {};
    }

    // from : left | top, size: width | height

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
   *
   */
  static after({
    axis,
    offset = 0,
    triggerRect,
    parentOffset,
  }: PlacementHandlerParams): Partial<ViewportOffset> {
    const { from, size } = AxisToPropertyMap[axis];
    return {
      [from]: parentOffset[from] + triggerRect[size] + offset,
    };
  }

  /**
   *
   *
   */
  static start({ axis, offset = 0, parentOffset }: PlacementHandlerParams) {
    const { from } = AxisToPropertyMap[axis];
    return {
      [from]: parentOffset[from] + offset,
    };
  }
}
