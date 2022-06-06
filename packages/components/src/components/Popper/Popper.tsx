import React from 'react';
import { Portal, PortalProps } from '@components/Portal';
import { MergeProps } from '@wip/MergeProps';
import usePopper, { UsePopperProps } from './usePopper';

export interface PopperProps extends Omit<UsePopperProps, 'spacer'> {
  children: React.ReactNode;
  portalProps?: PortalProps;
  arrow?: React.ReactNode | null;
  spacer?: React.ReactNode | null;
}

const Popper = ({
  children,
  portalProps,
  arrow: arrowNode,
  spacer: spacerNode,
  ...restProps
}: PopperProps) => {
  const { popperProps, arrowProps, spacerProps } = usePopper({
    ...restProps,
    spacer: !!spacerNode,
    // arrow: arrowNode,
  });

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
    width: popperProps?.width,
    //
    ...popperProps.style,
    position: 'absolute',
    //
  };

  const spacerStyle = {
    opacity: 0,
    pointerEvents: spacerProps.style ? 'inherit' : 'none',
    position: 'absolute',
    ...spacerProps.style,
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

  const spacer = spacerNode ? (
    <MergeProps {...spacerProps} style={spacerStyle}>
      {spacerNode}
    </MergeProps>
  ) : null;

  const content = (
    <>
      {popper}
      {spacer}
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
