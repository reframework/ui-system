import React, { CSSProperties, useEffect, useState } from 'react';
import { Portal } from './Portal';
import { getPlacement, viewport } from './placementUtils';
import { Axis, ViewportType, PlacementAxis, Placement } from './types';
import { useMounted } from './hooks';
import {
  addClickListener,
  addResizeListener,
  removeClickListener,
  removeResizeListener,
  stopPropagation,
} from './domUtils';

export function isFunction<T extends Function>(f: unknown): f is T {
  return typeof f === 'function';
}

export interface PopoverProps {
  anchorEl?: HTMLElement | null;
  anchorWidth?: boolean;
  children: React.ReactNode;
  className?: string;
  offsetX?: number;
  offsetY?: number;
  onChange?: (open: boolean) => void;
  onClickAway?: (e: Event) => void;
  onClose?: () => void;
  open: boolean;
  placement?: Placement;
  style?: CSSProperties;
  zIndex?: number;
}

const getPositionHandlers = (placement: Placement) => {
  const [x, y] = placement.split('-') as [PlacementAxis, PlacementAxis];
  return [getPlacement[x], getPlacement[y]];
};

const getStyles = (styles?: CSSProperties) => ({
  ...styles,
  position: 'absolute' as const,
});

const getAnchorWidth = (
  el: HTMLElement | null | undefined,
  shouldApply?: boolean
) => {
  if (!shouldApply || !el) return;

  return {
    width: el.clientWidth,
  } as const;
};

const Popover = ({
  anchorEl,
  children,
  offsetX,
  offsetY,
  onChange,
  onClickAway,
  onClose,
  open: $open,
  placement = 'start-start',
  zIndex,
  style,
  anchorWidth,
}: PopoverProps) => {
  const isMounted = useMounted();
  const [internalOpen, setInternalOpen] = useState<boolean>(false);
  const [styles, setStyles] = useState<CSSProperties>(getStyles(style));
  const [contentRoot, setContentRoot] = useState<HTMLDivElement | null>(null);

  const handleOpen = () => {
    setInternalOpen(true);
  };

  const handleClose = () => {
    setInternalOpen(false);
  };

  const toggle = (isOpen: boolean) => {
    return isOpen ? handleOpen() : handleClose();
  };

  const handleClickAway = (e: Event) => {
    if (!isFunction(onClickAway)) return;
    onClickAway(e);
  };

  const setStyle = () => {
    if (!internalOpen) return;
    if (!contentRoot) return console.error('Unexpected behavior');

    const triggerRect = (anchorEl || viewport).getBoundingClientRect();
    const popoverRect = contentRoot.getBoundingClientRect();
    const [getPositionX, getPositionY] = getPositionHandlers(placement);
    const viewportType = anchorEl ? ViewportType.body : ViewportType.window;

    setStyles({
      ...getStyles(style),
      ...getAnchorWidth(anchorEl, anchorWidth),
      ...getPositionX(Axis.x, viewportType, triggerRect, popoverRect, offsetX),
      ...getPositionY(Axis.y, viewportType, triggerRect, popoverRect, offsetY),
    });
  };

  useEffect(() => {
    if (!internalOpen) return;
    if (!contentRoot) return;
    setStyle();
  }, [internalOpen, contentRoot, placement, anchorEl]);

  useEffect(() => {
    toggle($open);
  }, [$open]);

  useEffect(() => {
    if (!isMounted) return;
    if (isFunction(onChange)) onChange(internalOpen);
    if (!internalOpen && isFunction(onClose)) onClose();
  }, [internalOpen]);

  useEffect(() => {
    if (contentRoot) {
      addClickListener(handleClickAway);
      addResizeListener(setStyle);
    }

    return () => {
      removeClickListener(handleClickAway);
      removeResizeListener(setStyle);
    };
  }, [contentRoot]);

  return (
    <Portal zIndex={zIndex}>
      {internalOpen && (
        <div ref={setContentRoot} style={styles} onClick={stopPropagation}>
          {children}
        </div>
      )}
    </Portal>
  );
};

export default Popover;
