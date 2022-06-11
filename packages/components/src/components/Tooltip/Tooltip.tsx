import React from 'react';
import { Popper, PopperProps } from '@components/Popper';
import { PaperProps, Paper } from '@components/Paper';
import useCloneElement from '@wip/MergeProps/cloneElement';
import { useControlledState } from '@utils/useControlledState';
import { Arrow } from './Arrow';

// TODO: create useTooltipHook
// Add events click/focus/touch
export interface TooltipProps extends PopperProps {
  children: React.ReactNode;
  paperProps?: PaperProps;
  title: React.ReactNode;
  // to do: Add more props
  disableClickListener?: boolean;
  disableClickOutsideListener?: boolean;
  disableFocusListener?: boolean;
  disableHoverListener?: boolean;
  disableTouchListener?: boolean;
}

interface UseListenerParams {
  disabled: boolean;
  setState: (state: boolean) => void;
  state: boolean;
}

/**
 * Touching
 */
const useListeners = (params: {
  disableTouchListener: boolean;
  disableFocusListener: boolean;
  setState: UseListenerParams['setState'];
}) => {
  const { disableFocusListener, disableTouchListener, setState } = params;
  // TODO: add timeout props
  const OPEN_TIMEOUT = 700;

  const openTimerRef = React.useRef<number>(-1);
  const isOpenRef = React.useRef(false);
  const isTouchInteractionRef = React.useRef(false);

  const onFocus = () => {
    if (disableFocusListener) return;

    // todo:  setTimeout(() => {
    if (isTouchInteractionRef.current) return;
    setState(true);
    // }, 0);
  };

  const onBlur = () => {
    if (disableFocusListener) return;
    if (isTouchInteractionRef.current) return;
    setState(false);
  };

  const onPointerDown = () => {
    if (disableTouchListener) return;
    isTouchInteractionRef.current = true;
    isOpenRef.current = false;

    openTimerRef.current = window.setTimeout(() => {
      isOpenRef.current = true;
      isTouchInteractionRef.current = false;
      setState(true);
    }, OPEN_TIMEOUT);
  };

  const onPointerUp = () => {
    if (disableTouchListener) return;
    if (!isOpenRef.current) {
      clearTimeout(openTimerRef.current);
    }
  };

  return {
    onPointerDown,
    onPointerUp,
    onFocus,
    onBlur,
  };
};

/**
 * Hovering
 */
const useHoverListener = ({
  disabled,
  setState,
  spacerRef,
}: UseListenerParams & {
  spacerRef: React.MutableRefObject<HTMLDivElement | null>;
}) => {
  /**
   * Closing timer
   */
  const closeTimerRef = React.useRef(-1);

  const onPointerOver = (event: React.PointerEvent) => {
    if (event.pointerType !== 'mouse') return;
    clearTimeout(closeTimerRef.current);
    setState(true);
  };

  const onSpacerMouseOver = () => {
    clearTimeout(closeTimerRef.current);
  };

  const onPointerOut = ({ clientX, clientY, target }: React.MouseEvent) => {
    if (spacerRef.current && target !== spacerRef.current) {
      const spacerRect = spacerRef.current?.getBoundingClientRect();

      if (
        clientX >= spacerRect?.left &&
        clientX <= spacerRect?.right &&
        clientY >= spacerRect?.top &&
        clientY <= spacerRect?.bottom
      ) {
        return;
      }
    }

    // TODO: add timeout props
    const CLOSE_TIMEOUT = 100;
    closeTimerRef.current = window.setTimeout(
      () => setState(false),
      CLOSE_TIMEOUT,
    );
  };

  if (disabled) return {};

  return {
    onPointerOut,
    onPointerOver,
    onSpacerMouseOver,
  };
};

const Tooltip: React.FC<TooltipProps> = ({
  children,
  title,
  paperProps,
  open,
  defaultOpen,
  arrow = <Arrow />,
  disableClickListener = true,
  disableFocusListener = false,
  disableHoverListener = false,
  disableTouchListener = false,
  disableClickOutsideListener = false,
  ...props
}) => {
  const originRef = React.useRef<HTMLElement | null>(null);
  const spacerRef = React.useRef<HTMLDivElement | null>(null);
  const popperRef = React.useRef<HTMLDivElement | null>(null);

  /**
   * State
   */
  const { state: internalOpen, setState: setInternalOpen } = useControlledState(
    {
      controlled: open,
      default: !!defaultOpen,
    },
  );

  const listeners = useListeners({
    disableTouchListener,
    disableFocusListener,
    setState: setInternalOpen,
  });

  const hoverListeners = useHoverListener({
    disabled: disableHoverListener,
    state: internalOpen,
    setState: setInternalOpen,
    spacerRef,
  });

  const onClick = () => {
    if (disableClickListener) return;
    setInternalOpen(true);
  };

  const onClickOutside = () => {
    if (disableClickOutsideListener) return;
    setInternalOpen(false);
  };

  const origin = useCloneElement(children, {
    ref: originRef,
    onPointerOver: hoverListeners.onPointerOver,
    onPointerOut: hoverListeners.onPointerOut,
    onFocus: listeners.onFocus,
    onBlur: listeners.onBlur,
    onPointerDown: listeners.onPointerDown,
    onPointerUp: listeners.onPointerUp,
    onClick,
  });

  return (
    <>
      {origin}
      <Popper
        onClickOutside={onClickOutside}
        {...props}
        originElement={originRef.current}
        open={internalOpen}
        arrow={arrow}
        hoverTrap={
          // eslint-disable-next-line jsx-a11y/mouse-events-have-key-events
          <div
            ref={spacerRef}
            aria-hidden={true}
            onPointerOut={hoverListeners.onPointerOut}
            onPointerOver={hoverListeners.onSpacerMouseOver}
          />
        }
      >
        <Paper
          {...paperProps}
          ref={popperRef}
          onPointerOut={hoverListeners.onPointerOut}
          onPointerOver={hoverListeners.onPointerOver}
        >
          {title}
        </Paper>
      </Popper>
    </>
  );
};

export default Tooltip;
