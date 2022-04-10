import React from 'react';
import { PaperProps } from '@components/Paper';
import { isFunction, isNumber, cancelEvent } from '@utils/index';
import { Popover, PopoverProps } from '@components/Popover';
import useControlledState from '@utils/useControlledState';
import { createKeyboardHandler } from '@utils/Keyboard';
import { MenuProvider } from '@components/Menu/Context';
import MergeProps from '@wip/Trigger/Merge';
import { Optional } from '@wip/Combobox/types';
import MenuList from './MenuList';
import MenuItem from './MenuItem';

type Action = 'click' | 'hover';

export interface MenuProps {
  // closeOnBlur
  autoFocus?: boolean;
  children: React.ReactNode;
  closeOnSelect?: boolean;
  defaultOpen?: boolean;
  id?: string;
  matchOriginWidth?: PopoverProps['matchOriginWidth'];
  offsetX?: number;
  offsetY?: number;
  onClose?: () => void;
  onOpen?: () => void;
  open?: boolean;
  originElement?: HTMLElement | null;
  paperProps?: PaperProps;
  placement?: PopoverProps['placement'];
  popoverProps?: PopoverProps;
  portal?: boolean;
  trigger?: React.ReactNode;
  triggerAction?: Action;
}

const Menu = ({
  // triggerAction = 'click',
  autoFocus = false,
  children,
  id = 'ref/:menu-id',
  matchOriginWidth = true,
  offsetX,
  offsetY,
  onClose,
  onOpen,
  open: $open,
  originElement,
  paperProps,
  placement = 'bottom-start',
  popoverProps,
  portal = false,
  trigger,
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
      <MergeProps
        onClick={openMenu}
        aria-controls={id}
        aria-expanded={isOpen}
        aria-haspopup={true}
        onKeyDown={handleTriggerKeyDown}
        ref={triggerRef}
        tabIndex={0}
      >
        {isFunction(trigger) ? trigger.call(null, { isOpen }) : trigger}
      </MergeProps>
      <Popover
        matchOriginWidth={matchOriginWidth}
        placement={placement}
        disablePortal={!portal}
        offsetX={offsetX}
        offsetY={offsetY}
        {...popoverProps}
        originElement={originElement || triggerRef.current}
        onClickAway={handleClickAway}
        open={isOpen}
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
