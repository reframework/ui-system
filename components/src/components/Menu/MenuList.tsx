import React from 'react';
import { isNumber, preventDefault } from '@utils/index';
import { createKeyboardHandler } from '@utils/Keyboard';
import { getClassName } from '@reframework/classnames';
import { useActiveDescendant } from '@utils/descendant';
import { DOMFocus } from '@utils/focus';
import { stopPropagation } from '@utils/domUtils';
import { DescendantProvider, useMenuContext } from './Context';
import './MenuList.css';

enum MenuListClassName {
  list = 'ref:menu-list',
}

export const getEnabledItems = (node: HTMLElement | null) => {
  // todo: add roles menuitemcheckbox, menuitemchecoption
  return Array.from(
    node?.querySelectorAll?.('[role="menuitem"]:not([aria-disabled="true"])') ||
      [],
  );
};

export interface MenuListProps {
  autoFocusIndex?: number;
  children: React.ReactNode;
  id?: string;
  // onMouseLeave: (e: React.MouseEvent) => void;
  tabIndex?: number;
}

const MenuList: React.FC<MenuListProps> = ({
  autoFocusIndex,
  children,
  id,
  // onMouseLeave,
  tabIndex,
}) => {
  const listRef = React.useRef<HTMLUListElement | null>(null);
  const ActiveDescendant = useActiveDescendant();
  const { close } = useMenuContext();

  const handleKeyDown = createKeyboardHandler({
    beforeAll: (event) => {
      preventDefault(event);
      stopPropagation(event);
    },
    onArrowDown: () => {
      ActiveDescendant.setNext(
        getEnabledItems(listRef.current),
        ActiveDescendant.current,
      );
    },
    onArrowUp: () => {
      ActiveDescendant.setPrevious(
        getEnabledItems(listRef.current),
        ActiveDescendant.current,
      );
    },
    onArrowLeft: () => {
      ActiveDescendant.setFirst(getEnabledItems(listRef.current));
    },
    onArrowRight: () => {
      ActiveDescendant.setLast(getEnabledItems(listRef.current));
    },
    onHome: () => {
      ActiveDescendant.setFirst(getEnabledItems(listRef.current));
    },
    onEnd: () => {
      ActiveDescendant.setLast(getEnabledItems(listRef.current));
    },
    onSpace: () => {
      ActiveDescendant.current?.click();
    },
    onEnter: () => {
      ActiveDescendant.current?.click();
    },
    onEscape: close,
    onTab: close,
  });

  React.useEffect(() => {
    // Pedantic typescript
    if (!listRef.current) {
      return;
    }

    // The case when autoFocus is set on the item
    if (listRef.current.contains(document.activeElement)) {
      return;
    }

    // The case when autoFocus should appear on the list
    if (!isNumber(autoFocusIndex)) {
      DOMFocus.set(listRef.current);
      return;
    }

    if (!ActiveDescendant.current) {
      DOMFocus.save();
      ActiveDescendant.setByIndex(
        getEnabledItems(listRef.current),
        autoFocusIndex,
      );
      return;
    }
    // Mount only
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Restores document focus if component is destroyed
  React.useEffect(() => {
    // restore the focus after closing menu
    return () => {
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
        activeDescendant: ActiveDescendant.current,
      }}
    >
      <ul
        id={id}
        aria-orientation="vertical"
        className={listClassName}
        onKeyDown={handleKeyDown}
        // onMouseLeave={onMouseLeave}
        ref={listRef}
        role="menu"
        tabIndex={tabIndex || -1}
      >
        {children}
      </ul>
    </DescendantProvider>
  );
};

export default MenuList;
