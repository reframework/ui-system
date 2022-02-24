import { CSSProperties } from 'react';

export type PlacementAxis = 'top' | 'bottom' | 'left' | 'right';
export type PlacementAlign = 'end' | 'center' | 'start';

export type Placement = `${PlacementAxis}-${PlacementAlign}`;
type InternalPlacement = 'end' | 'center' | 'start' | 'before' | 'after';
type BoundarySide = 'top' | 'left' | 'right' | 'bottom';

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
} as const;

type OverflowValues = [number, number];

type InternalPlacementTuple = [InternalPlacement, InternalPlacement];
type AxisOverflow = Record<Axis, OverflowValues>;

const parsePlacement = (
  placement: Placement
): [InternalPlacement, InternalPlacement] => {
  const [axis, align] = placement.split('-') as [PlacementAxis, PlacementAlign];

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

interface Rects {
  targetRect: DOMRect;
  referenceRect: DOMRect;
  viewportRect: DOMRect;
  offsetParentRect: DOMRect;
}

interface GetComputedPositionParams extends Rects {
  offsetX?: number;
  offsetY?: number;
}

interface GetOverflowParams extends Rects {
  computedPosition: Record<'left' | 'top', number>;
}

interface PlacementHandlerParams
  extends Pick<Rects, 'targetRect' | 'referenceRect'> {
  axis: Axis;
  offset?: number;
  parentOffset: OffsetBoundaries;
}

export class PlacementHero {
  static getComputedPosition = (
    placement: InternalPlacementTuple,
    params: GetComputedPositionParams
  ) => {
    const {
      offsetParentRect,
      targetRect,
      referenceRect,
      offsetX = 0,
      offsetY = 0,
    } = params;

    const [placementX, placementY] = placement;

    const {
      getParentOffset,
      [placementX]: computePlacementX,
      [placementY]: computePlacementY,
    } = PlacementHero;

    /**
     * First relative parent offset
     */
    const parentOffset = getParentOffset(referenceRect, offsetParentRect);

    let computedPlacementX = computePlacementX({
      axis: Axis.X,
      offset: offsetX,
      parentOffset,
      referenceRect,
      targetRect,
    });

    let computedPlacementY = computePlacementY({
      axis: Axis.Y,
      offset: offsetY,
      parentOffset,
      referenceRect,
      targetRect,
    });

    return {
      ...computedPlacementX,
      ...computedPlacementY,
    };
  };

  /**
   *
   *
   */
  static isAnywayOverflowing = (viewportRect: DOMRect, targetRect: DOMRect) => {
    return {
      x: viewportRect.width < targetRect.width * 2,
      y: viewportRect.height < targetRect.height * 2,
    };
  };

  /**
   *
   *
   */
  static getOverflow = (params: GetOverflowParams): AxisOverflow => {
    const { computedPosition, offsetParentRect, targetRect, viewportRect } =
      params;

    const sumX = offsetParentRect.left + computedPosition.left!;
    const sumY = offsetParentRect.top + computedPosition.top!;

    return {
      // [left, right]
      [Axis.X]: [sumX, viewportRect.width - (sumX + targetRect.width)],
      // [top, bottom]
      [Axis.Y]: [sumY, viewportRect.height - (sumY + targetRect.height)],
    };
  };

  /**
   *
   *
   */
  static getParentOffset = (
    originRect: DOMRect,
    parentOffsetRect: DOMRect
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
  static end({
    axis,
    parentOffset,
    referenceRect,
    offset = 0,
    targetRect,
  }: PlacementHandlerParams) {
    const { from, size } = AxisToPropertyMap[axis];
    const referenceSize = referenceRect[size];
    const targetSize = targetRect[size];
    return {
      [from]: parentOffset[from] + referenceSize - targetSize + offset,
    };
  }

  /**
   *
   */
  static before({
    axis,
    parentOffset,
    offset = 0,
    targetRect,
  }: PlacementHandlerParams) {
    const { from, size } = AxisToPropertyMap[axis];

    return {
      [from]: parentOffset[from] + offset - targetRect[size],
    };
  }

  /**
   *
   */
  static center({
    axis,
    parentOffset,
    referenceRect,
    targetRect,
    offset = 0,
  }: PlacementHandlerParams) {
    const { from, size } = AxisToPropertyMap[axis];
    const targetSize = targetRect[size] / 2;
    const referenceSize = referenceRect[size] / 2;
    return {
      [from]: parentOffset[from] + referenceSize - targetSize + offset,
    };
  }

  /**
   *
   */
  static after({
    axis,
    offset = 0,
    referenceRect,
    parentOffset,
  }: PlacementHandlerParams) {
    const { from, size } = AxisToPropertyMap[axis];
    return {
      [from]: parentOffset[from] + referenceRect[size] + offset,
    };
  }

  /**
   *
   */
  static start({ axis, offset = 0, parentOffset }: PlacementHandlerParams) {
    const { from } = AxisToPropertyMap[axis];
    return {
      [from]: parentOffset[from] + offset,
    };
  }

  static flipPlacement(
    [placementX, placementY]: InternalPlacementTuple,
    overflow: AxisOverflow
  ) {
    return [
      flipPlacement[placementX](overflow.X),
      flipPlacement[placementY](overflow.Y),
    ];
  }

  // REFLOW
  static getRects = (
    targetElement: HTMLElement,
    referenceElement: HTMLElement
  ): Rects => {
    const { offsetParent } = targetElement;
    const offsetParentRect = (
      offsetParent || document.body
    ).getBoundingClientRect();
    const referenceRect = referenceElement.getBoundingClientRect();
    const targetRect = targetElement.getBoundingClientRect();
    const viewportRect = viewport.getBoundingDOMRect();

    return {
      offsetParentRect,
      targetRect,
      referenceRect,
      viewportRect,
    };
  };
}

export function computePosition(
  placement: Placement,
  params: {
    targetElement: HTMLElement;
    referenceElement: HTMLElement;
    //
    preventOverflowX?: boolean;
    preventOverflowY?: boolean;
  }
) {
  const { targetElement, referenceElement } = params;

  const [placementX, placementY] = parsePlacement(placement);

  // get rects in the raf
  const rects = PlacementHero.getRects(targetElement, referenceElement);

  let computedPosition = PlacementHero.getComputedPosition(
    [placementX, placementY],
    rects
  );

  const overflow = PlacementHero.getOverflow({
    // @ts-expect-error
    computedPosition,
    ...rects,
  });

  const [flipPlacementX, flipPlacementY] = PlacementHero.flipPlacement(
    [placementX, placementY],
    overflow
  );

  // TODO: Split by axis
  if (placementX !== flipPlacementX || placementY !== flipPlacementY) {
    computedPosition = PlacementHero.getComputedPosition(
      [flipPlacementX, flipPlacementY],
      rects
    );
  }

  return {
    inset: '0 auto auto 0',
    transform: `translate3d(${computedPosition.left}px, ${computedPosition.top}px, 0px)`,
  };
}
