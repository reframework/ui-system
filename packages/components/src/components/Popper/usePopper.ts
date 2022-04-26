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
  matchWidth?: boolean | number;
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
      if (popperRef?.current === (event.target as Node)) return;
      if (popperRef?.current?.contains(event.target as Node)) return;
      if (originElement === (event.target as Node)) return;
      if (originElement?.contains(event.target as Node)) return;

      setIsOpen(false);
      onClickAway?.(event);
    },
    [onClickAway, originElement, setIsOpen],
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
      width: getWidth(originElement, matchWidth),
      transform: computedPosition
        ? `translate3d(${computedPosition.left}px, ${computedPosition.top}px, 0px)`
        : 'unset',
    },
  };
};

export default usePopper;
