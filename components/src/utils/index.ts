import { firstOf, nextOf } from '@utils/array';
import React from 'react';

export const useCreated = (callback: () => void) => {
  const created = React.useRef(false);
  if (created.current) return;
  created.current = true;
  callback();
};

export const useMounted = () => {
  const mounted = React.useRef(false);

  React.useEffect(() => {
    mounted.current = true;

    return () => {
      mounted.current = false;
    };
  }, []);

  return mounted.current;
};

export const getCSSSize = (size?: number | string, units = 'px') => {
  if (size === undefined) return;

  if (typeof size === 'number') return `${size}${units}`;

  return size;
};

export const useConst = <T>(value: T) => {
  return React.useRef<T>(value).current;
};

export const preventDefault = (event: React.SyntheticEvent) => {
  event.preventDefault();
};

export const stopPropagation = (event: React.SyntheticEvent) => {
  event.stopPropagation();
};

export const cancelEvent = (event: React.KeyboardEvent) => {
  stopPropagation(event);
  preventDefault(event);
};

export const getFirstMatchingItem = (params: {
  list: HTMLElement[];
  current: HTMLElement | null;
  searchString: string;
}) => {
  const { list, current, searchString } = params;

  const matchingItems = list.filter((node) => {
    return node?.textContent
      ?.trim()
      ?.toLowerCase()
      ?.startsWith(searchString?.toLowerCase());
  });

  if (matchingItems.length > 0) {
    const index = matchingItems.indexOf(current!);
    let nextItem = firstOf(matchingItems);

    if (index !== -1) {
      /**
       * If matched items include active descendant
       * set the next matched after current focused item
       */
      nextItem = nextOf(matchingItems, index) || nextItem;
    }

    return nextItem;
  }
};
