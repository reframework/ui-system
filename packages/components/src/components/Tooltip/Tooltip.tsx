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
}

const Tooltip: React.FC<TooltipProps> = ({
  children,
  title,
  paperProps,
  open,
  defaultOpen,
  arrow = <Arrow />,
  ...props
}) => {
  const { state: internalOpen, setState: setInternalOpen } = useControlledState(
    {
      controlled: open,
      default: !!defaultOpen,
    },
  );

  const originRef = React.useRef<HTMLElement | null>(null);
  const spacerRef = React.useRef<HTMLDivElement | null>(null);
  const popperRef = React.useRef<HTMLDivElement | null>(null);
  /**
   * Closing timeout
   */
  const closeTimerRef = React.useRef(0);

  const onPointerOver = () => {
    clearTimeout(closeTimerRef.current);
    if (internalOpen) return;
    setInternalOpen(true);
  };

  const onSpacerPointerOver = () => {
    clearTimeout(closeTimerRef.current);
  };

  const onPointerOut = ({ clientX, clientY, target }: React.PointerEvent) => {
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
      () => setInternalOpen(false),
      CLOSE_TIMEOUT,
    );
  };

  const origin = useCloneElement(children, {
    ref: originRef,
    onClick: () => setInternalOpen((prev) => !prev),
    onPointerOver,
    onPointerOut,
  });

  // TODO: add only on hover
  const spacer = (
    <div
      ref={spacerRef}
      onPointerOut={onPointerOut}
      onPointerOver={onSpacerPointerOver}
    />
  );

  return (
    <>
      {origin}
      <Popper
        {...props}
        originElement={originRef.current}
        open={internalOpen}
        arrow={arrow}
        spacer={spacer}
      >
        <Paper
          {...paperProps}
          ref={popperRef}
          onPointerOut={onPointerOut}
          onPointerOver={onPointerOver}
        >
          {title}
        </Paper>
      </Popper>
    </>
  );
};

export default Tooltip;
