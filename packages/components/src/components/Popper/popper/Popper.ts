import { Axis, PlacementTuple } from '@components/Popper/popper/types';

/**
 *
 */
export const axisToPropertyMap = {
  [Axis.X]: {
    size: 'width',
    from: 'left',
  },
  [Axis.Y]: {
    size: 'height',
    from: 'top',
  },
} as const;

interface PlacementHandlerParams {
  axis: Axis;
  offset?: number;
  originRect: DOMRect;
  popperRect: DOMRect;
}

/**
 *
 * Placement handlers
 *
 */
const end = ({
  axis,
  originRect,
  offset = 0,
  popperRect,
}: PlacementHandlerParams) => {
  const { from, size } = axisToPropertyMap[axis];
  const referenceSize = originRect[size];
  const targetSize = popperRect[size];

  return {
    [from]: referenceSize - targetSize + offset,
  };
};

/**
 *
 */
const before = ({ axis, offset = 0, popperRect }: PlacementHandlerParams) => {
  const { from, size } = axisToPropertyMap[axis];

  return {
    [from]: offset - popperRect[size],
  };
};

/**
 *
 */
const center = ({
  axis,
  originRect,
  popperRect,
  offset = 0,
}: PlacementHandlerParams) => {
  const { from, size } = axisToPropertyMap[axis];
  const targetSize = popperRect[size] / 2;
  const referenceSize = originRect[size] / 2;
  return {
    [from]: referenceSize - targetSize + offset,
  };
};

/**
 *
 */
const after = ({ axis, offset = 0, originRect }: PlacementHandlerParams) => {
  const { from, size } = axisToPropertyMap[axis];
  return {
    [from]: originRect[size] + offset,
  };
};

/**
 *
 */
const start = ({ axis, offset = 0 }: PlacementHandlerParams) => {
  const { from } = axisToPropertyMap[axis];
  return {
    [from]: offset,
  };
};

type VirtualElement = HTMLElement;

const placementUtils = {
  end,
  before,
  after,
  center,
  start,
};

export class Popper {
  /**
   * Popper placement
   */
  readonly placement: PlacementTuple;
  /**
   * Placement setter
   */
  setPlacement(placement: PlacementTuple) {
    //@ts-expect-error ignore readonly
    this.placement = placement;
  }
  /**
   * Popper element
   */
  readonly element: HTMLElement;

  /**
   * Popper element (could be a virtual element)
   */
  readonly origin: HTMLElement | VirtualElement;

  private offsetX = 0;
  private offsetY = 0;

  get offset() {
    return {
      x: this.offsetX,
      y: this.offsetY,
    };
  }

  set offset(params: { x: number; y: number }) {
    this.offsetX = params.x;
    this.offsetY = params.y;
  }

  move(params: { x: number; y: number }) {
    this.offsetX += params.x;
    this.offsetY += params.y;
  }

  constructor(params: {
    element: HTMLElement;
    origin: HTMLElement | VirtualElement;
    placement: PlacementTuple;
  }) {
    const { element, origin, placement } = params;

    this.element = element;
    this.origin = origin;
    this.placement = placement;
  }

  /**
   * Popper rect
   *
   * todo: add memoization
   */

  get DOMRect(): DOMRect {
    const popperRect = this.element.getBoundingClientRect();
    const originRect = this.element.getBoundingClientRect();

    const [placementX, placementY] = this.placement;
    const getOffsetX = placementUtils[placementX];
    const getOffsetY = placementUtils[placementY];

    console.log(placementX, placementY, '!!!');
    const { left: offsetLeft } = getOffsetX({
      axis: Axis.X,
      originRect,
      popperRect,
      offset: this.offsetX,
    });

    const { top: offsetTop } = getOffsetY({
      axis: Axis.Y,
      originRect,
      popperRect,
      offset: this.offsetY,
    });

    return DOMRectReadOnly.fromRect({
      width: popperRect.width,
      height: popperRect.height,
      x: originRect.left + offsetLeft,
      y: originRect.top + offsetTop,
    });
  }
}
