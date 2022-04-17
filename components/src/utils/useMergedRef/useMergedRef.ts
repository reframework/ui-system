import React from 'react';
import { isFunction } from '@utils/index';

function setRef<T>(
  ref:
    | React.MutableRefObject<T | null>
    | ((instance: T | null) => void)
    | null
    | undefined,
  value: T | null,
): void {
  if (!ref) return;

  if (isFunction(ref)) {
    ref(value);
    return;
  }

  if (!('current' in ref)) {
    console.error('Unexpected ref type');
    return;
  }

  ref.current = value;
}

/**
 * https://github.com/facebook/react/issues/8873#issuecomment-275423780
 */
const useMergedRef = (refA: React.Ref<any>, refB?: React.Ref<any>) => {
  // useCallback! todo: add why useCallback is required here
  const mergeRefs = React.useCallback(
    (value: React.Ref<any>) => {
      setRef(refA, value);
      setRef(refB, value);
    },
    [refA, refB],
  );

  // No ref to return
  if (!refA && !refB) return;

  // If only one exists then returns that one
  if (!refA || !refB) {
    return refA || refB;
  }

  return mergeRefs;
};

export default useMergedRef;
