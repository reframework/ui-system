import { firstOf, lastOf, nextOf, previousOf } from '@utils/index';
import React from 'react';

type Nullable<T> = T | null | undefined;

const siblings = (
  initialNode: Nullable<Element>,
  options?: {
    reverse: boolean;
  },
) => {
  /**
   * Edge case
   */
  if (!initialNode) {
    // An empty iterable object
    return [];
  }

  return {
    [Symbol.iterator]: () => {
      /** */
      const nextElementSelector = options?.reverse
        ? 'previousElementSibling'
        : 'nextElementSibling';

      /** */
      const startElementSelector = options?.reverse
        ? 'lastElementChild'
        : 'firstElementChild';

      let currentNode: Nullable<Element> = initialNode;

      return {
        next: () => {
          currentNode = currentNode?.[nextElementSelector];

          if (!currentNode) {
            /**
             * 1. !currentNode mean that currentNode doesn't have next|previous sibling
             * and it should take the first|last element of parent's children
             * 2. initialNode.parentElement has at least one child.
             * 3. In case when element don't have any sibling,
             * mean that current node equals initialNode.
             */
            currentNode = initialNode.parentElement?.[startElementSelector];
          }

          return {
            value: currentNode,
            /**
             * initialNode === currentNode mean that the iteration is finished,
             * so it's done.
             */
            done: initialNode === currentNode,
          };
        },
      };
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

export const useActiveDescendantV2 = (options: {
  listRef?: React.MutableRefObject<HTMLElement | null>;
  filterElement: (node: Nullable<Element>) => boolean;
}) => {
  const { filterElement, listRef } = options;
  const [node, setNode] = React.useState<HTMLElement | null>(null);

  const reset = () => {
    setNode(null);
  };

  const set = (current: HTMLElement) => {
    setNode(current);
  };

  const setNextActive = (
    node: Element | HTMLElement,
    options?: { reverse: boolean },
  ) => {
    const reverse = !!options?.reverse;
    /** Setting the (first|last) active child */
    for (const sibling of siblings(node, { reverse })) {
      if (filterElement(sibling)) {
        setNode(sibling as HTMLElement);
        return;
      }
    }
  };

  const setByIndex = (index: number) => {
    // Edge case when list is empty
    const length = listRef?.current?.children?.length;
    if (!length) return;

    let reverse = false;

    if (index < 0) {
      // -1... mean that order is back
      index = length + index;
      reverse = true;
    }

    const node = listRef?.current?.children?.[index];

    if (!node) {
      // If no node is there then sets the (first|last) available
      (reverse ? setLast : setFirst)();
      return;
    }

    if (!filterElement(node)) {
      // If a node is disabled then sets the (next|previous) active
      setNextActive(node, { reverse });
      return;
    }

    setNode(node as HTMLElement);
  };

  const setFirst = () => {
    const firstChild = listRef?.current?.firstElementChild;

    /**
     * Edge case when list is empty
     */
    if (!firstChild) return;

    if (filterElement(firstChild)) {
      setNode(firstChild as HTMLElement);
      return;
    }

    /** Setting a first active child */
    setNextActive(firstChild);
  };

  const setLast = () => {
    const lastChild = listRef?.current?.firstElementChild;

    /**
     * Edge case when list is empty
     */
    if (!lastChild) return;

    if (filterElement(lastChild)) {
      setNode(lastChild as HTMLElement);
      return;
    }

    /** Setting a first active child */
    setNextActive(lastChild, { reverse: true });
  };

  const setNext = () => {
    if (!node) {
      setFirst();
      return;
    }

    setNextActive(node);
  };

  const setPrevious = () => {
    if (!node) {
      setLast();
      return;
    }

    setNextActive(node, { reverse: true });
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
