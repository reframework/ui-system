import React from 'react';
import { isFunction } from '../utils';

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

export const forkRef = (
  parentRef: React.MutableRefObject<any>,
  childRef: React.MutableRefObject<any>,
) => {
  // TODO: handle callback ref
  return (refValue: any) => {
    setRef(parentRef, refValue);
    setRef(childRef, refValue);
  };
};

// https://github.com/facebook/react/issues/8873#issuecomment-275423780
export const cloneChildRef = (
  child: React.ReactElement & { ref?: React.Ref<any> },
  ref?: React.Ref<any>,
) => {
  // If no refs then empty
  if (!child?.ref && !ref) {
    return {};
  }

  // If only one exist then that one
  if (!child?.ref || !ref) {
    return { ref: child.ref || ref };
  }

  // Merges both refs
  return {
    ref: forkRef(ref, child.ref),
  };
};

export const useMergeRef = (refA: React.Ref<any>, refB?: React.Ref<any>) => {
  // useCallback! todo: add why useCallback is required here
  const mergeRefs = React.useCallback(
    (value: React.Ref<any>) => {
      setRef(refA, value);
      setRef(refB, value);
    },
    [refA, refB],
  );

  // If no refs then empty
  if (!refA && !refB) return;

  // If only one exist then that one
  if (!refA || !refB) {
    return refA || refB;
  }

  // Merges both refs
  return mergeRefs;
};
