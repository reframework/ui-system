import React, { CSSProperties, useEffect, useState } from 'react';
import { getPlacement } from './placementUtilsV2';
import { Axis, PlacementAxis, Placement } from './types';
import { useMounted } from './hooks';
import { isFunction } from '../../utils';
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
}

const getPositionHandlers = (placement: Placement) => {
  const [x, y] = placement.split('-') as [PlacementAxis, PlacementAxis];
  return [getPlacement[x], getPlacement[y]];
};

const getStyles = (styles?: CSSProperties) => ({
  ...styles,
  position: 'absolute' as const,
});

const getOriginWidth = (
  el: HTMLElement | null | undefined,
  matchOriginWidth?: boolean | number
) => {
  if (!el) return;
  let width: number | string = el.clientWidth;
  if (typeof matchOriginWidth == 'number') width = matchOriginWidth;
  if (!matchOriginWidth) width = 'max-content';
  return { width };
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
  zIndex,
}: PopoverProps) => {
  const isMounted = useMounted();
  const [internalOpen, setInternalOpen] = useState<boolean>(false);
  const [styles, setStyles] = useState<CSSProperties>(getStyles(style));
  const [contentRoot, setContentRoot] = useState<HTMLDivElement | null>(null);

  const handleClickAway = (e: Event) => {
    if (!isFunction(onClickAway)) return;
    onClickAway(e);
  };

  const setStyle = () => {
    if (!internalOpen) return;
    if (!contentRoot) return console.error('Unexpected behavior');

    // let viewportType;
    let triggerRect;
    let viewportRect;

    if (true || position === 'absolute') {
      const parent = contentRoot.offsetParent;
      // TODO: handle parent table elements
      viewportRect = (parent || document.body).getBoundingClientRect();
      triggerRect = originElement?.getBoundingClientRect();
    }

    /**
     * if (position === 'fixed') {
     * viewportRect = viewport.getBoundingClientRect();
     * triggerRect = viewport.getBoundingClientRect();
     * }
     */

    if (!viewportRect || !triggerRect) {
      return;
    }

    const popoverRect = contentRoot.getBoundingClientRect();
    const [getPositionX, getPositionY] = getPositionHandlers(placement);

    setStyles({
      ...getStyles(style),
      ...getOriginWidth(originElement, matchOriginWidth),
      ...getPositionX(Axis.x, viewportRect, triggerRect, popoverRect, offsetX),
      ...getPositionY(Axis.y, viewportRect, triggerRect, popoverRect, offsetY),
    });
  };

  useEffect(() => {
    if (!internalOpen) return;
    if (!contentRoot) return;
    setStyle();
  }, [internalOpen, contentRoot, placement, originElement]);

  useEffect(() => {
    setInternalOpen($open);
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

  const content = internalOpen ? (
    <Merge onClick={stopPropagation} ref={setContentRoot} style={styles}>
      {children}
    </Merge>
  ) : null;

  if (disablePortal) {
    return content;
  }

  return <Portal style={{ zIndex }}>{content}</Portal>;
};

export default PopoverV2;
