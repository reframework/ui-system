import React, { useLayoutEffect } from 'react';
import { Placement, computePosition } from './placementUtilsV2';

import { useMounted } from './hooks';
import { isNumber, useControlledStateV2 } from '../../utils';
import {
  addClickListener,
  addResizeListener,
  addScrollListener,
  removeClickListener,
  removeResizeListener,
  removeScrollListener,
} from './domUtils';

const getDefaultStyles = (
  styles?: React.CSSProperties
): React.CSSProperties => ({
  position: 'absolute' as const,
  opacity: 0,
  ...styles,
});

const getWidth = (
  originRect: DOMRect | null,
  matchOriginWidth?: boolean | number
) => {
  if (isNumber(matchOriginWidth)) {
    return { width: matchOriginWidth };
  }

  if (matchOriginWidth === true && originRect) {
    return { width: originRect.width };
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
  position?: 'fixed' | 'absolute';
  watchResizing?: boolean;
  watchScrolling?: boolean;
  preventOverflowX?: boolean;
  preventOverflowY?: boolean;
  // TODO:
  // trapFocus (for modals)
  // disableScrolling
}

const usePopper = ({
  defaultOpen,
  matchOriginWidth,
  offsetX,
  offsetY,
  onClickAway,
  onOpen,
  onClose,
  open: $$open,
  originElement,
  placement,
  position = 'absolute',
  watchResizing = true,
  watchScrolling = true,
  preventOverflowX,
  preventOverflowY,
}: UsePopperProps) => {
  const isMounted = useMounted();
  /**
   *
   */
  const [computedStyles, setComputedStyles] =
    React.useState<React.CSSProperties>(
      // change that in favour to animation, opacity
      getDefaultStyles()
    );
  /**
   *
   */
  const popperRef = React.useRef<HTMLDivElement | null>(null);

  /**
   *
   */
  const {
    state: isOpen,
    setState: setIsOpen,
    isControlled: isOpenControlled,
  } = useControlledStateV2<boolean>({
    controlled: $$open,
    default: !!defaultOpen,
  });

  const handleClickAway = (event: Event) => {
    if (!popperRef?.current?.contains(event.target as Node)) {
      setIsOpen(false);
    }

    onClickAway?.(event);
  };

  const setupRef = React.useCallback(
    (node) => {
      popperRef.current = node;
    },
    [placement, originElement]
  );

  const setStyles = React.useCallback(() => {
    if (!placement || !popperRef.current || !originElement) return;

    const styles = computePosition(placement, {
      // offsetX,
      // offsetY,
      // preventOverflowX: preventOverflowX,
      // preventOverflowY: preventOverflowY,
      targetElement: popperRef.current,
      referenceElement: originElement,
    });

    setComputedStyles({ ...getDefaultStyles({ opacity: 1 }), ...styles });
  }, [originElement, placement]);

  React.useEffect(() => {
    if (!isMounted) return;
    setStyles();
  }, [setStyles, isMounted]);

  React.useEffect(() => {
    // Controlled state changes
    setIsOpen($$open);
  }, [$$open]);

  React.useEffect(() => {
    if (!isMounted) return;
    if (isOpenControlled) return;
    (isOpen ? onOpen : onClose)?.();
  }, [isOpen, onOpen, onClose]);

  React.useEffect(() => {
    addClickListener(handleClickAway);
    addScrollListener(setStyles);
    return () => {
      removeClickListener(handleClickAway);
      removeScrollListener(setStyles);
    };
  }, [handleClickAway, setStyles]);

  React.useEffect(() => {
    addResizeListener(setStyles);
    return () => {
      removeResizeListener(setStyles);
    };
  }, [setStyles]);

  React.useEffect(() => {
    if (!watchResizing) return;
    if (!popperRef.current) return;

    const handleResize = (entries: ResizeObserverEntry[]) => {
      const [{ target }] = entries;
      if (target === popperRef.current || target === originElement) {
        setStyles();
      }
    };

    const observer = new ResizeObserver(handleResize);
    observer.observe(popperRef.current);
    if (originElement) observer.observe(originElement);

    return () => {
      observer.disconnect();
    };
  }, [originElement, setStyles]);

  React.useEffect(() => {
    if (!watchScrolling) return;
    if (!popperRef.current) return;

    // todo: if isFlipped -> return

    const handleOverflow = ([entry]: IntersectionObserverEntry[]) => {
      if (entry.intersectionRatio < 1) {
        setStyles();
      }
    };

    const observer = new IntersectionObserver(handleOverflow, {
      root: null,
      threshold: 1,
    });

    observer.observe(popperRef.current);

    return () => {
      observer.disconnect();
    };
  }, [setStyles]);

  console.log('$$ usePopper: updated $$');

  return {
    open: isOpen,
    ref: setupRef,
    styles: computedStyles,
  };
};

export default usePopper;
