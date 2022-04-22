import React from 'react';
import { isNumber } from '@utils/index';
import { useKeyboardHandler } from '@utils/useKeyboardHandler';
import { getClassName } from '@reframework/classnames';
import { useActiveDescendant } from '@utils/useActiveDescendant';
import { DOMFocus } from '@utils/focus';
import { DescendantProvider } from './Context';
import './List.css';

enum ListClassName {
  list = 'ref:menu-list',
  visuallyHidden = 'ref:menu-list-hidden',
}

const manageFocusOnChange = (
  prev: HTMLElement | null,
  next: HTMLElement | null,
) => {
  if (prev) {
    prev.tabIndex = -1;
  }

  if (next) {
    next.tabIndex = 0;
    DOMFocus.set(next);
  }
};

export interface UseListProps extends React.HTMLProps<HTMLUListElement> {
  // Default: false
  // If true, will focus the [role="menu"] container and move into tab order.
  autoFocus?: boolean;
  autoFocusItem?: number;
  isItemFocusable?: (node: HTMLElement) => boolean;
  onActiveItemChange?: (
    prev: HTMLElement | null,
    next: HTMLElement | null,
    // action: ActiveDescendantAction,
  ) => void;
  // ul props;
  className?: string;
  onKeyDown?: (event: React.KeyboardEvent) => void;
  tabIndex?: number;
  id?: string;
}

export const useList = ({
  autoFocus,
  autoFocusItem,
  onKeyDown,
  isItemFocusable,
  onActiveItemChange = manageFocusOnChange,
  // ul props
  tabIndex = -1,
  role = 'listbox',
  className,
  ...props
}: UseListProps) => {
  const ref = React.useRef<HTMLUListElement | null>(null);

  const activeItem = useActiveDescendant({
    listRef: ref,
    filterElement: isItemFocusable,
    onChange: onActiveItemChange,
  });

  const handleKeyDown = useKeyboardHandler({
    before: onKeyDown,
    onArrowDown: activeItem.setNext,
    onArrowUp: activeItem.setPrevious,
    onHome: activeItem.setFirst,
    onEnd: activeItem.setLast,
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
      if (autoFocus) DOMFocus.set(ref.current);
      return;
    }

    activeItem.setByIndex(autoFocusItem);
    // Mount only
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  React.useEffect(() => {
    // cleanup
    return () => {
      activeItem.reset();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const classNames = getClassName({
    [ListClassName.list]: true,
    [className!]: !!className,
  });

  return {
    activeItem,
    Provider: DescendantProvider,
    providerProps: {
      value: {
        activeDescendant: activeItem,
      },
    },
    listProps: {
      role,
      tabIndex,
      onKeyDown: handleKeyDown,
      ['aria-orientation']: 'vertical' as const,
      ...props,
      className: classNames,
      ref,
    },
  };
};
