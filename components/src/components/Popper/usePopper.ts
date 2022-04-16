import React from 'react';
import { isNumber, useMounted } from '@utils/index';
import useControlledState from '@utils/useControlledState';
import { Placement, computePosition } from './placementUtils';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const getWidth = (
  referenceRect: DOMRect | null,
  matchOriginWidth?: boolean | number,
) => {
  if (isNumber(matchOriginWidth)) {
    return { width: matchOriginWidth };
  }

  if (matchOriginWidth === true && referenceRect) {
    return { width: referenceRect.width };
  }

  return { width: 'max-content' };
};

export interface UsePopperProps {
  defaultOpen?: boolean;
  originElement?: HTMLElement | null;
  matchOriginWidth?: boolean | number;
  offsetX?: number;
  offsetY?: number;
  onClickAway?: (e: Event) => void;
  onClose?: () => void;
  onOpen?: () => void;
  open: boolean;
  placement?: Placement;
  // position?: 'fixed' | 'absolute';
  // preventOverflowX?: boolean;
  // preventOverflowY?: boolean;
  // TODO:
  // trapFocus (for modals)
  // disableScrolling
}

const usePopper = ({
  // matchOriginWidth,
  defaultOpen,
  offsetX,
  offsetY,
  onClickAway,
  onClose,
  onOpen,
  open,
  originElement,
  placement,
}: UsePopperProps) => {
  const isMounted = useMounted();

  const [computedPosition, setComputedPosition] =
    React.useState<{ top: number; left: number } | null>(null);

  const popperRef = React.useRef<HTMLDivElement | null>(null);

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
      if (popperRef?.current?.contains(event.target as Node)) return;
      setIsOpen(false);
      onClickAway?.(event);
    },
    [onClickAway, setIsOpen],
  );

  const updatePosition = React.useCallback(() => {
    // console.log(popperRef.current, originElement, 'Goes here');
    if (!placement || !popperRef.current || !originElement) return;

    setComputedPosition(
      computePosition(placement, {
        targetElement: popperRef.current,
        referenceElement: originElement,
        offsetX,
        offsetY,
      }),
    );
  }, [originElement, placement, offsetX, offsetY]);

  const resetPosition = React.useCallback(() => {
    setComputedPosition(null);
  }, []);

  React.useEffect(() => {
    if (isOpen) {
      updatePosition();
      return;
    }
    resetPosition();
  }, [isOpen, updatePosition, resetPosition]);

  React.useEffect(() => {
    // TODO: change
    // Controlled state changes
    // setIsOpen(open);
  }, [open, setIsOpen]);

  React.useEffect(() => {
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
    if (!popperRef.current) return;

    const handleResize = (entries: ResizeObserverEntry[]) => {
      const [{ target }] = entries;
      if (target === popperRef.current || target === originElement) {
        // console.log('RESIZE', target);
        // updatePosition();
      }
    };

    const observer = new ResizeObserver(handleResize);
    observer.observe(popperRef.current);
    if (originElement) observer.observe(originElement);

    return () => {
      observer.disconnect();
    };
  }, [originElement, updatePosition]);

  return {
    open: isOpen,
    ref: popperRef,
    styles: {
      inset: '0 auto auto 0',
      opacity: computedPosition ? 1 : 0,
      pointerEvents: computedPosition ? 'unset' : 'none',
      position: 'absolute',
      transform: computedPosition
        ? `translate3d(${computedPosition.left}px, ${computedPosition.top}px, 0px)`
        : 'unset',
    },
  };
};

export default usePopper;
