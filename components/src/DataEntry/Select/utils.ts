import React from 'react';
import { Optional, OptionItem, SelectValue } from './types';

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

export const useAriaActiveDescendant = () => {
  const [activeDescendant, setActiveDescendant] =
    React.useState<Optional<string>>();

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

export const isArray = <T extends any>(value: unknown): value is T[] => {
  return Array.isArray(value);
};

export const isString = <T extends any>(value: unknown): value is string => {
  return typeof value === 'string';
};

export const defaultRenderValue = (value: Optional<string | string[]>) => {
  if (isArray(value)) return value.join(', ');
  if (isString(value)) return value as string;
  return '';
};

export const defaultGetOptionLabel = (opt: OptionItem) => opt.label;

export const getDefaultValue = (
  defaultValue: Optional<SelectValue>,
  multiple: boolean
) => {
  if (multiple) {
    if (isArray(defaultValue)) return defaultValue;
    if (isString(defaultValue)) return [defaultValue];
    return [];
  }

  if (isString(defaultValue)) return defaultValue;
  return '';
};

export const defaultGetOptionDisabled = (_: OptionItem) => false;

export const defaultGetOptionSelected = (
  opt: OptionItem,
  value?: SelectValue
) => {
  if (isArray(value)) {
    return value.findIndex((it) => it === opt.value) >= 0;
  }
  return value === opt.value;
};

export const defaultGetOptionFiltered = (_: OptionItem) => true;

export const defaultMatch = (optionValue: string, value: string) => {
  return new RegExp(value as string, 'ig').test(optionValue);
};

export const useAutoFocus = (hasFocus: boolean, node?: HTMLElement | null) => {
  React.useEffect(() => {
    if (hasFocus && node) node.focus?.();
  }, []);
};
