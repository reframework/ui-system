import React from 'react';
import { getClassName } from '@reframework/classnames';
import {
  DescendantProvider,
  useActiveDescendant,
  useFocusManager,
} from './useActiveDescendant';
import {
  cancelEvent,
  createKeyboardHandler,
  focus,
  getActiveEl,
  getEnabledItems,
} from './utils';
import styles from './MenuList.module.css?module';
import { isNumber } from '../../utils';

interface MenuListProps {
  autoFocusIndex?: number;
  children: React.ReactNode;
  id?: string;
  onKeyDown: (e: React.KeyboardEvent) => void;
  onMouseLeave: (e: React.MouseEvent) => void;
  tabIndex?: number;
}

export const MenuList: React.FC<MenuListProps> = ({
  autoFocusIndex,
  children,
  id,
  onKeyDown,
  onMouseLeave,
  tabIndex,
}) => {
  const listRef = React.useRef<HTMLUListElement | null>(null);
  const ActiveDescendant = useActiveDescendant();
  const focusManager = useFocusManager();

  const { node: activeDescendant } = ActiveDescendant;

  const keyboardHandler = createKeyboardHandler({
    onArrowDown: cancelEvent(() => {
      ActiveDescendant.setNext(
        getEnabledItems(listRef.current),
        getActiveEl(listRef.current)
      );
    }),
    onArrowUp: cancelEvent(() => {
      ActiveDescendant.setPrevious(
        getEnabledItems(listRef.current),
        getActiveEl(listRef.current)
      );
    }),
    onArrowLeft: cancelEvent(() => {
      ActiveDescendant.setFirst(getEnabledItems(listRef.current));
    }),
    onArrowRight: cancelEvent(() => {
      ActiveDescendant.setLast(getEnabledItems(listRef.current));
    }),
    onHome: cancelEvent(() => {
      ActiveDescendant.setFirst(getEnabledItems(listRef.current));
    }),
    onEnd: cancelEvent(() => {
      ActiveDescendant.setLast(getEnabledItems(listRef.current));
    }),
  });

  const handleKeyDown = (event: React.KeyboardEvent) => {
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
      focus(listRef.current);
      return;
    }

    if (!activeDescendant) {
      focusManager.saveFocus();
      ActiveDescendant.setByIndex(
        getEnabledItems(listRef.current),
        autoFocusIndex
      );
      return;
    }
  }, []);

  React.useEffect(() => {
    return () => {
      ActiveDescendant.reset();
      focusManager.restoreFocus();
    };
  }, []);

  const listClassName = getClassName({
    [styles.list]: true,
  });

  return (
    <DescendantProvider value={{ activeDescendant }}>
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
