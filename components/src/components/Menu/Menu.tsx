import React from 'react';
import Paper, { PaperProps } from '../Paper/Paper';
import MenuItem from './MenuItem';
import { isFunction, isNumber, useControlledState } from '../../utils';
import { createContext } from '../../utils/context';
import { cancelEvent, createKeyboardHandler } from './utils';
import { MenuList } from './MenuList';
import PopoverV2, { PopoverProps } from '../Popover/PopoverV2';
import Merge from '../Trigger/Merge';
import { Optional } from '../Combobox/types';

type Action = 'click' | 'hover';

const actionHandlerName: Record<Action, string> = {
  click: 'onClick',
  hover: 'onMouseEnter',
};

// TODO: Add MenuList, MenuListItem
export interface MenuProps {
  id?: string;
  originElement?: HTMLElement | null;
  autoFocus?: boolean;
  children: React.ReactNode;
  onClose?: () => {};
  onOpen?: () => {};
  open?: boolean;
  paperProps?: PaperProps;
  trigger?: React.ReactNode;
  triggerAction?: Action;
  // Popover props
  popoverProps?: PopoverProps;
  placement: PopoverProps['placement'];
  matchOriginWidth: PopoverProps['matchOriginWidth'];
  disablePortal?: boolean;
  //
  // closeOnBlur
  closeOnSelect?: boolean;
  defaultOpen?: boolean;
  preventOverflow?: boolean;
}

export const [MenuProvider, useMenuContext] =
  createContext<{ isOpen: boolean; close: () => void }>();

const Menu = ({
  originElement,
  matchOriginWidth = true,
  autoFocus = false,
  children,
  id = 'menu',
  onClose,
  onOpen,
  open: $open,
  paperProps,
  placement = 'start-after',
  popoverProps,
  trigger,
  // closeOnSelect = true,
  // closeOnBlur = true,
  // autoSelect = true,
  // keep open (do not close after click item is caught)
  triggerAction = 'click',
  disablePortal = false,
  watchResizing,
}: MenuProps) => {
  // Saves ref to the state in order to catch the un/mounting
  const triggerRef = React.useRef<HTMLElement>(null);
  const [autoFocusIndex, setAutofocusIndex] =
    React.useState<Optional<number>>();

  const [isOpen, setIsOpen] = useControlledState({
    controlled: $open,
    default: false,
  });

  const openMenu = (options?: { focusIndex?: number }) => {
    if (isOpen) return;
    if (isNumber(options?.focusIndex)) {
      setAutofocusIndex(options?.focusIndex);
    }
    setIsOpen(true);
    onOpen?.();
  };

  const closeMenu = () => {
    setIsOpen(false);
    setAutofocusIndex(undefined);
    onClose?.();
  };

  const openWithTheFirstFocused = () => {
    openMenu({ focusIndex: 0 });
  };

  const openWithTheLastFocused = () => {
    openMenu({ focusIndex: -1 });
  };

  const handleListKeyDown = createKeyboardHandler({
    onEnter: cancelEvent(closeMenu),
    onEscape: cancelEvent(closeMenu),
    onTab: closeMenu,
  });

  const handleTriggerKeyDown = createKeyboardHandler({
    onEnter: cancelEvent(openWithTheFirstFocused),
    onSpace: cancelEvent(openWithTheFirstFocused),
    onArrowDown: cancelEvent(openWithTheFirstFocused),
    onArrowUp: cancelEvent(openWithTheLastFocused),
  });

  const handleMouseLeave = (event: React.MouseEvent) => {
    if (triggerAction === 'hover') {
      // todo: handle hovering
    }
  };

  const menuContext = {
    close: closeMenu,
    isOpen: isOpen,
  };

  /**
   * Autofocus handling
   */
  React.useEffect(() => {
    if (autoFocus && triggerRef.current) {
      triggerRef.current.focus();
    }
  }, [triggerRef.current]);

  return (
    <MenuProvider value={menuContext}>
      <Merge
        onClick={openMenu}
        aria-controls={id}
        aria-expanded={isOpen}
        aria-haspopup={true}
        onKeyDown={handleTriggerKeyDown}
        onMouseLeave={handleMouseLeave}
        ref={triggerRef}
        tabIndex={0}
      >
        {isFunction(trigger) ? trigger.call(null, { isOpen }) : trigger}
      </Merge>
      <PopoverV2
        matchOriginWidth={matchOriginWidth}
        placement={placement}
        {...popoverProps}
        originElement={originElement || triggerRef.current}
        onClickAway={closeMenu}
        open={isOpen}
        disablePortal={disablePortal}
        watchResizing={watchResizing}
      >
        <Paper {...paperProps}>
          <MenuList
            id={id}
            autoFocusIndex={autoFocusIndex}
            onKeyDown={handleListKeyDown}
            onMouseLeave={handleMouseLeave}
          >
            {children}
          </MenuList>
        </Paper>
      </PopoverV2>
    </MenuProvider>
  );
};

Menu.MenuItem = MenuItem;
Menu.MenuList = MenuList;

export default Menu;
