import React from 'react';
import { isNumber, preventDefault } from '@utils/index';
import { createKeyboardHandler } from '@utils/Keyboard';
import { getClassName } from '@reframework/classnames';
import { useActiveDescendant } from '@utils/descendant';
import { useDOMFocus } from '@utils/focus';
import { stopPropagation } from '@utils/domUtils';
import { DescendantProvider, useMenuContext } from './Context';
import './MenuList.css';

enum MenuListClassName {
  list = 'ref:menu-list',
}

const isNodeDisabled = (node: Node | HTMLElement) => {
  return (
    (node as HTMLElement).getAttribute('aria-disabled') === 'true' ||
    (node as HTMLElement).getAttribute('disabled') === 'true'
  );
};

export const getEnabledItems = (node: HTMLElement | null) => {
  // todo: add roles menuitemcheckbox, menuitemchecoption
  return Array.from(node?.querySelectorAll?.('[role="menuitem"]') || []).filter(
    (node) => !isNodeDisabled(node),
  ) as HTMLElement[];
};

export interface MenuListProps {
  autoFocusIndex?: number;
  children: React.ReactNode;
  id?: string;
  onKeyDown: (e: React.KeyboardEvent) => void;
  onMouseLeave: (e: React.MouseEvent) => void;
  tabIndex?: number;
}

const MenuList: React.FC<MenuListProps> = ({
  autoFocusIndex,
  children,
  id,
  onKeyDown,
  onMouseLeave,
  tabIndex,
}) => {
  const listRef = React.useRef<HTMLUListElement | null>(null);
  const ActiveDescendant = useActiveDescendant();
  const focus = useDOMFocus();
  const { close } = useMenuContext();

  const keyboardHandler = createKeyboardHandler({
    onArrowDown: () => {
      ActiveDescendant.setNext(
        getEnabledItems(listRef.current),
        focus.getActiveElement(),
      );
    },
    onArrowUp: () => {
      ActiveDescendant.setPrevious(
        getEnabledItems(listRef.current),
        focus.getActiveElement(),
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
      close();
    },
  });

  const handleKeyDown = (event: React.KeyboardEvent) => {
    preventDefault(event);
    stopPropagation(event);
    onKeyDown?.(event);
    keyboardHandler(event);
  };

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
      focus.set(listRef.current);
      return;
    }

    if (!ActiveDescendant.current) {
      focus.save();
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
    return () => {
      ActiveDescendant.reset();
      focus.restore();
    };
    // Mount only
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const listClassName = getClassName({
    [MenuListClassName.list]: true,
  });

  console.log(ActiveDescendant.current, 'activeDescendant');
  console.log(autoFocusIndex, 'autofocusIndex');

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
        onMouseLeave={onMouseLeave}
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
