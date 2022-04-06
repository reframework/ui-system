import { firstOf, lastOf, nextOf, previousOf } from '@utils/index';
import React from 'react';

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
  const [node, setNode] = React.useState<HTMLElement | undefined>();

  const reset = () => {
    setNode(undefined);
  };

  const set = (current: HTMLElement) => {
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

  return {
    current: node,
    reset,
    set,
    setByIndex,
    setFirst,
    setLast,
    setNext,
    setPrevious,
  };
};
