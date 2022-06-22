import React, { useCallback } from 'react';
import { useMounted } from '@utils/index';
import { useControlledState } from '@utils/useControlledState';
import { isNumber } from '@utils/assert';
import useClickOutside from '@components/ClickOutside/useClickOutside';
import {
  parseInternalPlacement,
  Placement,
} from '@components/Popper/createPopper';
import { Popper } from '@utils/popper';
import { offsetMiddleware } from '@utils/popper/middlewares/offsetMiddleware';
import { overflowMiddleware } from '@utils/popper/middlewares/overflowMiddleware';
import { flipMiddleware } from '@utils/popper/middlewares/flipMiddleware';
import { arrowMiddleware } from '@utils/popper/middlewares/arrowMiddleware';
import { hoverTrapMiddleware } from '@utils/popper/middlewares/hoverTrapMiddleware';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const getWidth = (
  originElement?: HTMLElement | null,
  matchWidth?: boolean | number,
) => {
  if (isNumber(matchWidth)) {
    return matchWidth;
  }

  if (matchWidth === true && originElement) {
    return originElement.clientWidth;
  }
};

export interface UsePopperProps {
  defaultOpen?: boolean;
  matchWidth?: boolean | number;
  offsetX?: number;
  offsetY?: number;
  onClickOutside?: (e: Event) => void;
  onClose?: () => void;
  onOpen?: () => void;
  open?: boolean;
  originElement?: HTMLElement | null;
  originPosition?: { x: number; y: number };
  placement?: Placement;
  hoverTrap?: boolean;
  // position?: 'fixed' | 'absolute';
  // preventOverflowX?: boolean;
  // preventOverflowY?: boolean;
  // TODO:
  // trapFocus (for modals)
  // disableScrolling
}

const usePopper = ({
  // Tooltip
  hoverTrap,
  //
  // Offset
  offsetX,
  offsetY,
  // Open state
  onClose,
  onOpen,
  defaultOpen,
  open,
  // Origin
  originElement,
  placement,
  matchWidth,
  // Click outside listener
  onClickOutside,
}: UsePopperProps) => {
  const isMounted = useMounted();

  const [state, setState] = React.useState<{ popper: Popper | null }>({
    popper: null,
  });

  const [popperElement, setPopperElement] =
    React.useState<HTMLDivElement | null>(null);

  const [arrowElement, setArrowElement] =
    React.useState<HTMLElement | null>(null);

  const {
    state: isOpen,
    setState: setIsOpen,
    isControlled: isOpenControlled,
  } = useControlledState({
    controlled: open,
    default: !!defaultOpen,
  });

  const handleClickOutside = React.useCallback(
    (event: Event) => {
      setIsOpen(false);
      onClickOutside?.(event);
    },
    [onClickOutside, setIsOpen],
  );

  useClickOutside({
    onClickOutside: handleClickOutside,
    elements: [popperElement, originElement || null],
  });

  const update = useCallback(
    (prevState: { popper: Popper | null }) => {
      let { popper } = prevState;

      if (!placement || !originElement || !popperElement) {
        // to do: or prev popper
        return { popper: null };
      }

      if (!prevState.popper) {
        const popperPlacement = parseInternalPlacement(placement);
        popper = Popper.create(popperPlacement, {
          popperElement,
          originElement,
        });
      }

      popper?.applyMiddlewares([
        // todo add arrow offset
        offsetMiddleware({
          x: offsetX,
          y: offsetY,
        }),
        overflowMiddleware,
        flipMiddleware,
        ...(arrowElement ? [arrowMiddleware(arrowElement)] : []),
        ...(hoverTrap ? [hoverTrapMiddleware] : []),
        // positionAbsoluteMiddleware,
      ]);

      return { popper };
    },
    [
      arrowElement,
      hoverTrap,
      offsetX,
      offsetY,
      originElement,
      placement,
      popperElement,
    ],
  );

  React.useLayoutEffect(() => {
    if (!isOpen) {
      // to do: lazy
      setState({ popper: null });
    }

    setState(update);
  }, [isOpen, update]);

  React.useLayoutEffect(() => {
    if (!isMounted) return;
    if (isOpenControlled) return;
    (isOpen ? onOpen : onClose)?.();
  }, [isOpen, onOpen, onClose, isMounted, isOpenControlled]);

  React.useEffect(() => {
    if (!popperElement) return;
    if (!(originElement instanceof HTMLElement)) return;

    const handleResize = (entries: ResizeObserverEntry[]) => {
      const [{ target }] = entries;
      if (target === popperElement || target === originElement) {
        setState(update);
      }
    };

    const observer = new ResizeObserver(handleResize);
    observer.observe(originElement);

    return () => {
      observer.disconnect();
    };
  }, [originElement, update, popperElement]);

  return {
    popperProps: {
      open: isOpen,
      ref: setPopperElement,
      width: getWidth(originElement, matchWidth),
      ...(state.popper
        ? {
            style: {
              left: state.popper.DOMRect.left,
              top: state.popper.DOMRect.top,
            },
          }
        : {}),
    },
    arrowProps: {
      ref: setArrowElement,
      // placement: state?.arrowPlacement,
      // ...(state.popper ? { style: { ...state?.arrowOffset } } : {}),
    },
    hoverTrapProps: {
      // ...(state.popper ? { style: { ...state?.hoverTrapOffset } } : {}),
    },
  };
};

export default usePopper;
