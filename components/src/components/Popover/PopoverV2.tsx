import React, { CSSProperties, useEffect, useState } from 'react';
import { PlacementHero, Placement } from './placementUtils';
import { useMounted } from './hooks';
import { isFunction, isNumber } from '../../utils';
import { Portal } from '../Portal';
import {
  addClickListener,
  addResizeListener,
  removeClickListener,
  removeResizeListener,
  stopPropagation,
} from './domUtils';
import Merge from '../Trigger/Merge';

export interface PopoverProps {
  originElement?: HTMLElement | null;
  matchOriginWidth?: boolean | number;
  children: React.ReactNode;
  disablePortal?: boolean;
  offsetX?: number;
  offsetY?: number;
  onChange?: (open: boolean) => void;
  onClickAway?: (e: Event) => void;
  onClose?: () => void;
  open: boolean;
  placement?: Placement;
  style?: CSSProperties;
  zIndex?: number;
  role?: string;
  position?: 'fixed' | 'absolute';
  watchResizing?: boolean;
  preventOverflow?: boolean;
}

const getStyles = (styles?: CSSProperties) => ({
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

const PopoverV2 = ({
  children,
  disablePortal,
  matchOriginWidth,
  offsetX,
  offsetY,
  onChange,
  onClickAway,
  onClose,
  open: $open,
  originElement,
  placement = 'start-start',
  position = 'absolute',
  style,
  watchResizing,
  zIndex,
}: PopoverProps) => {
  const isMounted = useMounted();
  const [internalOpen, setInternalOpen] = useState<boolean>(false);
  const [styles, setStyles] = useState<CSSProperties>(getStyles(style));
  const [contentElement, setContentElement] =
    useState<HTMLDivElement | null>(null);

  const handleClickAway = (e: Event) => {
    if (!isFunction(onClickAway)) return;
    onClickAway(e);
  };

  const setStyle = () => {
    if (!internalOpen) return;
    if (!contentElement) return console.error('Unexpected behavior');

    // let viewportType;
    let triggerRect;
    let offsetParentRect;

    if (true || position === 'absolute') {
      const parent = contentElement.offsetParent;
      // TODO: handle parent table elements
      offsetParentRect = (parent || document.body).getBoundingClientRect();
      triggerRect = originElement?.getBoundingClientRect();
    }

    if (!offsetParentRect || !triggerRect) {
      return;
    }

    const targetRect = contentElement.getBoundingClientRect();

    const placementStyles = PlacementHero.getPlacement(placement, {
      offsetParentRect,
      offsetX,
      offsetY,
      targetRect,
      triggerRect,
    });

    setStyles({
      ...getStyles(style),
      ...getWidth(triggerRect, matchOriginWidth),
      ...placementStyles,
    });
  };

  useEffect(() => {
    if (!internalOpen) return;
    if (!contentElement) return;
    setStyle();
  }, [internalOpen, contentElement, placement, originElement]);

  useEffect(() => {
    setInternalOpen($open);
  }, [$open]);

  useEffect(() => {
    if (!isMounted) return;
    if (isFunction(onChange)) onChange(internalOpen);
    if (!internalOpen && isFunction(onClose)) onClose();
  }, [internalOpen]);

  useEffect(() => {
    if (contentElement) {
      addClickListener(handleClickAway);
      addResizeListener(setStyle);
    }

    return () => {
      removeClickListener(handleClickAway);
      removeResizeListener(setStyle);
    };
  }, [contentElement]);

  useEffect(() => {
    if (!watchResizing) return;
    if (!contentElement) return;

    const handleResize = (entries: ResizeObserverEntry[]) => {
      const [{ target }] = entries;
      if (target === contentElement || target === originElement) {
        setStyle();
      }
    };

    const observer = new ResizeObserver(handleResize);
    observer.observe(contentElement);
    if (originElement) observer.observe(originElement);

    return () => {
      observer.disconnect();
    };
  }, [contentElement, originElement]);

  const content = internalOpen ? (
    <Merge onClick={stopPropagation} ref={setContentElement} style={styles}>
      {children}
    </Merge>
  ) : null;

  if (disablePortal) {
    return content;
  }

  return (
    <Portal style={{ zIndex }} id="popover-root">
      {content}
    </Portal>
  );
};

export default PopoverV2;
