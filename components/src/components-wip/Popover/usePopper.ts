import React from 'react';
import { Placement, computePosition } from './placementUtils';
import { isNumber, useMounted } from '@utils/index';
import useControlledState from '@utils/useControlledState';

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
  } = useControlledState({
    controlled: openProp,
    default: !!defaultOpen,
  });

  const handleClickAway = React.useCallback(
    (event: Event) => {
      if (!popperRef?.current?.contains(event.target as Node)) {
        console.log('SET OPEN FALSE');
        setIsOpen(false);
      }

      console.log('AWAY -2');
      onClickAway?.(event);
    },
    [onClickAway, setIsOpen],
  );

  const updatePosition = React.useCallback(() => {
    if (!placement || !popperRef.current || !originElement) return;

    setComputedPosition(
      computePosition(placement, {
        targetElement: popperRef.current,
        referenceElement: originElement,
      }),
    );
  }, [originElement, placement]);

  const resetPosition = React.useCallback(() => {
    setComputedPosition(null);
  }, []);

  React.useEffect(() => {
    if (isOpen) return updatePosition();
    resetPosition();
  }, [isOpen, updatePosition, resetPosition]);

  React.useEffect(() => {
    // Controlled state changes
    setIsOpen(openProp);
  }, [openProp, setIsOpen]);

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
