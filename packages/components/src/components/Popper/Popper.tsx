import React from 'react';
import { Portal, PortalProps } from '@components/Portal';
import { MergeProps } from '@wip/MergeProps';
import usePopper, { UsePopperProps } from './usePopper';

export interface PopperProps extends UsePopperProps {
  children: React.ReactNode;
  portalTarget?: HTMLElement | null;
  portalProps?: PortalProps;
  arrow?: React.ReactNode | null;
}

const Popper = ({
  children,
  portalTarget,
  portalProps,
  arrow: arrowNode,
  ...restProps
}: PopperProps) => {
  console.log(restProps.open, restProps.originElement, 'OPEN');
  const { popperProps, arrowProps, spacerProps } = usePopper(restProps);

  if (!open) return null;

  const arrowStyle = {
    opacity: arrowProps.style ? 1 : 0,
    pointerEvents: arrowProps.style ? 'inherit' : 'none',
    position: 'absolute',
    ...arrowProps.style,
  };

  const popperStyle = {
    //
    opacity: popperProps.style ? 1 : 0,
    pointerEvents: popperProps.style ? 'inherit' : 'none',
    //
    // width: 200, // getWidth(originElement, matchWidth),
    //
    ...popperProps.style,
    position: 'absolute',
    //
  };

  const popper = (
    <MergeProps {...popperProps} style={popperStyle}>
      {children}
    </MergeProps>
  );

  const arrow = arrowNode ? (
    <MergeProps {...arrowProps} style={arrowStyle}>
      {arrowNode}
    </MergeProps>
  ) : null;

  // to do: portalTarget
  // if (portalTarget === null) return content;
  const spacer = <div />;

  return (
    <Portal
      id="ref:popper-portal-id"
      portalTarget={portalTarget}
      {...portalProps}
    >
      {popper}
      {spacer}
      {arrow}
    </Portal>
  );
};

export default Popper;
