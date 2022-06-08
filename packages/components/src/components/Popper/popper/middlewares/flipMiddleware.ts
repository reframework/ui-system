type PlacementTuple = any;

type Overflow = {
  left: number;
  right: number;
  top: number;
  bottom: number;
};

enum InternalPlacement {
  after = 'after',
  before = 'before',
  center = 'center',
  start = 'start',
  end = 'end',
}

const parsePlacement = (x: string, y: string) => {
  let placementAxis = x;
  const placementAlign = y;

  if (x === 'before') {
    placementAxis = 'left';
  }

  if (x === 'after') {
    placementAxis = 'right';
  }

  if (y === 'before') {
    placementAxis = 'top';
  }

  if (y === 'before') {
    placementAxis = 'bottom';
  }

  return `${placementAxis}-${placementAlign}`;
};

export const flipPlacementUtils = {
  before: (a: number) => {
    return a < 0 ? InternalPlacement.after : InternalPlacement.before;
  },
  start: (_: number, b: number) => {
    return b < 0 ? InternalPlacement.end : InternalPlacement.start;
  },
  center: (a: number, b: number) => {
    const isA = a < 0;
    const isB = b < 0;
    if (isA === isB) return InternalPlacement.center;
    // TODO: prevent overflow
    return isA ? InternalPlacement.after : InternalPlacement.before;
  },
  end: (a: number) => {
    return a < 0 ? InternalPlacement.start : InternalPlacement.end;
  },
  after: (_: number, b: number) => {
    return b < 0 ? InternalPlacement.before : InternalPlacement.after;
  },
};

const flipPlacement = (
  [placementX, placementY]: PlacementTuple,
  { left, right, top, bottom }: Overflow,
) => {
  return [
    flipPlacementUtils[placementX](left, right),
    flipPlacementUtils[placementY](top, bottom),
  ];
};

export const middleware = (
  placement: PlacementTuple,
  params: { overflow: Overflow },
) => {
  const [flipPlacementX, flipPlacementY] = flipPlacement(
    placement,
    params.overflow,
  );

  return parsePlacement(flipPlacementX, flipPlacementY);
};

export const flipMiddleware = {
  flippedPlacement: middleware,
};
