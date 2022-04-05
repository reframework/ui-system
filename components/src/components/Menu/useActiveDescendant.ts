import React, { useMemo, useState, useRef, useCallback } from 'react';
import { firstOf, lastOf, nextOf, previousOf } from '../../utils';
import { createContext } from '../../utils/context';
import { Optional } from '../Combobox/types';
import { focus } from './utils';

export const [DescendantProvider, useDescendantContext] =
  createContext<{ activeDescendant: any }>();

export const createDescendantManager = (
  node: any,
  setNode: (node: any) => void,
) => {
  return {
    reset: () => {
      setNode(undefined);
    },
    get: () => {
      return node;
    },
    set: (current: {}) => {
      setNode(current);
    },
    setByIndex: (list: any[], index: number) => {
      const node = index >= 0 ? list[index] : list[list.length + index];
      if (node) setNode(node);
    },
    setFirst: (list: any[]) => {
      setNode(firstOf(list));
    },
    setLast: (list: any[]) => {
      setNode(lastOf(list));
    },
    setNext: (list: any[], current?: any) => {
      const idx = list.indexOf(current!);
      setNode(nextOf(list, idx) || firstOf(list));
    },
    setPrevious: (list: any[], current?: any) => {
      const idx = list.indexOf(current!);
      setNode(previousOf(list, idx) || lastOf(list));
    },
  };
};

export const DescendantUtils = {
  getByIndex: (list: Element[], index: number) => {
    return index >= 0 ? list[index] : list[list.length + index];
  },
  getFirst: (list: Element[]) => {
    return firstOf(list);
  },
  getLast: (list: Element[]) => {
    return lastOf(list);
  },
  getNext: (list: Element[], current?: Element) => {
    const idx = list.indexOf(current!);
    return nextOf(list, idx) || firstOf(list);
  },
  getPrevious: (list: Element[], current?: Element) => {
    const idx = list.indexOf(current!);
    return previousOf(list, idx) || lastOf(list);
  },
};

export const useActiveDescendant = () => {
  const [node, setNode] = useState<Optional<any>>();

  return useMemo(() => {
    return createDescendantManager(node, setNode);
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
      focus(savedFocus.current);
    },
  };
};

export const useDOMFocus = () => {
  const savedFocus = React.useRef<HTMLElement | null>(null);

  return {
    set: (node: HTMLElement) => {
      node?.focus();
    },
    save: () => {
      savedFocus.current = document.activeElement as HTMLElement;
    },
    restore: () => {
      if (!document.contains(savedFocus.current)) return;
      focus(savedFocus.current);
    },
  };
};
