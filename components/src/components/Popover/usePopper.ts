import React from 'react';
import { PlacementHero, Placement } from './placementUtils';
import { useMounted } from './hooks';
import { isNumber, useControlledStateV2 } from '../../utils';
import {
  addClickListener,
  addResizeListener,
  removeClickListener,
  removeResizeListener,
} from './domUtils';

const getDefaultStyles = (styles?: React.CSSProperties) => ({
  ...styles,
  position: 'absolute' as const,
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
  watchResizing,
  preventOverflowX,
  preventOverflowY,
}: UsePopperProps) => {
  const isMounted = useMounted();
  /**
   *
   */
  const [styles, setStyles] = React.useState<React.CSSProperties>(
    // change that in favour to animation, opacity
    getDefaultStyles({ visibility: 'hidden' })
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

  const setStyle = React.useCallback(() => {
    console.log('$$ setStyle $$ ');
    if (!isOpen) return;
    if (!placement) return;
    if (!popperRef?.current) {
      return console.error('No popper ref was initialized');
    }

    let triggerRect;
    let offsetParentRect;

    if (true || position === 'absolute') {
      const parent = popperRef.current.offsetParent;
      // TODO: handle parent table elements
      offsetParentRect = (parent || document.body).getBoundingClientRect();
      triggerRect = originElement?.getBoundingClientRect();
    }

    if (!offsetParentRect || !triggerRect) {
      return;
    }

    const targetRect = popperRef.current.getBoundingClientRect();

    console.log(
      '$$ setStyle called with arguments $$ ',
      placement,
      'originElement: ',
      originElement,
      'targetRect: ',
      targetRect,
      'triggerRect: ',
      triggerRect
    );

    const placementStyles = PlacementHero.getPlacement(placement, {
      offsetParentRect,
      offsetX,
      offsetY,
      preventOverflowX: preventOverflowX,
      preventOverflowY: preventOverflowY,
      targetRect,
      triggerRect,
    });

    setStyles({
      ...getDefaultStyles({ visibility: isOpen ? 'visible' : 'hidden' }),
      ...getWidth(triggerRect, matchOriginWidth),
      ...placementStyles,
    });
  }, [isOpen, originElement, placement]);

  React.useEffect(() => {
    if (isOpen) setStyle();
  }, [isOpen, setStyle]);

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

    return () => {
      removeClickListener(handleClickAway);
    };
  }, [handleClickAway]);

  React.useEffect(() => {
    addResizeListener(setStyle);

    return () => {
      removeResizeListener(setStyle);
    };
  }, [setStyle]);

  React.useEffect(() => {
    if (Math.random() < 10000) return;
    console.log('$$ Resize observer is set $$');
    if (!watchResizing) return;
    if (!popperRef.current) return;

    const handleResize = (entries: ResizeObserverEntry[]) => {
      const [{ target }] = entries;
      if (target === popperRef.current || target === originElement) {
        setStyle();
      }
    };

    const observer = new ResizeObserver(handleResize);
    observer.observe(popperRef.current);
    if (originElement) observer.observe(originElement);

    return () => {
      observer.disconnect();
    };
  }, [originElement, setStyle]);

  console.log('$$ usePopper: updated $$');

  return {
    open: isOpen,
    ref: popperRef,
    styles,
  };
};

export default usePopper;
