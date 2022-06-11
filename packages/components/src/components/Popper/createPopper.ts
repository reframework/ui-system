import { arrowMiddleware } from '@utils/popper/middlewares/arrowMiddleware';
import { flipMiddleware } from '@utils/popper/middlewares/flipMiddleware';
import { hoverTrapMiddleware } from '@utils/popper/middlewares/hoverTrapMiddleware';
import { offsetMiddleware } from '@utils/popper/middlewares/offsetMiddleware';
import { overflowMiddleware } from '@utils/popper/middlewares/overflowMiddleware';
import { positionAbsoluteMiddleware } from '@utils/popper/middlewares/positionAbsoluteMiddleware';
import { Popper, PopperPlacement } from '@utils/popper/Popper';

/**
 * --
 */
export type PlacementAxis = 'bottom' | 'center' | 'left' | 'right' | 'top';
export type PlacementAlign = 'start' | 'end' | 'center';
export type Placement = `${PlacementAxis}-${PlacementAlign}`;

export const parseInternalPlacement = (placement: string): PopperPlacement => {
  const InternalPlacementMap = {
    top: 'before',
    bottom: 'after',
    left: 'before',
    right: 'after',
    center: 'center',
  } as const;

  const [axis, align] = placement.split('-') as [PlacementAxis, PlacementAlign];

  // X first
  if (axis === 'left' || axis === 'right' || axis === 'center') {
    return [InternalPlacementMap[axis], align];
  }

  // Y first
  return [align, InternalPlacementMap[axis]];
};

export const createPopper = (params: {
  placement: Placement;
  popperElement: HTMLElement;
  originElement: HTMLElement;
  arrowElement?: HTMLElement | null;
  offsetX?: number;
  offsetY?: number;
  hoverTrap?: boolean;
}) => {
  const internalPlacement = parseInternalPlacement(params.placement);
  const { popper, middlewareResult } = Popper.create(internalPlacement, {
    popperElement: params.popperElement,
    originElement: params.originElement,
    middlewares: [
      offsetMiddleware({
        x: params.offsetX,
        y: params.offsetY,
      }),
      overflowMiddleware,
      flipMiddleware,
      ...(params.arrowElement ? [arrowMiddleware(params.arrowElement)] : []),
      ...(params.hoverTrap ? [hoverTrapMiddleware] : []),
      // positionAbsoluteMiddleware,
    ],
  });

  return {
    arrowPlacement: middlewareResult?.arrow?.placement,
    hoverTrapOffset: {
      top: middlewareResult.hoverTrap?.top,
      left: middlewareResult.hoverTrap?.left,
      height: middlewareResult.hoverTrap?.height,
      width: middlewareResult.hoverTrap?.width,
    },
    popperOffset: {
      left: popper.DOMRect.left,
      top: popper.DOMRect.top,
    },
    arrowOffset: {
      left: middlewareResult.arrow?.left,
      top: middlewareResult.arrow?.top,
    },
  };
};
