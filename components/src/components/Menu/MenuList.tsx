import React from 'react';
import {
  cancelEvent,
  firstOf,
  getFirstMatchingItem,
  isNumber,
  nextOf,
} from '@utils/index';
import { useKeyboardHandler } from '@utils/useKeyboardHandler';
import { getClassName } from '@reframework/classnames';
import { useActiveDescendant } from '@utils/useActiveDescendant';
import { DOMFocus } from '@utils/focus';
import { DescendantProvider } from './Context';
import './MenuList.css';

enum MenuListClassName {
  list = 'ref:menu-list',
  visuallyHidden = 'ref:menu-list-hidden',
}

const manageFocusOnChange = (
  prev: HTMLElement | null,
  next: HTMLElement | null,
) => {
  console.log(prev, prev?.tabIndex, '123');
  if (prev) {
    prev.tabIndex = -1;
  }

  if (next) {
    next.tabIndex = 0;
    DOMFocus.set(next);
  }
};

export interface MenuListProps {
  // Default: false
  // If true, will focus the [role="menu"] container and move into tab order.
  autofocus?: boolean;
  autoFocusIndex?: number;
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
  autoFocusIndex,
  children,
  onCloseRequest,
  id,
  // onMouseLeave,
  disabledItemsFocusable,
  tabIndex,
}) => {
  const active = true;

  const listRef = React.useRef<HTMLUListElement | null>(null);

  const isItemFocusable = (node: Element | null | undefined) => {
    if (disabledItemsFocusable) return true;
    return node?.getAttribute('aria-disabled') !== 'true';
  };

  const ActiveDescendant = useActiveDescendant({
    listRef,
    filterElement: isItemFocusable,
    onChange: manageFocusOnChange,
  });

  const handleKeyDown = useKeyboardHandler({
    beforeAll: cancelEvent,
    onArrowDown: ActiveDescendant.setNext,
    onArrowUp: ActiveDescendant.setPrevious,
    onArrowLeft: ActiveDescendant.setFirst,
    onArrowRight: ActiveDescendant.setLast,
    onHome: ActiveDescendant.setFirst,
    onEnd: ActiveDescendant.setLast,
    onSpace: () => ActiveDescendant.current?.click?.(),
    onEnter: () => ActiveDescendant.current?.click?.(),
    onPrintableCharacter: (event) => {
      if (!listRef.current) return;
      // Items which are matching the event.key
      const items = Array.from(
        listRef.current.querySelectorAll('[role="menuitem"]'),
      ).filter(isItemFocusable);

      const nextItem = getFirstMatchingItem({
        list: items as HTMLElement[],
        current: ActiveDescendant.current,
        searchString: event.key,
      });

      ActiveDescendant.set(nextItem as HTMLElement);
    },
    onEscape: onCloseRequest,
    onTab: onCloseRequest,
  });

  React.useLayoutEffect(() => {
    // Pedantic typescript
    if (!listRef.current) {
      return;
    }

    if (ActiveDescendant.current) {
      /**
       * When active descendent already exist
       * means that some of item is already focused
       */
      return;
    }

    // The case when autoFocus should appear on the list
    if (!isNumber(autoFocusIndex)) {
      DOMFocus.set(listRef.current);
      return;
    }

    ActiveDescendant.setByIndex(autoFocusIndex);
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
        activeDescendant: ActiveDescendant,
        onCloseRequest,
      }}
    >
      <ul
        aria-hidden={!active}
        aria-orientation="vertical"
        className={listClassName}
        id={id}
        onKeyDown={handleKeyDown}
        ref={listRef}
        role="menu"
        tabIndex={active ? tabIndex || 0 : -1}
      >
        {children}
      </ul>
    </DescendantProvider>
  );
};

export default MenuList;
