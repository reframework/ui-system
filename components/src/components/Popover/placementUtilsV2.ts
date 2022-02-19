export type PlacementAxis = 'before' | 'end' | 'center' | 'start' | 'after';
export type Placement = `${PlacementAxis}-${PlacementAxis}`;

export enum ViewportType {
  window = 'window',
  body = 'body',
}

export enum Axis {
  x = 'x',
  y = 'y',
}

export type ClientRect = {
  top: number;
  left: number;
  right: number;
  bottom: number;
  width: number;
  height: number;
};

export const viewport = {
  getBoundingClientRect: (): ClientRect => {
    return {
      top: 0,
      left: 0,
      right: window.innerWidth,
      bottom: window.innerHeight,
      width: window.innerWidth,
      height: window.innerHeight,
    };
  },
};

const AxisProperties = {
  [Axis.x]: {
    size: 'width' as const,
    from: 'left' as const,
  },
  [Axis.y]: {
    size: 'height' as const,
    from: 'top' as const,
  },
};

const AxisPropertiesRTL = {
  [Axis.x]: {
    size: 'width' as const,
    from: 'right' as const,
  },
  [Axis.y]: {
    size: 'height' as const,
    from: 'bottom' as const,
  },
};

interface ViewportOffset {
  top: number;
  left: number;
  bottom: number;
  right: number;
}

interface PositioningParams {
  axis: Axis;
  viewportOffset: ViewportOffset;
  triggerRect: ClientRect;
  popoverRect?: ClientRect;
  offset?: number;
}

export class PlacementHero {
  static getPlacement(placement: Placement, params: PositioningParams) {
    const [getX, getY] = PlacementHero.getPlacementHandlers(placement);
    // const { triggerRect, viewportOffset, offset, popoverRect } = params;

    return {
      ...getX({ ...params, axis: Axis.x }),
      ...getY({ ...params, axis: Axis.y }),
    };
    //
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
    elementRect: ClientRect,
    viewportRect: ClientRect
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
  static before({
    axis,
    viewportOffset,
    triggerRect,
    offset = 0,
  }: PositioningParams) {
    const { from, size } = AxisPropertiesRTL[axis];
    return {
      [from]: viewportOffset[from] + triggerRect[size] + offset,
    };
  }

  /**
   *
   */
  static start({ axis, viewportOffset, offset = 0 }: PositioningParams) {
    const { from } = AxisProperties[axis];
    return {
      [from]: viewportOffset[from] + offset,
    };
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
      console.error('No popover ClientRect provided');
      return {};
    }

    const { from, size } = AxisProperties[axis];
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
  static end({ axis, viewportOffset, offset = 0 }: PositioningParams) {
    const { from } = AxisPropertiesRTL[axis];
    return {
      [from]: viewportOffset[from] + offset,
    };
  }

  /**
   *
   */
  static after({
    axis,
    viewportOffset,
    triggerRect,
    offset = 0,
  }: PositioningParams) {
    const { from, size } = AxisProperties[axis];
    return {
      [from]: viewportOffset[from] + triggerRect[size] + offset,
    };
  }
}
