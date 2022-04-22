import React from 'react';

import { useMergedRef } from '@utils/useMergedRef';
import { useDescendantContext } from '@utils/useActiveDescendant';
import { DOMFocus } from '@utils/focus';
import { isNumber } from '@utils/index';
import { getClassName } from '@reframework/classnames';

enum ListClassName {
  list = 'ref:menu-list',
  visuallyHidden = 'ref:menu-list-hidden',
}

export interface ListProps {
  children: React.ReactNode;
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

const List = React.forwardRef<any, ListProps>(
  ({ children, autoFocus, autoFocusItem, className, ...props }, parentRef) => {
    const ref = React.useRef<HTMLUListElement | null>(null);

    const { activeDescendant: activeItem } = useDescendantContext();

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

    const mergedRef = useMergedRef(ref, parentRef);

    return (
      <ul {...props} className={classNames} ref={mergedRef}>
        {children}
      </ul>
    );
  },
);

export default List;
