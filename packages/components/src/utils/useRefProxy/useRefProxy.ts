import { useRef } from 'react';

const useRefProxy = <T>(value: T) => {
  const ref = useRef(value);

  return ref;
};

export default useRefProxy;
