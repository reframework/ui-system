import React, { useEffect } from 'react';
import Popover, { PopoverProps } from '../../Messaging/Popover/Popover';
import Paper, { PaperProps } from '../../Containers/Paper/Paper';
import { List, ListProps } from '../../DataDisplay/List';
import Trigger from '../../Trigger/Trigger';

/**
 * MenuProps
 */

type Action = 'click' | 'hover';

const actionHandlerName: Record<Action, string> = {
  click: 'onClick',
  hover: 'onMouseEnter',
};

// TODO: Add MenuList, MenuListItem
export interface MenuProps {
  anchorEl?: HTMLElement | null;
  autoFocus?: boolean;
  children: React.ReactNode;
  keepOpen: boolean;
  MenuListProps?: ListProps;
  onClose?: () => void;
  onOpen?: () => void;

  open?: boolean;
  PaperProps?: PaperProps;
  trigger?: React.ReactNode;
  triggerAction?: Action;
  // Popover props
  PopoverProps?: PopoverProps;
  placement: PopoverProps['placement'];
  anchorWidth: PopoverProps['anchorWidth'];
}

const Menu = ({
  onOpen,
  anchorEl,
  anchorWidth = true,
  children,
  MenuListProps,
  onClose,
  open,
  PaperProps,
  placement,
  PopoverProps,
  trigger,
  // keep open (do not close after click item is caught)
  triggerAction = 'click',
}: MenuProps) => {
  const [internalOpen, setInternalOpen] = React.useState(Boolean(open));

  // Saves ref to the state in order to catch the un/mounting
  const [paperRef, setPaperRef] = React.useState<HTMLDivElement | null>(null);

  const openMenu = () => {
    setInternalOpen(true);
    if (typeof onOpen === 'function') {
      onOpen();
    }
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

  // Subscribes to the custom event
  React.useEffect(() => {
    if (!paperRef) return;
    paperRef.addEventListener('rf:list-item-click', closeMenu);

    return () => {
      if (!paperRef) return;
      paperRef.removeEventListener('rf:list-item-click', closeMenu);
    };
  }, [paperRef]);

  React.useEffect(() => {
    // handles controlled mode
    if (typeof open !== 'boolean') return;
    setInternalOpen(open);
  }, [open]);

  return (
    <>
      <Trigger {...triggerProps}>{trigger}</Trigger>
      <Popover
        {...PopoverProps}
        anchorWidth={anchorWidth}
        placement={placement}
        anchorEl={anchorEl}
        onClickAway={closeMenu}
        open={internalOpen}
      >
        <Paper
          reflection={3}
          {...PaperProps}
          ref={setPaperRef}
          onMouseLeave={closeMenu}
        >
          <List {...MenuListProps}>{children}</List>
        </Paper>
      </Popover>
    </>
  );
};

Menu.MenuItem = List.ListItem;
Menu.MenuList = List;

export default Menu;
