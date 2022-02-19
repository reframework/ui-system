export type PlacementAxis = 'before' | 'end' | 'center' | 'start' | 'after';
export type Placement = `${PlacementAxis}-${PlacementAxis}`;

enum Axis {
  X = 'X',
  Y = 'Y',
}

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
      toJSON: () => '',
    };
  },
};

const PlacementProperties = {
  width: 'width',
  height: 'height',
  left: 'left',
  right: 'right',
  top: 'top',
  bottom: 'bottom',
} as const;

interface ViewportOffset {
  top: number;
  left: number;
  bottom: number;
  right: number;
}

interface GetPlacementParams {
  viewportOffset: ViewportOffset;
  triggerRect: DOMRect;
  popoverRect?: DOMRect;
  offsetX?: number;
  offsetY?: number;
}

interface PositioningParams
  extends Omit<GetPlacementParams, 'offsetX' | 'offsetY'> {
  axis: Axis;
  isBackward?: boolean;
  offset?: number;
}

export class PlacementHero {
  static getProperties(axis: Axis, isBackward?: boolean) {
    if (axis === Axis.X) {
      return {
        from: isBackward ? PlacementProperties.right : PlacementProperties.left,
        size: PlacementProperties.width,
      };
    }

    return {
      from: isBackward ? PlacementProperties.bottom : PlacementProperties.top,
      size: PlacementProperties.height,
    };
  }

  static getPlacement(placement: Placement, params: GetPlacementParams) {
    const [getX, getY] = PlacementHero.getPlacementHandlers(placement);

    return {
      ...getX({ ...params, axis: Axis.X }),
      ...getY({ ...params, axis: Axis.Y }),
    };
  }
  /**
   *
   */
  static getPlacementHandlers = (placement: Placement) => {
    const [x, y] = placement.split('-') as [PlacementAxis, PlacementAxis];
    return [PlacementHero[x], PlacementHero[y]];
  };

  /**
   *
   */
  static getViewportOffset = (
    elementRect: DOMRect,
    viewportRect: DOMRect
  ): ViewportOffset => {
    return {
      top: elementRect.top - viewportRect.top,
      left: elementRect.left - viewportRect.left,
      bottom: viewportRect.bottom - elementRect.bottom,
      right: viewportRect.right - elementRect.right,
    };
  };

  /**
   *
   */
  static start(params: PositioningParams) {
    return PlacementHero.end({ ...params, isBackward: true });
  }

  /**
   *
   */
  static before(params: PositioningParams) {
    return PlacementHero.after({ ...params, isBackward: true });
  }

  /**
   *
   */
  static center({
    axis,
    viewportOffset,
    popoverRect,
    triggerRect,
    offset = 0,
  }: PositioningParams) {
    if (!popoverRect) {
      console.error('No popover DOMRect provided');
      return {};
    }

    const { from, size } = PlacementHero.getProperties(axis);

    return {
      [from]:
        viewportOffset[from] +
        triggerRect[size] / 2 -
        popoverRect[size] / 2 +
        offset,
    };
  }

  /**
   *
   */
  static after({
    axis,
    isBackward,
    offset = 0,
    triggerRect,
    viewportOffset,
  }: PositioningParams) {
    const { from, size } = PlacementHero.getProperties(axis, isBackward);
    return {
      [from]: viewportOffset[from] + triggerRect[size] + offset,
    };
  }

  /**
   *
   */
  static end({
    axis,
    isBackward,
    offset = 0,
    viewportOffset,
  }: PositioningParams) {
    const { from } = PlacementHero.getProperties(axis, isBackward);
    return {
      [from]: viewportOffset[from] + offset,
    };
  }
}
