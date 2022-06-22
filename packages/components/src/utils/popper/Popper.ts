import { attachMemo } from './memo';

export enum Axis {
  X = 'X',
  Y = 'Y',
}

/**
 * Placement
 */
export enum PopperPlacementEnum {
  after = 'after',
  before = 'before',
  center = 'center',
  end = 'end',
  start = 'start',
}

type VirtualElement = HTMLElement;

/**
 * Placement
 * The tuple, to avoid parsing a string many times
 */
export type PopperPlacement = [
  `${PopperPlacementEnum}`,
  `${PopperPlacementEnum}`,
];

/**
 * Popper Middleware
 * @property {string} name
 * @property {Function} middleware
 */
export interface PopperMiddleware {
  name: string;
  middleware: (params: { popper: Popper; middlewareResult: any }) => any;
}

interface PlacementHandlerParams {
  axis: Axis;
  offset?: number;
  originRect: DOMRect;
  popperRect: DOMRect;
}

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

export class Popper {
  /**
   * Popper placement
   */
  readonly placement: PopperPlacement;
  /**
   * Placement setter
   */
  setPlacement(placement: PopperPlacement) {
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
    placement: PopperPlacement;
  }) {
    const { element, origin, placement } = params;

    this.element = element;
    this.origin = origin;
    this.placement = placement;

    attachMemo(this, 'DOMRect', function (this: Popper) {
      // if (!(this instanceof Popper)) return null;
      return [this.offsetX, this.offsetY, ...this.placement];
    });
  }

  /**
   * Popper rect
   *
   * todo: add memoization
   */
  get DOMRect(): DOMRect {
    const popperRect = this.element.getBoundingClientRect();
    const originRect = this.origin.getBoundingClientRect();

    const [placementX, placementY] = this.placement;
    const getOffsetX = Popper.placementUtils[placementX];
    const getOffsetY = Popper.placementUtils[placementY];

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

  /**
   * Modifies popper with provided middlewares
   */
  applyMiddlewares(middlewares: PopperMiddleware[]) {
    const middlewarePayload = {};

    return middlewares.reduce((middlewareResult, schema) => {
      const { name, middleware } = schema;

      const result = middleware({
        popper: this,
        middlewareResult,
      });

      return {
        ...middlewareResult,
        [name]: result || null,
      };
    }, middlewarePayload);
  }

  /**
   * Creates popper
   */
  static create(
    placement: PopperPlacement,
    params: {
      originElement: HTMLElement;
      popperElement: HTMLElement;
    },
  ) {
    return new Popper({
      element: params.popperElement,
      origin: params.originElement,
      placement: placement,
    });
  }

  /**
   * Placement Utils
   */
  static placementUtils = {
    /**
     *
     * End
     *
     */
    end: ({
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
    },
    /**
     *
     * Before
     *
     */
    before: ({ axis, offset = 0, popperRect }: PlacementHandlerParams) => {
      const { from, size } = axisToPropertyMap[axis];

      return {
        [from]: offset - popperRect[size],
      };
    },
    /**
     *
     * Center
     *
     */
    center: ({
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
    },
    /**
     *
     * After
     *
     */
    after: ({ axis, offset = 0, originRect }: PlacementHandlerParams) => {
      const { from, size } = axisToPropertyMap[axis];
      return {
        [from]: originRect[size] + offset,
      };
    },
    /**
     *
     * Start
     *
     */
    start: ({ axis, offset = 0 }: PlacementHandlerParams) => {
      const { from } = axisToPropertyMap[axis];
      return {
        [from]: offset,
      };
    },
  };
}
