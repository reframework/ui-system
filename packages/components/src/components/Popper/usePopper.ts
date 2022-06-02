import React from 'react';
import { useMounted } from '@utils/index';
import { useControlledState } from '@utils/useControlledState';
import { isNumber } from '@utils/assert';
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
  onClickAway?: (e: Event) => void;
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
  onClickAway,
  onClose,
  onOpen,
  open,
  originElement,
  placement,
  matchWidth,
}: UsePopperProps) => {
  const isMounted = useMounted();

  const [computedPosition, setComputedPosition] =
    React.useState<{ top: number; left: number } | null>(null);

  const [popperElement, setPopperElement] =
    React.useState<HTMLDivElement | null>(null);

  const {
    state: isOpen,
    setState: setIsOpen,
    isControlled: isOpenControlled,
  } = useControlledState({
    controlled: open,
    default: !!defaultOpen,
  });

  const handleClickAway = React.useCallback(
    (event: Event) => {
      if (popperElement === (event.target as Node)) return;
      if (popperElement?.contains?.(event.target as Node)) return;
      if (originElement === (event.target as Node)) return;
      if (originElement?.contains?.(event.target as Node)) return;

      setIsOpen(false);
      onClickAway?.(event);
    },
    [onClickAway, originElement, setIsOpen, popperElement],
  );

  const updatePosition = React.useCallback(() => {
    // console.log(popperElement, originElement, 'Goes here');
    if (!placement || !popperElement || !originElement) return;

    setComputedPosition(
      computePosition(placement, {
        targetElement: popperElement,
        originElement,
        offsetX,
        offsetY,
      }),
    );
  }, [originElement, placement, offsetX, offsetY, popperElement]);

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
    if (!isOpen) return;
    window.addEventListener('click', handleClickAway);

    return () => {
      window.removeEventListener('click', handleClickAway);
    };
  }, [handleClickAway, isOpen]);

  React.useEffect(() => {
    if (!popperElement) return;

    if (!(originElement instanceof HTMLElement)) return;
    const handleResize = (entries: ResizeObserverEntry[]) => {
      const [{ target }] = entries;
      if (target === popperElement || target === originElement) {
        // console.log('RESIZE', target);
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
    open: isOpen,
    ref: setPopperElement,
    arrowStyles: {},
    styles: {
      inset: '0 auto auto 0',
      opacity: computedPosition ? 1 : 0,
      // todo: only none or nothing
      pointerEvents: computedPosition ? 'inherit' : 'none',
      position: 'absolute',
      width: getWidth(originElement, matchWidth),
      transform: computedPosition
        ? `translate3d(${computedPosition.left}px, ${computedPosition.top}px, 0px)`
        : 'unset',
    },
  };
};

export default usePopper;
