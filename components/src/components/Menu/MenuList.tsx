import React from 'react';
import { cancelEvent, firstOf, isNumber, nextOf } from '@utils/index';
import { useKeyboardHandler } from '@utils/useKeyboardHandler';
import { getClassName } from '@reframework/classnames';
import { useActiveDescendant } from '@utils/useActiveDescendant';
import { DOMFocus } from '@utils/focus';
import { DescendantProvider } from './Context';
import './MenuList.css';

enum MenuListClassName {
  list = 'ref:menu-list',
}

const manageFocusOnChange = (
  prev: HTMLElement | null,
  next: HTMLElement | null,
) => {
  if (prev && prev.tabIndex === 0) {
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

const isItemFocusable = (node: Element | null | undefined) =>
  node?.getAttribute('aria-disabled') !== 'true';

const MenuList: React.FC<MenuListProps> = ({
  autoFocusIndex,
  children,
  onCloseRequest,
  id,
  // onMouseLeave,
  // disabledItemsFocusable,
  tabIndex,
}) => {
  const listRef = React.useRef<HTMLUListElement | null>(null);

  const setListRef = (node: any) => {
    listRef.current = node;
  };

  const ActiveDescendant = useActiveDescendant({
    listRef,
    filterElement: isItemFocusable,
    onChange: manageFocusOnChange,
  });

  const handleFocus = ({ target, currentTarget }: React.FocusEvent) => {
    if (target === currentTarget) return;
    if (ActiveDescendant.current === target) return;
    if (!isItemFocusable(target)) return;
    ActiveDescendant.set(target as HTMLElement);
  };

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

      /**
       * Items which are matching the event.key
       */
      const matchedItems = Array.from(
        listRef.current.querySelectorAll('[role="menuitem"]'),
      ).filter((node) => {
        return (
          isItemFocusable(node) &&
          node?.textContent
            ?.trim()
            ?.toLowerCase()
            ?.startsWith(event.key?.toLowerCase())
        );
      });

      if (matchedItems.length > 0) {
        const index = matchedItems.indexOf(ActiveDescendant.current!);
        let nextItem = firstOf(matchedItems);

        if (index !== -1) {
          /**
           * If matched items include active descendant
           * set the next matched after current focused item
           */
          nextItem = nextOf(matchedItems, index) || nextItem;
        }

        ActiveDescendant.set(nextItem as HTMLElement);
      }
    },
    onEscape: onCloseRequest,
    onTab: onCloseRequest,
  });

  React.useLayoutEffect(() => {
    // Pedantic typescript
    if (!listRef.current) {
      return;
    }

    /**
     * Save the focus when List appears in order to restore when it disappears
     * */
    DOMFocus.save();

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

  // Restores document focus if component is destroyed
  React.useLayoutEffect(() => {
    // restore the focus after closing menu
    return () => {
      // TODO: reset tabIndex;
      ActiveDescendant.reset();
      DOMFocus.restore();
    };
    // Mount only
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const listClassName = getClassName({
    [MenuListClassName.list]: true,
  });

  return (
    <DescendantProvider
      value={{
        activeDescendant: ActiveDescendant,
        onCloseRequest,
      }}
    >
      <ul
        aria-orientation="vertical"
        className={listClassName}
        id={id}
        onFocus={handleFocus}
        onKeyDown={handleKeyDown}
        ref={setListRef}
        role="menu"
        tabIndex={tabIndex || -1}
      >
        {children}
      </ul>
    </DescendantProvider>
  );
};

export default MenuList;
