import React from 'react';
import { Popper, PopperProps } from '@components/Popper';
import { PaperProps, Paper } from '@components/Paper';

export interface PopoverProps extends Omit<PopperProps, 'spacer' | 'arrow'> {
  children: React.ReactNode;
  paperProps?: PaperProps;
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
