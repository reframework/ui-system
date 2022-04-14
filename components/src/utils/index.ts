import React from 'react';

type Optional<T> = T | undefined;

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

export const useAutoFocus = (hasFocus: boolean, node?: HTMLElement | null) => {
  React.useEffect(() => {
    if (hasFocus && node) node.focus?.();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};

export const useAriaActiveDescendant = () => {
  const [activeDescendant, setActiveDescendant] =
    React.useState<string | undefined>();

  const onFocus = React.useCallback(({ target }: React.FocusEvent) => {
    setActiveDescendant((target as HTMLElement).id);
  }, []);

  const onBlur = React.useCallback(() => {
    setActiveDescendant(undefined);
  }, []);

  return {
    activeDescendant,
    onFocus,
    onBlur,
  };
};

// eslint-disable-next-line @typescript-eslint/ban-types
export const isFunction = <T extends Function>(f: unknown): f is T =>
  typeof f === 'function';

export const isNumber = (value: unknown): value is number =>
  typeof value === 'number';

export const isArray = <T>(value: unknown): value is T[] => {
  return Array.isArray(value);
};

export const isString = (value: unknown): value is string => {
  return typeof value === 'string';
};

export const lastOf = <T>(arr: T[]): Optional<T> => {
  return arr[arr.length - 1];
};

export const firstOf = <T>(arr: T[]): Optional<T> => {
  return arr[0];
};

export const nextOf = <T>(arr: T[], idx: number): Optional<T> => {
  return arr[idx + 1];
};

export const previousOf = <T>(arr: T[], idx: number): Optional<T> => {
  return arr[idx - 1];
};

export const useMutableState = <T extends object>(
  defaultState: T = {} as T,
) => {
  const [, forceUpdate] = React.useReducer(() => ({}), {});
  const state = React.useRef(defaultState);

  return {
    get: () => {
      return state.current;
    },
    set: (next: T) => {
      Object.assign(state.current, next);
    },
    commit: () => {
      forceUpdate();
    },
  };
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
