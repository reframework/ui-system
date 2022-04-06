import React from 'react';

// eslint-disable-next-line @typescript-eslint/no-empty-function
const noOp = () => {};

/**
 * TODO: add description
 */
const useControlledState = <T>(params: { controlled: T; default: T }) => {
  const { controlled, default: _default } = params;

  // isControlled should never change
  const { current: isControlled } = React.useRef(
    params.controlled !== undefined,
  );

  const [uncontrolled, setUncontrolled] = React.useState(_default);

  return {
    isControlled,
    setState: isControlled ? noOp : setUncontrolled,
    state: (isControlled ? controlled : uncontrolled) as NonNullable<T>,
  };
};

export default useControlledState;
