import React from 'react';
import { Portal, PortalProps } from '@components/Portal';
import Merge from '@wip/Trigger/Merge';
import usePopper, { UsePopperProps } from './usePopper';

export interface PopperProps extends UsePopperProps {
  children: React.ReactNode;
  disablePortal?: boolean;
  portalProps?: PortalProps;
}

const Popover = ({
  children,
  disablePortal,
  portalProps,
  ...restProps
}: PopperProps) => {
  const { open, ref, styles } = usePopper(restProps);

  const content = open ? (
    <Merge ref={ref} style={styles}>
      {children}
    </Merge>
  ) : null;

  if (disablePortal) return content;

  return (
    <Portal id="ref:popper-portal-id" {...portalProps}>
      {content}
    </Portal>
  );
};

export default Popover;
