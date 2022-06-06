import { useRef } from 'react';

const useDynamicRef = <T>(value: T) => {
  const ref = useRef(value);

  if (ref.current !== value) {
    ref.current = value;
  }

  return ref;
};

export default useDynamicRef;
