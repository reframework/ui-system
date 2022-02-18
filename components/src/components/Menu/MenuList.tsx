import React from 'react';
import { getClassName } from '@reframework/classnames';
import { createContext } from '../../utils/context';
import Paper, { PaperProps } from '../Paper/Paper';
import { useActiveDescendant, useFocusManager } from './useActiveDescendant';
import {
  cancelEvent,
  createKeyboardHandler,
  getActiveEl,
  getEnabledItems,
} from './utils';
import styles from './MenuList.css?module';

export const [DescendantProvider, useDescendantContext] = createContext();

export const MenuList: React.FC<{
  paperProps?: PaperProps;
  onKeyDown: (e: React.KeyboardEvent) => void;
  onMouseLeave: (e: React.MouseEvent) => void;
}> = ({ children, paperProps, onKeyDown, onMouseLeave }) => {
  const paperRef = React.useRef<HTMLDivElement | null>(null);
  const [activeDescendant, focus] = useActiveDescendant();
  const focusManager = useFocusManager();

  const keyboardHandler = createKeyboardHandler({
    onArrowDown: cancelEvent(() => {
      focus.setNext(
        getEnabledItems(paperRef.current),
        getActiveEl(paperRef.current)
      );
    }),
    onArrowUp: cancelEvent(() => {
      focus.setPrevious(
        getEnabledItems(paperRef.current),
        getActiveEl(paperRef.current)
      );
    }),
    onArrowLeft: cancelEvent(() => {
      focus.setFirst(getEnabledItems(paperRef.current));
    }),
    onArrowRight: cancelEvent(() => {
      focus.setLast(getEnabledItems(paperRef.current));
    }),
    onHome: cancelEvent(() => {
      focus.setFirst(getEnabledItems(paperRef.current));
    }),
    onEnd: cancelEvent(() => {
      focus.setLast(getEnabledItems(paperRef.current));
    }),
  });

  const handleKeyDown = (event: React.KeyboardEvent) => {
    onKeyDown?.(event);
    keyboardHandler(event);
  };

  React.useEffect(() => {
    if (!paperRef.current) return;

    if (!activeDescendant) {
      focusManager.saveFocus();
      focus.setFirst(getEnabledItems(paperRef.current));
    }
  }, [activeDescendant]);

  React.useEffect(() => {
    return () => {
      focus.reset();
      focusManager.restoreFocus();
    };
  }, []);

  const paperClassName = getClassName({
    [styles.paper]: true,
    [paperProps?.className!]: Boolean(paperProps?.className),
  });

  return (
    <DescendantProvider value={{ activeDescendant }}>
      <Paper
        id="my-menu"
        levitation={3}
        {...paperProps}
        aria-orientation="vertical"
        className={paperClassName}
        onKeyDown={handleKeyDown}
        onMouseLeave={onMouseLeave}
        ref={paperRef}
        role="menu"
      >
        {children}
      </Paper>
    </DescendantProvider>
  );
};
