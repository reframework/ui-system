import React, { useEffect, useRef } from 'react';

export const useMounted = () => {
  const mounted = useRef(false);

  useEffect(() => {
    mounted.current = true;

    return () => {
      mounted.current = false;
    };
  }, []);

  return mounted.current;
};

export const useCreated = (callback: () => void) => {
  const created = useRef(false);
  if (created.current) return;
  created.current = true;
  callback();
};

export const useListener = (
  params: { event: string; listener: EventListener },
  deps: any[]
) => {
  const { event, listener } = params;
  React.useEffect(() => {
    window.addEventListener(event, listener);

    return () => {
      window.addEventListener(event, listener);
    };
  }, deps);
};
