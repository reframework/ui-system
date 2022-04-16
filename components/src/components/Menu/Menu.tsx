import React from 'react';
import { PaperProps } from '@components/Paper';
import { isFunction, isNumber, cancelEvent } from '@utils/index';
import { Popover, PopoverProps } from '@components/Popover';
import useControlledState from '@utils/useControlledState';
import { createKeyboardHandler } from '@utils/Keyboard';
import { MergeProps } from '@wip/MergeProps';
import { Optional } from '@wip/Combobox/types';
import MenuList from './MenuList';

type Action = 'click' | 'hover';

export interface MenuProps {
  autoFocus?: boolean;
  children: React.ReactNode;
  defaultOpen?: boolean;
  id?: string;
  matchWidth?: PopoverProps['matchOriginWidth'];
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

  const [autoFocusIndex, setAutofocusIndex] =
    React.useState<Optional<number>>();

  const {
    isControlled: isOpenControlled,
    setState: setIsOpen,
    state: isOpen,
  } = useControlledState({
    controlled: open,
    default: defaultOpen,
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

  const openWithTheFirstFocused = () => {
    openMenu({ focusIndex: 0 });
  };

  const openWithTheLastFocused = () => {
    openMenu({ focusIndex: -1 });
  };

  const handleTriggerKeyDown = createKeyboardHandler({
    beforeAll: cancelEvent,
    onEnter: openWithTheFirstFocused,
    onSpace: openWithTheFirstFocused,
    onArrowDown: openWithTheFirstFocused,
    onArrowUp: openWithTheLastFocused,
  });

  React.useEffect(() => {
    if (isOpenControlled) return;
    setIsOpen(open);
  }, [open, isOpenControlled, setIsOpen]);
  /**
   * Autofocus handling
   */
  React.useEffect(() => {
    if (autoFocus && triggerNode) {
      triggerNode.focus();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [triggerNode]);

  console.log('$$ Menu: updated $$');

  return (
    <>
      <MergeProps
        onClick={openMenu}
        aria-controls={id}
        aria-expanded={isOpen}
        aria-haspopup={true}
        onKeyDown={handleTriggerKeyDown}
        ref={setTriggerNode}
        tabIndex={0}
      >
        {isFunction(trigger) ? trigger.call(null, { isOpen }) : trigger}
      </MergeProps>
      <Popover
        matchOriginWidth={matchWidth}
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
