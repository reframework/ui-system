import React from 'react';
import { useMounted } from '@utils/index';
import { useControlledState } from '@utils/useControlledState';
import { isNumber } from '@utils/assert';
import useClickOutside from '@components/ClickOutside/useClickOutside';
import { Placement, computePosition } from './placementUtils';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const getWidth = (
  element?: HTMLElement | null,
  matchWidth?: boolean | number,
) => {
  if (isNumber(matchWidth)) {
    return matchWidth;
  }

  if (matchWidth === true && element) {
    return element.clientWidth;
  }
};

export interface UsePopperProps {
  defaultOpen?: boolean;
  originElement?: HTMLElement | null;
  originPosition?: { x: number; y: number };
  matchWidth?: boolean | number;
  offsetX?: number;
  offsetY?: number;
  onClickOutside?: (e: Event) => void;
  onClose?: () => void;
  onOpen?: () => void;
  open?: boolean;
  placement?: Placement;
  // position?: 'fixed' | 'absolute';
  // preventOverflowX?: boolean;
  // preventOverflowY?: boolean;
  // TODO:
  // trapFocus (for modals)
  // disableScrolling
}

const usePopper = ({
  defaultOpen,
  offsetX,
  offsetY,
  onClickOutside,
  onClose,
  onOpen,
  open,
  originElement,
  placement,
  matchWidth,
}: UsePopperProps) => {
  const isMounted = useMounted();

  const [computedPosition, setComputedPosition] =
    React.useState<{ popper: any; arrow: any } | null>(null);

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

  const updatePosition = React.useCallback(() => {
    if (!placement || !popperElement || !originElement) return;
    const pos = computePosition(placement, {
      arrowElement,
      targetElement: popperElement,
      originElement,
      offsetX,
      offsetY,
      spacing: false,
    });

    setComputedPosition(pos);
  }, [originElement, placement, offsetX, offsetY, arrowElement, popperElement]);

  const resetPosition = React.useCallback(() => {
    setComputedPosition(null);
  }, []);

  React.useLayoutEffect(() => {
    if (isOpen) {
      updatePosition();
      return;
    }
    resetPosition();
  }, [isOpen, updatePosition, resetPosition]);

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
        updatePosition();
      }
    };

    const observer = new ResizeObserver(handleResize);
    observer.observe(originElement);

    return () => {
      observer.disconnect();
    };
  }, [originElement, updatePosition, popperElement]);

  return {
    popperProps: {
      open: isOpen,
      ref: setPopperElement,
      ...(computedPosition
        ? {
            style: {
              ...computedPosition?.popperOffset,
            },
          }
        : {}),
    },
    arrowProps: {
      ref: setArrowElement,
      placement: computedPosition?.arrowPlacement,
      ...(computedPosition
        ? {
            style: {
              ...computedPosition?.arrowOffset,
            },
          }
        : {}),
    },
    spacerProps: {},
  };
};

export default usePopper;
