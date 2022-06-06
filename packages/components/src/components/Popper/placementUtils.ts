export type PlacementAxis = 'top' | 'bottom' | 'left' | 'right' | 'center';
export type PlacementAlign = 'end' | 'center' | 'start';
export type Placement = `${PlacementAxis}-${PlacementAlign}`;

/**
 * @private
 */
type InternalPlacement = 'end' | 'center' | 'start' | 'before' | 'after';
// type ArrowPlacement = 'top' | 'left' | 'right' | 'bottom';

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
const InternalPlacementMap = {
  top: 'before',
  bottom: 'after',
  left: 'before',
  right: 'after',
  center: 'center',
} as const;

type OverflowValues = [number, number];
type InternalPlacementTuple = [InternalPlacement, InternalPlacement];
type AxisOverflow = Record<Axis, OverflowValues>;

const parsePlacement = (
  placement: Placement,
): [InternalPlacement, InternalPlacement] => {
  const [axis, align] = placement.split('-') as [PlacementAxis, PlacementAlign];

  // todo: center

  // X first
  if (axis === 'left' || axis === 'right') {
    return [InternalPlacementMap[axis], align];
  }

  // Y first
  return [align, InternalPlacementMap[axis]];
};

const flipPlacement = {
  before: ([a]: OverflowValues): InternalPlacement => {
    return a < 0 ? 'after' : 'before';
  },
  start: ([, b]: OverflowValues): InternalPlacement => {
    return b < 0 ? 'end' : 'start';
  },
  center: (overflow: OverflowValues): InternalPlacement => {
    const [isA, isB] = overflow.map((it) => it < 0);
    if (isA === isB) return 'center';
    return isA ? 'after' : 'before';
  },
  end: ([a]: OverflowValues): InternalPlacement => {
    return a < 0 ? 'start' : 'end';
  },
  after: ([, b]: OverflowValues): InternalPlacement => {
    return b < 0 ? 'before' : 'after';
  },
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
  arrowRect: DOMRect | null;
  popperRect: DOMRect;
  originRect: DOMRect;
  viewportRect: DOMRect;
  offsetParentRect: DOMRect;
}

interface GetPositionParams extends Rects {
  offsetX?: number;
  offsetY?: number;
}

interface GetOverflowParams extends Rects {
  popperPosition: Record<'left' | 'top', number>;
}

interface PlacementHandlerParams
  extends Pick<Rects, 'popperRect' | 'originRect'> {
  axis: Axis;
  offset?: number;
  // parentOffset: OffsetBoundaries;
}

export class PopperHero {
  static getPosition = (
    placement: InternalPlacementTuple,
    params: GetPositionParams,
  ) => {
    const {
      offsetParentRect,
      popperRect,
      originRect,
      offsetX = 0,
      offsetY = 0,
    } = params;

    const [placementX, placementY] = placement;

    const {
      getParentOffset,
      [placementX]: getOffsetX,
      [placementY]: getOffsetY,
    } = PopperHero;

    const { left: X } = getOffsetX({
      axis: Axis.X,
      offset: offsetX,
      originRect,
      popperRect,
    });

    const { top: Y } = getOffsetY({
      axis: Axis.Y,
      offset: offsetY,
      originRect,
      popperRect,
    });

    /**
     * The first relative parent offset
     */
    const parentOffset = getParentOffset(originRect, offsetParentRect);

    const { width, height } = popperRect;
    const offsetParentLeft = parentOffset.left + X;
    const offsetParentTop = parentOffset.top + Y;
    const x = originRect.left + X;
    const y = originRect.top + Y;

    return {
      left: offsetParentLeft,
      top: offsetParentTop,
      DOMRect: {
        width,
        height,
        left: x,
        top: y,
        x,
        y,
        right: x + width,
        bottom: y + height,
        toJSON: () => '',
      },
    };
  };

  static getArrowPlacement = (placement: InternalPlacementTuple) => {
    const [placementX, placementY] = placement;

    if (placementX === 'after') {
      return 'left';
    }

    if (placementX === 'before') {
      return 'right';
    }

    if (placementY === 'after') {
      return 'top';
    }

    if (placementY === 'before') {
      return 'bottom';
    }

    // TODO: return null
    return 'top';
  };

  static getArrowPosition = (
    popperPlacement: InternalPlacementTuple,
    params: {
      originRect: DOMRect;
      popperRect: DOMRect;
      arrowRect: DOMRect;
      popperOffset: { left: number; top: number };
    },
  ) => {
    const arrowPlacement = PopperHero.getArrowPlacement(popperPlacement);
    const axis = ['top', 'bottom'].includes(arrowPlacement) ? Axis.X : Axis.Y;

    const { popperRect, originRect, arrowRect, popperOffset } = params;

    const { from, size } = AxisToPropertyMap[axis];

    const MIN_OFFSET = popperOffset[from] + 10;
    const MAX_OFFSET =
      popperOffset[from] + popperRect[size] - (arrowRect[size] + 10);

    const A = originRect[from] - popperRect[from];
    const B = originRect[size] / 2 - arrowRect[size] / 2;
    const C = popperRect[from];

    let offset = A + B + C;
    if (offset < MIN_OFFSET) offset = MIN_OFFSET;
    if (offset > MAX_OFFSET) offset = MAX_OFFSET;

    if (arrowPlacement === 'bottom') {
      return {
        left: offset,
        top: popperOffset.top + popperRect.height,
        placement: arrowPlacement,
      };
    }

    if (arrowPlacement === 'top') {
      return {
        left: offset,
        top: popperOffset.top - arrowRect.height,
        placement: arrowPlacement,
      };
    }

    if (arrowPlacement === 'left') {
      return {
        left: popperOffset.left - arrowRect.width,
        top: offset,
        placement: arrowPlacement,
      };
    }

    if (arrowPlacement === 'right') {
      return {
        left: popperOffset.left + popperRect.width,
        top: offset,
        placement: arrowPlacement,
      };
    }
  };

  /**
   *
   *
   */
  static getSpacerPosition = (
    popperPlacement: InternalPlacementTuple,
    params: {
      popperRect: DOMRect;
      originRect: DOMRect;
      popperOffset: { left: number; top: number };
    },
  ) => {
    const spacerPlacement = PopperHero.getArrowPlacement(popperPlacement);
    const { popperRect, originRect, popperOffset } = params;

    if (spacerPlacement === 'bottom') {
      const distanceX = originRect.left - popperRect.left;
      const distanceY = originRect.top - popperRect.bottom;

      return {
        left: popperOffset.left + distanceX,
        top: popperOffset.top + popperRect.height,
        width: originRect.width,
        height: distanceY,
      };
    }

    if (spacerPlacement === 'top') {
      const distanceX = originRect.left - popperRect.left;
      const distanceY = popperRect.top - originRect.bottom;

      return {
        left: popperOffset.left + distanceX,
        top: originRect.bottom,
        width: originRect.width,
        height: distanceY,
      };
    }

    if (spacerPlacement === 'left') {
      const distanceX = popperRect.left - originRect.right;
      const distanceY = originRect.top - popperRect.top;

      return {
        left: popperOffset.left - distanceX,
        top: popperOffset.top + distanceY,
        width: distanceX,
        height: originRect.height,
      };
    }

    if (spacerPlacement === 'right') {
      const distanceX = originRect.left - popperRect.right;
      const distanceY = originRect.top - popperRect.top;

      return {
        left: popperOffset.left + popperRect.width,
        top: popperOffset.top + distanceY,
        width: distanceX,
        height: originRect.height,
      };
    }
  };

  /**
   *
   *
   */
  static getOverflow = (params: GetOverflowParams): AxisOverflow => {
    const { popperPosition, offsetParentRect, popperRect, viewportRect } =
      params;

    const sumX = offsetParentRect.left + popperPosition.left!;
    const sumY = offsetParentRect.top + popperPosition.top!;

    return {
      // [left, right]
      [Axis.X]: [sumX, viewportRect.width - (sumX + popperRect.width)],
      // [top, bottom]
      [Axis.Y]: [sumY, viewportRect.height - (sumY + popperRect.height)],
    };
  };
  /**
   *
   *
   */
  static getParentOffset = (
    originRect: DOMRect,
    parentOffsetRect: DOMRect,
  ): OffsetBoundaries => {
    return {
      top: originRect.top - parentOffsetRect.top,
      left: originRect.left - parentOffsetRect.left,
    };
  };

  /**
   *
   * Placement handlers
   *
   */
  static end({
    axis,
    originRect,
    offset = 0,
    popperRect,
  }: PlacementHandlerParams) {
    const { from, size } = AxisToPropertyMap[axis];
    const referenceSize = originRect[size];
    const targetSize = popperRect[size];

    return {
      [from]: referenceSize - targetSize + offset,
    };
  }

  /**
   *
   */
  static before({ axis, offset = 0, popperRect }: PlacementHandlerParams) {
    const { from, size } = AxisToPropertyMap[axis];

    return {
      [from]: offset - popperRect[size],
    };
  }

  /**
   *
   */
  static center({
    axis,
    originRect,
    popperRect,
    offset = 0,
  }: PlacementHandlerParams) {
    const { from, size } = AxisToPropertyMap[axis];
    const targetSize = popperRect[size] / 2;
    const referenceSize = originRect[size] / 2;
    return {
      [from]: referenceSize - targetSize + offset,
    };
  }

  /**
   *
   */
  static after({ axis, offset = 0, originRect }: PlacementHandlerParams) {
    const { from, size } = AxisToPropertyMap[axis];
    return {
      [from]: originRect[size] + offset,
    };
  }

  /**
   *
   */
  static start({ axis, offset = 0 }: PlacementHandlerParams) {
    const { from } = AxisToPropertyMap[axis];
    return {
      [from]: offset,
    };
  }

  static flipPlacement(
    [placementX, placementY]: InternalPlacementTuple,
    overflow: AxisOverflow,
  ) {
    return [
      flipPlacement[placementX](overflow.X),
      flipPlacement[placementY](overflow.Y),
    ];
  }

  static getFlippedOffset(offset = 0) {
    return offset >= 0 ? -offset : Math.abs(offset);
  }

  /**
   * This method triggers reflow
   */
  static getRects = (
    targetElement: HTMLElement,
    originElement: HTMLElement,
    arrowElement?: HTMLElement,
  ): Rects => {
    const { offsetParent } = targetElement;
    // to do: ownDocument
    const offsetParentRect = (
      offsetParent || document.body
    ).getBoundingClientRect();

    const originRect = originElement.getBoundingClientRect();
    const popperRect = targetElement.getBoundingClientRect();
    const arrowRect = arrowElement?.getBoundingClientRect?.();

    const viewportRect = getViewportClientRect();

    return {
      arrowRect: arrowRect || null,
      offsetParentRect,
      originRect,
      popperRect,
      viewportRect,
    };
  };
}

/**
 *
 */
export function computePosition(
  placement: Placement,
  params: {
    arrowElement?: HTMLElement;
    originElement: HTMLElement;
    targetElement: HTMLElement;
    offsetX?: number;
    offsetY?: number;
    //
    preventOverflowX?: boolean;
    preventOverflowY?: boolean;
    spacer?: boolean;
  },
) {
  const { targetElement, originElement, arrowElement } = params;
  const rects = PopperHero.getRects(targetElement, originElement, arrowElement);
  /**
   * Internal placement
   */
  let [placementX, placementY] = parsePlacement(placement);

  let offsetX = params.offsetX || 0;
  let offsetY = params.offsetY || 0;

  /**
   * With an arrow, the minimum offset should be the size of the arrow
   */
  if (rects.arrowRect) {
    const arrowPlacement = PopperHero.getArrowPlacement([
      placementX,
      placementY,
    ]);

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
  let popperPosition = PopperHero.getPosition([placementX, placementY], {
    ...rects,
    offsetY,
    offsetX,
  });

  /**
   * Flipping
   * to do: add overflow strategy
   * x / y: flip | scroll | none
   */
  const overflow = PopperHero.getOverflow({
    popperPosition,
    ...rects,
  });

  const [flipPlacementX, flipPlacementY] = PopperHero.flipPlacement(
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
    if (flipX) offsetX = PopperHero.getFlippedOffset(offsetX);
    if (flipY) offsetY = PopperHero.getFlippedOffset(offsetY);
    /**
     * Updates flipped position
     */
    popperPosition = PopperHero.getPosition([placementX, placementY], {
      ...rects,
      offsetX,
      offsetY,
    });
  }

  /** Arrow / Spacer */

  let arrowPosition;
  let spacerPosition;

  if (rects.arrowRect) {
    arrowPosition = PopperHero.getArrowPosition([placementX, placementY], {
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
    spacerPosition = PopperHero.getSpacerPosition([placementX, placementY], {
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
