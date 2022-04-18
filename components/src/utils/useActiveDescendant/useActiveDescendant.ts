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

export interface ActiveDescendant {
  current: HTMLElement | null;
  reset: () => void;
  set: (next: HTMLElement) => void;
  setByIndex: (index: number) => void;
  setFirst: () => void;
  setLast: () => void;
  setNext: () => void;
  setPrevious: () => void;
}

export const useActiveDescendant = (options: {
  listRef?: React.MutableRefObject<HTMLElement | null>;
  filterElement?: (node: Nullable<Element>) => boolean;
  onChange?: (previous: HTMLElement | null, next: HTMLElement | null) => void;
}): ActiveDescendant => {
  const { filterElement = () => true, listRef, onChange } = options;
  const activeDescendant = React.useRef<HTMLElement | null>(null);

  const setNode = (next: HTMLElement | null) => {
    activeDescendant.current = next;
    onChange?.(activeDescendant.current, next);
  };

  const reset = () => {
    setNode(null);
  };

  const set = (next: HTMLElement) => {
    /**
     * Edge case, when `next` is not provided.
     * To make current `null` use `reset()` method instead of `set()`
     */
    if (!next) return;
    setNode(next);
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
    if (!activeDescendant.current) {
      setFirst();
      return;
    }

    setNextActive(activeDescendant.current);
  };

  const setPrevious = () => {
    if (!activeDescendant.current) {
      setLast();
      return;
    }

    setNextActive(activeDescendant.current, { reverse: true });
  };

  return {
    get current() {
      return activeDescendant.current;
    },
    reset,
    set,
    setByIndex,
    setFirst,
    setLast,
    setNext,
    setPrevious,
  };
};

export default useActiveDescendant;
