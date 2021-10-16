import React from 'react';
import Paper, { PaperProps } from '../../Containers/Paper/Paper';
import Popover, { PopoverProps } from '../../Messaging/Popover/Popover';
import Input, { InputProps } from '../Input/Input';
import List from '../../DataDisplay/List/List';
export interface SelectProps {
  children: React.ReactNode;
  onSelect: () => {};
  onChange: () => {};
  value: string;
  // nested
  InputProps: InputProps;
  PopoverProps: PopoverProps;
  PaperProps: PaperProps;
}

const Select = ({
  children,
  PaperProps,
  PopoverProps,
  InputProps,
}: SelectProps) => {
  return (
    <Popover {...PopoverProps} trigger={<Input {...InputProps} />}>
      <Paper {...PaperProps}>
        <List>{children}</List>
      </Paper>
    </Popover>
  );
};

export default Select;
