import { Axis, ClientRect, ViewportType } from "./types";

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
    size: "width" as const,
    from: "left" as const,
  },
  [Axis.y]: {
    size: "height" as const,
    from: "top" as const,
  },
};

const ViewportOffset = {
  [ViewportType.window]: (elementRect: ClientRect) => ({
    top: elementRect.top,
    left: elementRect.left,
  }),
  [ViewportType.body]: (elementRect: ClientRect) => {
    const bodyRect = document.body.getBoundingClientRect();
    return {
      top: elementRect.top - bodyRect.top,
      left: elementRect.left - bodyRect.left,
    };
  },
};

function before(
  axis: Axis,
  viewportType: ViewportType,
  triggerRect: ClientRect,
  popoverRect: ClientRect,
  offset = 0
) {
  const { from, size } = AxisProperties[axis];
  return {
    [from]:
      ViewportOffset[viewportType](triggerRect)[from] -
      popoverRect[size] +
      offset,
  };
}

function start(
  axis: Axis,
  viewportType: ViewportType,
  triggerRect: ClientRect,
  _popoverRect: ClientRect,
  offsetX = 0
) {
  const { from } = AxisProperties[axis];
  return {
    [from]: ViewportOffset[viewportType](triggerRect)[from] + offsetX,
  };
}

function center(
  axis: Axis,
  viewportType: ViewportType,
  triggerRect: ClientRect,
  popoverRect: ClientRect,
  offset = 0
) {
  const { from, size } = AxisProperties[axis];
  return {
    [from]:
      ViewportOffset[viewportType](triggerRect)[from] +
      triggerRect[size] / 2 -
      popoverRect[size] / 2 +
      offset,
  };
}

function end(
  axis: Axis,
  viewportType: ViewportType,
  triggerRect: ClientRect,
  popoverRect: ClientRect,
  offset = 0
) {
  const { from, size } = AxisProperties[axis];
  return {
    [from]:
      ViewportOffset[viewportType](triggerRect)[from] +
      triggerRect[size] -
      popoverRect[size] +
      offset,
  };
}

function after(
  axis: Axis,
  viewportType: ViewportType,
  triggerRect: ClientRect,
  _popoverRect: ClientRect,
  offset = 0
) {
  const { from, size } = AxisProperties[axis];
  return {
    [from]:
      ViewportOffset[viewportType](triggerRect)[from] +
      triggerRect[size] +
      offset,
  };
}

export const getPlacement = {
  after,
  before,
  center,
  end,
  start,
};
