import React from 'react';
import { cancelEvent, getFirstMatchingItem } from '@utils/index';
import { Space, useKeyboardHandler } from '@utils/useKeyboardHandler';
import { getClassName } from '@reframework/classnames';
import {
  manageFocusOnChange,
  useActiveDescendant,
  DescendantProvider,
} from '@utils/useActiveDescendant';
import { DOMFocus } from '@utils/focus';
import { isNumber } from '@utils/assert';
import './MenuList.css';

enum MenuListClassName {
  list = 'ref:menu-list',
  visuallyHidden = 'ref:menu-list-hidden',
}

export interface MenuListProps {
  // Default: false
  // If true, will focus the [role="menu"] container and move into tab order.
  autofocus?: boolean;
  autoFocusItem?: number;
  children: React.ReactNode;
  id?: string;
  // onMouseLeave: (e: React.MouseEvent) => void;
  tabIndex?: number;
  // Default:false
  // If true, will allow focus on disabled items.
  disabledItemsFocusable?: boolean;
  /**
   * @private
   * a `close` method provided by Menu component,
   * could be used without Menu to handle clicking the item
   */
  onCloseRequest?: () => void;
}

const MenuList: React.FC<MenuListProps> = ({
  autoFocusItem,
  children,
  onCloseRequest,
  id,
  // onMouseLeave,
  disabledItemsFocusable,
  tabIndex,
}) => {
  const active = true;

  const ref = React.useRef<HTMLUListElement | null>(null);

  const isItemFocusable = (node: Element | null | undefined) => {
    if (disabledItemsFocusable) return true;
    return node?.getAttribute('aria-disabled') !== 'true';
  };

  const activeItem = useActiveDescendant({
    parentRef: ref,
    filterElement: isItemFocusable,
    onChange: manageFocusOnChange,
  });

  const handleKeyDown = useKeyboardHandler({
    onArrowDown: (event) => {
      cancelEvent(event);
      activeItem.setNext();
    },
    onArrowUp: (event) => {
      cancelEvent(event);
      activeItem.setPrevious();
    },
    onArrowLeft: (event) => {
      cancelEvent(event);
      activeItem.setFirst();
    },
    onArrowRight: (event) => {
      cancelEvent(event);
      activeItem.setLast();
    },
    onHome: (event) => {
      cancelEvent(event);
      activeItem.setFirst();
    },
    onEnd: (event) => {
      cancelEvent(event);
      activeItem.setLast();
    },
    onEnter: (event) => {
      cancelEvent(event);
      activeItem.current?.click?.();
    },
    onPrintableCharacter: (event) => {
      cancelEvent(event);

      if (event.key === Space) {
        activeItem.current?.click?.();
      }

      if (!ref.current) return;
      // Items which are matching the event.key
      const items = Array.from(
        ref.current.querySelectorAll('[role="menuitem"]'),
      ).filter(isItemFocusable);

      const nextItem = getFirstMatchingItem({
        list: items as HTMLElement[],
        current: activeItem.current,
        searchString: event.key,
      });

      activeItem.set(nextItem as HTMLElement);
    },
    onEscape: onCloseRequest,
  });

  React.useLayoutEffect(() => {
    // Pedantic typescript
    if (!ref.current) {
      return;
    }

    if (activeItem.current) {
      /**
       * When active descendent already exist
       * means that some of item is already focused
       */
      return;
    }

    // The case when autoFocus should appear on the list
    if (!isNumber(autoFocusItem)) {
      DOMFocus.set(ref.current);
      return;
    }

    activeItem.setByIndex(autoFocusItem);
    // Mount only
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const listClassName = getClassName({
    [MenuListClassName.list]: true,
    [MenuListClassName.visuallyHidden]: !active,
  });

  return (
    <DescendantProvider
      value={{
        activeDescendant: activeItem,
        onCloseRequest,
      }}
    >
      <ul
        aria-hidden={!active}
        aria-orientation="vertical"
        className={listClassName}
        id={id}
        onKeyDown={handleKeyDown}
        ref={ref}
        role="menu"
        tabIndex={active ? tabIndex || 0 : -1}
      >
        {children}
      </ul>
    </DescendantProvider>
  );
};

export default MenuList;
