import React from 'react';
import { Popper, PopperProps } from '@wip/Popper';
import { PaperProps, Paper } from '@components/Paper';

export interface PopoverProps extends PopperProps {
  children: React.ReactNode;
  paperProps: PaperProps;
}

const Popover: React.FC<PopoverProps> = ({
  children,
  paperProps,
  ...props
}) => {
  return (
    <Popper {...props}>
      <Paper {...paperProps}>{children}</Paper>
    </Popper>
  );
};

export default Popover;
