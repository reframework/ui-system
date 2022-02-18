import React, { useState } from 'react';
import { firstOf, lastOf, nextOf, previousOf } from '../../utils';
import { Optional } from '../Combobox/types';

interface DescendantManager<T extends {}> {
  reset: () => {};
  set: (current: T) => {};
  setFirst: () => {};
  setLast: () => {};
  setNext: (current: T) => {};
  setPrevious: (current: T) => {};
}

export const useActiveDescendant = () => {
  const [node, setNode] = useState<Optional<any>>();

  const reset = () => {
    setNode(undefined);
  };

  const set = (current: {}) => {
    setNode(current);
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

  return [
    node,
    { set, reset, setFirst, setLast, setPrevious, setNext },
  ] as const;
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
