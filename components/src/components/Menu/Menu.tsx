import React from 'react';
import Popover, { PopoverProps } from '../Popover/Popover';
import { PaperProps } from '../Paper/Paper';
import Trigger from '../Trigger/Trigger';
import MenuItem from './MenuItem';
import { useControlledState } from '../../utils';
import { createContext } from '../../utils/context';
import { cancelEvent, createKeyboardHandler } from './utils';
import { MenuList } from './MenuList';

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
  onClose?: () => {};
  onOpen?: () => {};
  open?: boolean;
  paperProps?: PaperProps;
  trigger?: React.ReactNode;
  triggerAction?: Action;
  // Popover props
  PopoverProps?: PopoverProps;
  placement: PopoverProps['placement'];
  anchorWidth: PopoverProps['anchorWidth'];
}

export const [MenuProvider, useMenuContext] = createContext();

const Menu = ({
  onOpen,
  anchorEl,
  anchorWidth = false,
  children,
  onClose,
  open: $open,
  paperProps,
  placement = 'start-after',
  PopoverProps,
  trigger,
  // closeOnSelect = true,
  // closeOnBlur = true,
  // autoSelect = true,
  // keep open (do not close after click item is caught)
  triggerAction = 'click',
}: MenuProps) => {
  // Saves ref to the state in order to catch the un/mounting

  const [internalOpen, setInternalOpen] = useControlledState({
    controlled: $open,
    default: false,
  });

  const openMenu = () => {
    if (internalOpen) return;
    setInternalOpen(true);
    onOpen?.();
  };

  const closeMenu = () => {
    setInternalOpen(false);
    onClose?.();
  };

  const handleListKeyDown = createKeyboardHandler({
    onEnter: cancelEvent(closeMenu),
    onEscape: cancelEvent(closeMenu),
    onTab: closeMenu,
  });

  const handleTriggerKeyDown = createKeyboardHandler({
    onEnter: cancelEvent(openMenu),
    onSpace: cancelEvent(openMenu),
  });

  const handleMouseLeave = (event: React.MouseEvent) => {
    if (triggerAction === 'hover') {
      // todo: handle hovering
    }
  };

  const triggerProps: Record<string, (...args: any[]) => void> = {
    onKeyDown: handleTriggerKeyDown,
    onMouseLeave: handleMouseLeave,
    [actionHandlerName[triggerAction]]: openMenu,
    ['aria-haspopup']: true,
    ['aria-expanded']: internalOpen,
    ['aria-controls']: 'my-menu',
    tabIndex: 0,
  };

  return (
    <MenuProvider
      value={{
        close: closeMenu,
        isOpen: internalOpen,
      }}
    >
      <Trigger {...triggerProps}>{trigger}</Trigger>
      <Popover
        anchorWidth={anchorWidth}
        placement={placement}
        {...PopoverProps}
        anchorEl={anchorEl}
        onClickAway={closeMenu}
        open={internalOpen}
      >
        <MenuList
          paperProps={paperProps}
          onKeyDown={handleListKeyDown}
          onMouseLeave={handleMouseLeave}
        >
          {children}
        </MenuList>
      </Popover>
    </MenuProvider>
  );
};

Menu.MenuItem = MenuItem;
Menu.MenuList = MenuList;

export default Menu;
