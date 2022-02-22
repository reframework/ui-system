import React from 'react';
import { Portal, PortalProps } from '../Portal';
import Merge from '../Trigger/Merge';
import usePopper, { UsePopperProps } from './usePopper';

export interface PopoverProps extends UsePopperProps {
  children: React.ReactNode;
  disablePortal?: boolean;
  portalProps?: PortalProps;
}

const PopoverV3 = ({
  children,
  disablePortal,
  portalProps,
  ...restProps
}: PopoverProps) => {
  const { open, ref, styles } = usePopper(restProps);

  const content = !open ? null : (
    <Merge ref={ref} style={styles}>
      {children}
    </Merge>
  );

  if (disablePortal) return content;

  return (
    <Portal id="popover-root" {...portalProps}>
      {content}
    </Portal>
  );
};

export default PopoverV3;
