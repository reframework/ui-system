import React from 'react';
import { Portal, PortalProps } from '@components/Portal';
import { MergeProps } from '@wip/MergeProps';
import usePopper, { UsePopperProps } from './usePopper';

export interface PopperProps
  extends Omit<UsePopperProps, 'arrow' | 'hoverTrap'> {
  children: React.ReactNode;
  portalProps?: PortalProps;
  arrow?: React.ReactNode | null;
  hoverTrap?: React.ReactNode | null;
}

const Popper = ({
  children,
  portalProps,
  arrow: arrowNode,
  hoverTrap: hoverTrapNode,
  ...restProps
}: PopperProps) => {
  const { popperProps, arrowProps, hoverTrapProps } = usePopper({
    ...restProps,
    hoverTrap: !!hoverTrapNode,
    arrow: !!arrowNode,
  });

  let popper = null;
  let arrow = null;
  let hoverTrap = null;

  if (popperProps?.open) {
    const arrowStyle = {
      opacity: arrowProps.style ? 1 : 0,
      pointerEvents: arrowProps.style ? 'inherit' : 'none',
      position: 'absolute',
      ...arrowProps.style,
    };

    const popperStyle = {
      opacity: popperProps.style ? 1 : 0,
      pointerEvents: popperProps.style ? 'inherit' : 'none',
      width: popperProps?.width,
      position: 'absolute',
      ...popperProps.style,
    };

    const hoverTrapStyle = {
      opacity: 0,
      pointerEvents: hoverTrapProps.style ? 'inherit' : 'none',
      position: 'absolute',
      ...hoverTrapProps.style,
    };

    popper = (
      <MergeProps {...popperProps} style={popperStyle}>
        {children}
      </MergeProps>
    );

    if (arrowNode) {
      arrow = (
        <MergeProps {...arrowProps} style={arrowStyle}>
          {arrowNode}
        </MergeProps>
      );
    }

    if (hoverTrapNode) {
      hoverTrap = (
        <MergeProps {...hoverTrapProps} style={hoverTrapStyle}>
          {hoverTrapNode}
        </MergeProps>
      );
    }
  }

  const content = (
    <>
      {hoverTrap}
      {popper}
      {arrow}
    </>
  );

  if (portalProps?.portalTarget === null) return content;

  return (
    <Portal id="ref:popper-portal-id" {...portalProps}>
      {content}
    </Portal>
  );
};

export default Popper;
