import React from 'react';

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
