import React from 'react';
import { Paper, PaperProps } from '@components/Paper';
import { isFunction, isNumber, cancelEvent } from '@utils/index';
import { Popover, PopoverProps } from '@wip/Popover';
import useControlledState from '@utils/useControlledState';
import { createKeyboardHandler } from '@utils/Keyboard';
import { MenuProvider } from '@wip/Menu/Context';
import { Optional } from '../Combobox/types';
import Merge from '../Trigger/Merge';
import { MenuList } from './MenuList';
import MenuItem from './MenuItem';

type Action = 'click' | 'hover';

export interface MenuProps {
  autoFocus?: boolean;
  children: React.ReactNode;
  id?: string;
  onClose?: () => void;
  onOpen?: () => void;
  open?: boolean;
  originElement?: HTMLElement | null;
  paperProps?: PaperProps;
  trigger?: React.ReactNode;
  triggerAction?: Action;
  // Popover props
  matchOriginWidth?: PopoverProps['matchOriginWidth'];
  placement?: PopoverProps['placement'];
  popoverProps?: PopoverProps;
  portal?: boolean;
  // closeOnBlur
  closeOnSelect?: boolean;
  defaultOpen?: boolean;
  preventOverflowX?: boolean;
  preventOverflowY?: boolean;
  watchResizing?: boolean;
}

const Menu = ({
  originElement,
  matchOriginWidth = true,
  autoFocus = false,
  children,
  id = 'ref/:menu-id',
  onClose,
  onOpen,
  open: $open,
  paperProps,
  placement = 'bottom-start',
  popoverProps,
  trigger,
  // closeOnSelect = true,
  // closeOnBlur = true,
  // autoSelect = true,
  // keep open (do not close after click item is caught)
  triggerAction = 'click',
  portal = false,
}: // watchResizing,
// preventOverflowX,
// preventOverflowY,
MenuProps) => {
  // Saves ref to the state in order to catch the un/mounting
  const triggerRef = React.useRef<HTMLElement>(null);
  const [autoFocusIndex, setAutofocusIndex] =
    React.useState<Optional<number>>();

  const { state: isOpen, setState: setIsOpen } = useControlledState({
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

  const closeMenu = React.useCallback(() => {
    if (!isOpen) return;
    setIsOpen(false);
    setAutofocusIndex(undefined);
    onClose?.();
  }, [onClose, setAutofocusIndex, setIsOpen, isOpen]);

  const handleClickAway = React.useCallback(() => {
    if (isOpen) closeMenu();
  }, [isOpen, closeMenu]);

  const openWithTheFirstFocused = () => {
    openMenu({ focusIndex: 0 });
  };

  const openWithTheLastFocused = () => {
    openMenu({ focusIndex: -1 });
  };

  const handleListKeyDown = createKeyboardHandler({
    onEnter: cancelEvent(closeMenu),
    onEscape: cancelEvent(closeMenu),
    onTab: cancelEvent(closeMenu),
  });

  const handleTriggerKeyDown = createKeyboardHandler({
    onEnter: cancelEvent(openWithTheFirstFocused),
    onSpace: cancelEvent(openWithTheFirstFocused),
    onArrowDown: cancelEvent(openWithTheFirstFocused),
    onArrowUp: cancelEvent(openWithTheLastFocused),
  });

  const handleMouseLeave = () => {
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [triggerRef.current]);

  console.log('$$ Menu: updated $$');

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
      <Popover
        matchOriginWidth={matchOriginWidth}
        placement={placement}
        // watchResizing={watchResizing}
        disablePortal={!portal}
        // preventOverflowX={preventOverflowX}
        // preventOverflowY={preventOverflowY}
        {...popoverProps}
        originElement={originElement || triggerRef.current}
        onClickAway={handleClickAway}
        open={isOpen}
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
      </Popover>
    </MenuProvider>
  );
};

Menu.MenuItem = MenuItem;
Menu.MenuList = MenuList;

export default Menu;
