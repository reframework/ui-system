import React from 'react';
import Popover, { PopoverProps } from '../../Messaging/Popover/Popover';
import Paper, { PaperProps } from '../../Containers/Paper/Paper';
import List, { ListProps } from '../../DataDisplay/List/List';

export interface MenuProps {
  children: React.ReactNode;
  PaperProps: PaperProps;
  ListProps: ListProps;
  PopoverProps: PopoverProps;
}

const Menu = ({ children, ListProps, PaperProps, PopoverProps }: MenuProps) => {
  return (
    <Popover {...PopoverProps}>
      <Paper {...PaperProps}>
        <List {...ListProps}>{children}</List>
      </Paper>
    </Popover>
  );
};

export default Menu;