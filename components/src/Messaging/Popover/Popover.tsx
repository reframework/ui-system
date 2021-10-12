import React, { CSSProperties, useEffect, useState } from "react";
import { Portal } from "./Portal";
import { getPlacement, viewport } from "./placementUtils";
import { Axis, ViewportType, PlacementAxis, Placement } from "./types";
import {
  addClickListener,
  addResizeListener,
  removeClickListener,
  removeResizeListener,
  stopPropagation,
} from "./domUtils";

import { useMounted } from "./hooks";

export function isFunction<T extends Function>(f: T): f is T {
  return typeof f === "function";
}

export type PopoverProps = {
  anchorEl?: HTMLElement;
  className?: string;
  offsetX?: number;
  offsetY?: number;
  onChange?: (open: boolean) => void;
  onClickAway?: (e: Event) => void;
  onClose?: () => void;
  open: boolean;
  placement?: Placement;
  trigger: React.ReactNode;
  zIndex?: number;
};

const getPositionHandlers = (placement: Placement) => {
  const [x, y] = placement.split("-") as [PlacementAxis, PlacementAxis];
  return [getPlacement[x], getPlacement[y]];
};

const getCssPosition = () => {
  return {
    // Could be fixed ?
    position: "absolute" as const,
  };
};

const Popover: React.FC<PopoverProps> = ({
  anchorEl,
  children,
  offsetX,
  offsetY,
  onChange,
  onClickAway,
  onClose,
  open: $open,
  placement = "start-start",
  zIndex,
}) => {
  const isMounted = useMounted();
  const [internalOpen, setInternalOpen] = useState<boolean>(false);
  const [style, setStyle] = useState<CSSProperties>(getCssPosition());
  const [contentRoot, setContentRoot] = useState<HTMLDivElement | null>(null);

  const toggle = (isOpen = !internalOpen) => {
    return isOpen ? handleOpen() : handleClose();
  };

  const handleOpen = () => {
    setInternalOpen(true);
  };

  const handleClose = () => {
    setInternalOpen(false);
  };

  const handleClickAway = (e: Event) => {
    if (isFunction(onClickAway)) {
      return onClickAway(e);
    }

    // TODO: close on click away
    // handleClose();
  };

  const setStyles = () => {
    if (!internalOpen) return;

    if (!contentRoot) {
      return console.error(
        "Unexpected behavior, popover element doesn't exist."
      );
    }

    const triggerRect = (anchorEl || viewport).getBoundingClientRect();
    const popoverRect = contentRoot.getBoundingClientRect();
    const [getPositionX, getPositionY] = getPositionHandlers(placement);
    const viewportType = anchorEl ? ViewportType.body : ViewportType.window;

    setStyle({
      ...getPositionX(Axis.x, viewportType, triggerRect, popoverRect, offsetX),
      ...getPositionY(Axis.y, viewportType, triggerRect, popoverRect, offsetY),
    });
  };

  useEffect(() => {
    if (!internalOpen) return;
    if (!contentRoot) return;
    setStyles();
  }, [internalOpen, contentRoot]);

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
      addResizeListener(setStyles);
    }

    return () => {
      removeClickListener(handleClickAway);
      removeResizeListener(setStyles);
    };
  }, [contentRoot]);

  return (
    <Portal zIndex={zIndex}>
      {internalOpen && (
        <div ref={setContentRoot} style={style} onClick={stopPropagation}>
          {children}
        </div>
      )}
    </Portal>
  );
};

export default Popover;
