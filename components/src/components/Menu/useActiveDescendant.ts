import React, { useMemo, useState } from 'react';
import { firstOf, lastOf, nextOf, previousOf } from '../../utils';
import { createContext } from '../../utils/context';
import { Optional } from '../Combobox/types';

export const [DescendantProvider, useDescendantContext] =
  createContext<{ activeDescendant: any }>();

export const useActiveDescendant = () => {
  const [node, setNode] = useState<Optional<any>>();

  const reset = () => {
    setNode(undefined);
  };

  const set = (current: {}) => {
    setNode(current);
  };

  const setByIndex = (list: any[], index: number) => {
    const node = index >= 0 ? list[index] : list[list.length + index];
    if (node) setNode(node);
  };

  const setFirst = (list: any[]) => {
    setNode(firstOf(list));
  };

  const setLast = (list: any[]) => {
    setNode(lastOf(list));
  };

  const setNext = (list: any[], current?: any) => {
    const idx = list.indexOf(current!);
    setNode(nextOf(list, idx) || firstOf(list));
  };

  const setPrevious = (list: any[], current?: any) => {
    const idx = list.indexOf(current!);
    setNode(previousOf(list, idx) || lastOf(list));
  };

  return useMemo(() => {
    return {
      get node() {
        return node;
      },
      reset,
      set,
      setByIndex,
      setFirst,
      setLast,
      setNext,
      setPrevious,
    };
  }, [node]);
};

export const useFocusManager = () => {
  const savedFocus = React.useRef<HTMLElement | null>(null);

  return {
    saveFocus: () => {
      savedFocus.current = document.activeElement as HTMLElement;
    },
    restoreFocus: () => {
      if (!document.contains(savedFocus.current)) return;
      savedFocus.current?.focus();
    },
  };
};
