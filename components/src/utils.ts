import React from 'react';

type Optional<T> = T | undefined;

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

export const useControlledState = <T>(params: {
  controlled: T;
  default: NonNullable<T>;
}) => {
  const { controlled, default: _default } = params;

  // isControlled should never change
  const { current: isControlled } = React.useRef(
    params.controlled !== undefined,
  );

  const [uncontrolled, setUncontrolled] = React.useState(_default);
  const noOp = React.useCallback(() =>
    // todo: fire callback
    {
      // eslint :)
    }, []) as typeof setUncontrolled;

  return isControlled
    ? ([controlled as NonNullable<T>, noOp] as const)
    : ([uncontrolled, setUncontrolled] as const);
};

export const useControlledStateV2 = <T>(params: {
  controlled: T;
  default: T;
}) => {
  const { controlled, default: _default } = params;

  // isControlled should never change
  const { current: isControlled } = React.useRef(
    params.controlled !== undefined,
  );

  const [uncontrolled, setUncontrolled] = React.useState(_default);

  // TODO: move outside the hook
  const noOp = React.useCallback(() => {
    // eslint :)
  }, []) as typeof setUncontrolled;

  return {
    isControlled,
    setState: isControlled ? noOp : setUncontrolled,
    state: isControlled ? controlled : uncontrolled,
  };
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
