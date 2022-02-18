import { isFunction } from '../utils';

function setRef<T>(
  ref:
    | React.MutableRefObject<T | null>
    | ((instance: T | null) => void)
    | null
    | undefined,
  value: T | null
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
  childRef: React.MutableRefObject<any>
) => {
  // TODO: handle callback ref
  return (refValue: any) => {
    setRef(parentRef, refValue);
    setRef(childRef, refValue);
  };
};

// https://github.com/facebook/react/issues/8873#issuecomment-275423780
export const cloneChildRef = (
  child: React.ReactElement & { ref?: any },
  ref: any
) => {
  if (!ref) return {};

  return {
    ref: forkRef(ref, child.ref),
  };
};
