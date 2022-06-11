import React from 'react';
import { useMounted } from '@utils/index';
import { useControlledState } from '@utils/useControlledState';
import { isNumber } from '@utils/assert';
import useClickOutside from '@components/ClickOutside/useClickOutside';
import { createPopper, Placement } from '@components/Popper/createPopper';

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
  arrow?: boolean;
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
  arrow,
  defaultOpen,
  offsetX,
  offsetY,
  onClickOutside,
  onClose,
  onOpen,
  open,
  originElement,
  placement,
  hoverTrap,
  matchWidth,
}: UsePopperProps) => {
  const isMounted = useMounted();

  const [state, setState] = React.useState<any>(null);

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
    const computedPosition = createPopper({
      arrowElement: arrow ? arrowElement : null,
      hoverTrap,
      offsetX,
      offsetY,
      originElement,
      placement,
      popperElement,
    });

    setState(computedPosition);
  }, [
    arrow,
    arrowElement,
    hoverTrap,
    offsetX,
    offsetY,
    originElement,
    placement,
    popperElement,
  ]);

  const resetPosition = React.useCallback(() => {
    setState(null);
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
      width: getWidth(originElement, matchWidth),
      ...(state ? { style: { ...state?.popperOffset } } : {}),
    },
    arrowProps: {
      ref: setArrowElement,
      placement: state?.arrowPlacement,
      ...(state ? { style: { ...state?.arrowOffset } } : {}),
    },
    spacerProps: {
      ...(state ? { style: { ...state?.spacerOffset } } : {}),
    },
  };
};

export default usePopper;
