// https://github.com/reactjs/rfcs/blob/useevent/text/0000-useevent.md
import { useDynamicRef } from '@utils/useDynamicRef';
import { useCallback } from 'react';

export default function useEvent(handler: Function) {
  const handlerRef = useDynamicRef<Function | null>(null);

  // In a real implementation, this would run before layout effects
  handlerRef.current = handler;

  return useCallback((...args) => {
    // In a real implementation, this would throw if called during render
    handlerRef.current?.(...args);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}
