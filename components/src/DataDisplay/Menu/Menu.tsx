import React from 'react';
import Popover, { PopoverProps } from '../../Messaging/Popover/Popover';
import Paper, { PaperProps } from '../../Containers/Paper/Paper';
import { List, ListProps } from '../../DataDisplay/List';
import Trigger from '../../Trigger/Trigger';

/**
 * MenuProps
 */

type Action = 'click' | 'hover';

const actionHandlerName: Record<string, string> = {
  click: 'onClick',
  hover: 'onMouseEnter',
};

// TODO: Add MenuList, MenuListItem
export interface MenuProps {
  anchorEl?: HTMLElement | null;
  autoFocus?: boolean;
  children: React.ReactNode;
  MenuListProps?: ListProps;
  onClose?: () => void;
  open?: boolean;
  PaperProps?: PaperProps;
  PopoverProps?: PopoverProps;
  trigger?: React.ReactNode;
  triggerAction?: Action;
}

const Menu = ({
  // onChange,
  // onOpen,
  anchorEl,
  children,
  MenuListProps,
  onClose,
  open,
  PaperProps,
  PopoverProps,
  trigger,
  triggerAction = 'click',
}: MenuProps) => {
  const [internalOpen, setInternalOpen] = React.useState(Boolean(open));

  const openMenu = () => {
    console.log('Clicks trigger');
    setInternalOpen(true);
  };

  const closeMenu = () => {
    setInternalOpen(false);
    if (typeof onClose === 'function') {
      onClose();
    }
  };

  const triggerProps: Record<string, typeof openMenu> = {};

  // Only if uncontrolled mode
  if (typeof open !== 'boolean') {
    if (typeof triggerAction === 'string') {
      triggerProps[actionHandlerName[triggerAction]] = openMenu;
    }
  }

  React.useEffect(() => {
    // handles controlled mode
    if (typeof open !== 'boolean') return;
    setInternalOpen(open);
  }, [open]);

  return (
    <>
      <Trigger {...triggerProps}>{trigger}</Trigger>
      <Popover
        anchorWidth
        {...PopoverProps}
        anchorEl={anchorEl}
        onClickAway={closeMenu}
        open={internalOpen}
      >
        <Paper reflection={3} {...PaperProps}>
          <List {...MenuListProps}>{children}</List>
        </Paper>
      </Popover>
    </>
  );
};

Menu.MenuItem = List.ListItem;
Menu.MenuList = List;

export default Menu;
