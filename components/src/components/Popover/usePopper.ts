import React, { useCallback } from 'react';
import { Placement, computePosition } from './placementUtilsV2';

import { useListener, useMounted } from './hooks';
import { isNumber, useControlledStateV2 } from '../../utils';

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
  // offsetX?: number;
  // offsetY?: number;
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
  // matchOriginWidth,
  onClickAway,
  onOpen,
  onClose,
  open: openProp,
  originElement,
  placement,
}: UsePopperProps) => {
  const isMounted = useMounted();

  const [computedPosition, setComputedPosition] =
    React.useState<React.CSSProperties | null>(null);

  const popperRef = React.useRef<HTMLDivElement | null>(null);

  const {
    state: isOpen,
    setState: setIsOpen,
    isControlled: isOpenControlled,
  } = useControlledStateV2<boolean>({
    controlled: openProp,
    default: !!defaultOpen,
  });

  const handleClickAway = (event: Event) => {
    if (!popperRef?.current?.contains(event.target as Node)) {
      setIsOpen(false);
    }

    onClickAway?.(event);
  };

  const updatePosition = React.useCallback(() => {
    if (!placement || !popperRef.current || !originElement) return;

    setComputedPosition(
      computePosition(placement, {
        targetElement: popperRef.current,
        referenceElement: originElement,
      }),
    );
  }, [originElement, placement]);

  const resetPosition = useCallback(() => {
    setComputedPosition(null);
  }, []);

  React.useEffect(() => {
    if (isOpen) return updatePosition();
    resetPosition();
  }, [isOpen, updatePosition, resetPosition]);

  React.useEffect(() => {
    // Controlled state changes
    setIsOpen(openProp);
  }, [openProp]);

  React.useEffect(() => {
    if (!isMounted) return;
    if (isOpenControlled) return;
    (isOpen ? onOpen : onClose)?.();
  }, [isOpen, onOpen, onClose, isMounted, isOpenControlled]);

  useListener({ event: 'click', listener: handleClickAway }, [
    handleClickAway,
    updatePosition,
  ]);

  useListener({ event: 'resize', listener: handleClickAway }, [
    handleClickAway,
    updatePosition,
  ]);

  React.useEffect(() => {
    if (!popperRef.current) return;

    const handleResize = (entries: ResizeObserverEntry[]) => {
      const [{ target }] = entries;
      if (target === popperRef.current || target === originElement) {
        updatePosition();
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
      position: 'absolute',
      inset: '0 auto auto 0',
      // opacity: Number(computedPosition),
      ...computedPosition,
    },
  };
};

export default usePopper;
