import React from 'react';

export type Optional<T> = T | undefined;

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
  const noOp = React.useCallback(() => {}, []) as typeof setUncontrolled;

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

export const pipeEventHandlers =
  <TEvent extends {}>(...handlers: ((e: TEvent) => void)[]) =>
  (e: TEvent) => {
    handlers.forEach((handler) => {
      if (!typeOf.function(handler)) return;
      handler(e);
    });
  };

export const typeOf = {
  function: <T extends Function>(f: unknown): f is T => typeof f === 'function',
};

export const isFunction = <T extends Function>(f: unknown): f is T =>
  typeof f === 'function';
