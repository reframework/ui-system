import { arrowMiddleware } from '@components/Popper/popper/middlewares/arrowMiddleware';
import { flipMiddleware } from '@components/Popper/popper/middlewares/flipMiddleware';
import { hoverTrapMiddleware } from '@components/Popper/popper/middlewares/hoverTrapMiddleware';
import { overflowMiddleware } from '@components/Popper/popper/middlewares/overflowMiddleware';
import { positionAbsoluteMiddleware } from '@components/Popper/popper/middlewares/positionAbsoluteMiddleware';

import { Popper } from '@components/Popper/popper/Popper';
import {
  PlacementTuple,
  PopperMiddleware,
} from '@components/Popper/popper/types';

/**
 * --
 */
export type PlacementAxis = 'bottom' | 'center' | 'left' | 'right' | 'top';
export type PlacementAlign = 'start' | 'end' | 'center';
export type Placement = `${PlacementAxis}-${PlacementAlign}`;

export const parseInternalPlacement = (placement: string): PlacementTuple => {
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
    // @ts-expect-error ---
    return [InternalPlacementMap[axis], align];
  }

  // Y first
  // @ts-expect-error ---
  return [align, InternalPlacementMap[axis]];
};

export const computeV1 = (
  placement: PlacementTuple,
  params: {
    originElement: HTMLElement;
    popperElement: HTMLElement;
    middlewares: PopperMiddleware[];
  },
) => {
  const { originElement, popperElement, middlewares } = params;

  /**
   * Prepare data
   */
  const popper = new Popper({
    element: popperElement,
    origin: originElement,
    placement: placement,
  });

  const middlewarePayload = {
    popper,
    middlewareResult: {} as any,
  };

  return middlewares.reduce((acc, schema) => {
    const { popper, middlewareResult } = acc;
    const { name, middleware } = schema;

    const result = middleware({
      popper,
      middlewareResult,
    });

    return {
      popper,
      middlewareResult: {
        ...acc.middlewareResult,
        [name]: result || null,
      },
    };
  }, middlewarePayload);
};

export const getPopper = (params: {
  placement: Placement;
  popperElement: HTMLElement;
  originElement: HTMLElement;
  arrowElement: HTMLElement;
  offsetX?: number;
  offsetY?: number;
  spacer?: boolean;
}) => {
  const internalPlacement = parseInternalPlacement(params.placement);

  const result = computeV1(internalPlacement, {
    popperElement: params.popperElement,
    originElement: params.originElement,
    middlewares: [
      overflowMiddleware,
      flipMiddleware,
      ...(params.arrowElement ? [arrowMiddleware(params.arrowElement)] : []),
      ...(params.spacer ? [hoverTrapMiddleware] : []),
      positionAbsoluteMiddleware,
    ],
  });

  const { popper, middlewareResult } = result;

  console.log(result);

  return {
    arrowPlacement: middlewareResult?.arrow?.placement,
    spacerOffset: middlewareResult.spacer,
    popperOffset: popper.DOMRect.left,
    arrowOffset: {
      left: middlewareResult.arrow?.offset?.x,
      top: middlewareResult.arrow?.offset?.y,
    },
  };
};
