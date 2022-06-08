export type PlacementAxis = 'top' | 'bottom' | 'left' | 'right' | 'center';
export type PlacementAlign = 'end' | 'center' | 'start';
export type Placement = `${PlacementAxis}-${PlacementAlign}`;

type InternalPlacement = 'end' | 'center' | 'start' | 'before' | 'after';
export type InternalPlacementTuple = [InternalPlacement, InternalPlacement];

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

export const parseInternalPlacement = (
  placement: Placement,
): InternalPlacementTuple => {
  const [axis, align] = placement.split('-') as [PlacementAxis, PlacementAlign];

  // X first
  if (axis === 'left' || axis === 'right' || axis === 'center') {
    return [InternalPlacementMap[axis], align];
  }

  // Y first
  return [align, InternalPlacementMap[axis]];
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

interface PlacementHandlerParams
  extends Pick<Rects, 'popperRect' | 'originRect'> {
  axis: Axis;
  offset?: number;
  // parentOffset: OffsetBoundaries;
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
  const { from, size } = AxisToPropertyMap[axis];
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
  const { from, size } = AxisToPropertyMap[axis];

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
  const { from, size } = AxisToPropertyMap[axis];
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
  const { from, size } = AxisToPropertyMap[axis];
  return {
    [from]: originRect[size] + offset,
  };
};

/**
 *
 */
const start = ({ axis, offset = 0 }: PlacementHandlerParams) => {
  const { from } = AxisToPropertyMap[axis];
  return {
    [from]: offset,
  };
};

export const placementUtils = {
  start,
  end,
  after,
  before,
  center,
};
