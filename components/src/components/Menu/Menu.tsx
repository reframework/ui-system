import React from 'react';
import { PaperProps } from '@components/Paper';
import { isFunction, isNumber, cancelEvent } from '@utils/index';
import { Popover, PopoverProps } from '@components/Popover';
import useControlledState from '@utils/useControlledState';
import { createKeyboardHandler } from '@utils/Keyboard';
import { MenuProvider } from '@components/Menu/Context';
import Merge from '@wip/Trigger/Merge';
import { Optional } from '@wip/Combobox/types';
import MenuList from './MenuList';
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
  // triggerAction = 'click',
  portal = false,
  watchResizing,
}: MenuProps) => {
  // Saves ref to the state in order to catch the un/mounting
  const triggerRef = React.useRef<HTMLElement>(null);
  const [autoFocusIndex, setAutofocusIndex] =
    React.useState<Optional<number>>();

  const { state: isOpen, setState: setIsOpen } = useControlledState({
    controlled: $open,
    default: false,
  });

  /**
   * Opens menu
   */
  const openMenu = (options?: { focusIndex?: number }) => {
    if (isOpen) return;
    if (isNumber(options?.focusIndex)) {
      setAutofocusIndex(options?.focusIndex);
    }
    setIsOpen(true);
    onOpen?.();
  };

  /**
   * Closes menu
   */
  const closeMenu = React.useCallback(() => {
    if (!isOpen) return;
    setIsOpen(false);
    setAutofocusIndex(undefined);
    onClose?.();
  }, [onClose, setAutofocusIndex, setIsOpen, isOpen]);

  /**
   * Popover property
   */
  const handleClickAway = React.useCallback(() => {
    if (isOpen) closeMenu();
  }, [isOpen, closeMenu]);

  const openWithTheFirstFocused = cancelEvent(() => {
    openMenu({ focusIndex: 0 });
  });

  const openWithTheLastFocused = cancelEvent(() => {
    openMenu({ focusIndex: -1 });
  });

  const handleTriggerKeyDown = createKeyboardHandler({
    onEnter: openWithTheFirstFocused,
    onSpace: openWithTheFirstFocused,
    onArrowDown: openWithTheFirstFocused,
    onArrowUp: openWithTheLastFocused,
  });

  /**
   * Menu Context
   */
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
        ref={triggerRef}
        tabIndex={0}
      >
        {isFunction(trigger) ? trigger.call(null, { isOpen }) : trigger}
      </Merge>
      <Popover
        matchOriginWidth={matchOriginWidth}
        placement={placement}
        watchResizing={watchResizing}
        disablePortal={!portal}
        {...popoverProps}
        originElement={originElement || triggerRef.current}
        onClickAway={handleClickAway}
        open={isOpen}
        offsetX={10}
        offsetY={10}
        paperProps={paperProps}
      >
        <MenuList id={id} autoFocusIndex={autoFocusIndex}>
          {children}
        </MenuList>
      </Popover>
    </MenuProvider>
  );
};

Menu.MenuItem = MenuItem;
Menu.MenuList = MenuList;

export default Menu;
