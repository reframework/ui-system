import React from 'react';
import { Optional } from './DataEntry/Combobox/types';

export const useAutoFocus = (hasFocus: boolean, node?: HTMLElement | null) => {
  React.useEffect(() => {
    if (hasFocus && node) node.focus?.();
  }, []);
};

export const useControlledState = <T extends unknown>(params: {
  controlled: T;
  default: NonNullable<T>;
}) => {
  const { controlled, default: _default } = params;

  // isControlled should never change
  const { current: isControlled } = React.useRef(
    params.controlled !== undefined
  );

  const [uncontrolled, setUncontrolled] = React.useState(_default);
  const noOp = React.useCallback(() =>
    // todo: fire callback
    {}, []) as typeof setUncontrolled;

  return isControlled
    ? ([controlled as NonNullable<T>, noOp] as const)
    : ([uncontrolled, setUncontrolled] as const);
};

export const useControlledStateV2 = <T extends unknown>(params: {
  controlled: T;
  default: NonNullable<T>;
}) => {
  const { controlled, default: _default } = params;

  // isControlled should never change
  const { current: isControlled } = React.useRef(
    params.controlled !== undefined
  );

  const [uncontrolled, setUncontrolled] = React.useState(_default);
  const noOp = React.useCallback(() =>
    // todo: fire callback
    {}, []) as typeof setUncontrolled;

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

export const isFunction = <T extends Function>(f: unknown): f is T =>
  typeof f === 'function';

export const isNumber = (value: unknown): value is number =>
  typeof value === 'number';

export const isArray = <T extends any>(value: unknown): value is T[] => {
  return Array.isArray(value);
};

export const isString = <T extends any>(value: unknown): value is string => {
  return typeof value === 'string';
};

export const lastOf = <T extends any>(arr: T[]): Optional<T> => {
  return arr[arr.length - 1];
};

export const firstOf = <T extends any>(arr: T[]): Optional<T> => {
  return arr[0];
};

export const nextOf = <T extends any>(arr: T[], idx: number): Optional<T> => {
  return arr[idx + 1];
};

export const previousOf = <T extends any>(
  arr: T[],
  idx: number
): Optional<T> => {
  return arr[idx - 1];
};
