import { CSSProperties } from 'react';
import { getPlacement, viewport } from './placementUtils';
import { Axis, ViewportType, PlacementAxis, Placement } from './types';

export interface GetPositioningStyleProps {
  contentEl: HTMLElement;
  offsetX?: number;
  offsetY?: number;
  originEl?: HTMLElement | null;
  originType: 'element' | 'body' | 'window';
  placement?: Placement;
  position?: 'absolute' | 'fixed';
}

const getPositionHandlers = (placement: Placement) => {
  const [x, y] = placement.split('-') as [PlacementAxis, PlacementAxis];
  return [getPlacement[x], getPlacement[y]];
};

const getPositioningStyle = ({
  contentEl,
  originEl,
  offsetX,
  offsetY,
  placement = 'start-start',
  position = 'absolute',
}: // zIndex,
GetPositioningStyleProps) => {
  return () => {
    if (!contentEl) return console.error('Unexpected behavior');

    // get from props
    let triggerRect;
    let viewportType;

    if (position === 'absolute' && originEl) {
      (originEl || viewport).getBoundingClientRect();
      viewportType = ViewportType.body;
    }

    if (position === 'fixed') {
      triggerRect = viewport.getBoundingClientRect();
      viewportType = ViewportType.window;
    }

    if (!viewportType) {
      // TODO: Only if __DEV__
      console.error('No origin element provided');
      return {};
    }

    if (!triggerRect) {
      // TODO: Only if __DEV__
      console.error('No origin element provided');
      return {};
    }

    const popoverRect = contentEl.getBoundingClientRect();
    const [getPositionX, getPositionY] = getPositionHandlers(placement);

    return {
      position,
      ...getPositionX(Axis.x, viewportType, triggerRect, popoverRect, offsetX),
      ...getPositionY(Axis.y, viewportType, triggerRect, popoverRect, offsetY),
    };
  };
};

export default getPositioningStyle;
