import React from 'react';
import { PaperProps } from '@components/Paper';
import { isFunction, isNumber, cancelEvent } from '@utils/index';
import { Popover, PopoverProps } from '@components/Popover';
import { useControlledState } from '@utils/useControlledState';
import { createKeyboardHandler } from '@utils/Keyboard';
import { MergeProps } from '@wip/MergeProps';
import { Optional } from '@wip/Combobox/types';
import { DOMFocus } from '@utils/focus';
import MenuList from './MenuList';

type Action = 'click' | 'hover';

/**
 * TODO:
 * 1. Lazy
 * 2. Animation
 */

export interface MenuProps {
  autoFocus?: boolean;
  children: React.ReactNode;
  defaultOpen?: boolean;
  id?: string;
  matchWidth?: PopoverProps['matchWidth'];
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
  // TODO:
  flip?: boolean;
  closeOnSelect?: boolean;
  closeOnBlur?: boolean;
  /**
   * boundary
   * Description: The boundary area for the popper. Used within the preventOverflow modifier
   * Type: HTMLElement | "clippingParents" | "scrollParent"
   * Default: "clippingParents"
   */
}

const Menu = ({
  // triggerAction = 'click',
  autoFocus = false,
  children,
  defaultOpen,
  id = 'ref:menu-id',
  matchWidth = true,
  offsetX,
  offsetY = 10,
  onClose,
  onOpen,
  open,
  originElement,
  paperProps,
  placement = 'bottom-start',
  popoverProps,
  portal = false,
  trigger,
}: MenuProps) => {
  // Saves ref to the state in order to catch the un/mounting
  const [triggerNode, setTriggerNode] =
    React.useState<HTMLElement | null>(null);

  /**
   *
   */
  const [autoFocusIndex, setAutofocusIndex] =
    React.useState<Optional<number>>();

  const { setState: setIsOpen, state: isOpen } = useControlledState({
    controlled: open,
    // shouldn't be undefined because goes as controlled state in popper
    default: !!defaultOpen,
  });

  /**
   * Opens menu
   */

  const openMenu = (options?: { focusIndex?: number }) => {
    if (isOpen) return;
    if (isNumber(options?.focusIndex)) {
      setAutofocusIndex(options?.focusIndex);
    }
    /**
     * Save the focus when List appears in order to restore when it disappears
     */
    DOMFocus.save();
    setIsOpen(true);
    onOpen?.();
  };

  /**
   * Closes menu
   */
  const closeMenu = React.useCallback(() => {
    if (!isOpen) return;
    DOMFocus.restore();
    setIsOpen(false);
    setAutofocusIndex(undefined);
    onClose?.();
  }, [onClose, setAutofocusIndex, setIsOpen, isOpen]);

  /**
   * Popover property
   */
  const handleClickAway = React.useCallback(() => {
    if (isOpen) closeMenu();
  }, [closeMenu, isOpen]);

  const openWithTheFirstFocused = () => {
    openMenu({ focusIndex: 0 });
  };

  const openWithTheLastFocused = () => {
    openMenu({ focusIndex: -1 });
  };

  const handleClick = () => {
    if (isOpen) {
      closeMenu();
    } else {
      openWithTheFirstFocused();
    }
  };

  const handleTriggerKeyDown = createKeyboardHandler({
    beforeAll: cancelEvent,
    onEnter: openWithTheFirstFocused,
    onSpace: openWithTheFirstFocused,
    onArrowDown: openWithTheFirstFocused,
    onArrowUp: openWithTheLastFocused,
  });

  // TODO: rerenders twice
  console.log('$$ Menu: updated $$');

  return (
    <>
      <MergeProps
        aria-controls={id}
        aria-expanded={isOpen}
        aria-haspopup="menu"
        onClick={handleClick}
        onKeyDown={handleTriggerKeyDown}
        ref={setTriggerNode}
        tabIndex={0}
      >
        {isFunction(trigger) ? trigger.call(null, { isOpen }) : trigger}
      </MergeProps>
      <Popover
        matchWidth={matchWidth}
        placement={placement}
        disablePortal={!portal}
        offsetX={offsetX}
        offsetY={offsetY}
        {...popoverProps}
        originElement={originElement || triggerNode}
        onClickAway={handleClickAway}
        open={isOpen}
        paperProps={paperProps}
        onOpen={openMenu}
        onClose={closeMenu}
      >
        <MenuList
          id={id}
          // className={isLazy ? '' : 'hidden'}
          autofocus={autoFocus}
          autoFocusIndex={autoFocusIndex}
          onCloseRequest={closeMenu}
        >
          {children}
        </MenuList>
      </Popover>
    </>
  );
};

export default Menu;
