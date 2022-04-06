import React from 'react';
import { Portal, PortalProps } from '@components/Portal';
import Merge from '../Trigger/Merge';
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

  console.log(children, 'children');
  const content = !open ? null : (
    <Merge ref={ref} style={styles}>
      {children}
    </Merge>
  );

  if (disablePortal) return content;

  return (
    <Portal id="ref:popper-portal-id" {...portalProps}>
      {content}
    </Portal>
  );
};

export default Popover;
