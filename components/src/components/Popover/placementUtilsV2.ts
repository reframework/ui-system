import { Axis, ClientRect } from './types';

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

const ViewportOffsetV2 = (
  elementRect: ClientRect,
  viewportRect: ClientRect
) => {
  return {
    top: elementRect.top - viewportRect.top,
    left: elementRect.left - viewportRect.left,
  };
};

function before(
  axis: Axis,
  viewportRect: ClientRect,
  triggerRect: ClientRect,
  popoverRect: ClientRect,
  offset = 0
) {
  const { from, size } = AxisProperties[axis];
  return {
    [from]:
      ViewportOffsetV2(triggerRect, viewportRect)[from] -
      popoverRect[size] +
      offset,
  };
}

function start(
  axis: Axis,
  viewportRect: ClientRect,
  triggerRect: ClientRect,
  _popoverRect: ClientRect,
  offsetX = 0
) {
  const { from } = AxisProperties[axis];
  return {
    [from]: ViewportOffsetV2(triggerRect, viewportRect)[from] + offsetX,
  };
}

function center(
  axis: Axis,
  viewportRect: ClientRect,
  triggerRect: ClientRect,
  popoverRect: ClientRect,
  offset = 0
) {
  const { from, size } = AxisProperties[axis];
  return {
    [from]:
      ViewportOffsetV2(triggerRect, viewportRect)[from] +
      triggerRect[size] / 2 -
      popoverRect[size] / 2 +
      offset,
  };
}

function end(
  axis: Axis,
  viewportRect: ClientRect,
  triggerRect: ClientRect,
  popoverRect: ClientRect,
  offset = 0
) {
  const { from, size } = AxisProperties[axis];
  return {
    [from]:
      ViewportOffsetV2(triggerRect, viewportRect)[from] +
      triggerRect[size] -
      popoverRect[size] +
      offset,
  };
}

function after(
  axis: Axis,
  viewportRect: ClientRect,
  triggerRect: ClientRect,
  _popoverRect: ClientRect,
  offset = 0
) {
  const { from, size } = AxisProperties[axis];
  return {
    [from]:
      ViewportOffsetV2(triggerRect, viewportRect)[from] +
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
