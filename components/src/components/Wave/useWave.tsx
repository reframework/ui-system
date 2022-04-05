import { MutableRefObject, useRef, useEffect } from 'react';
import wave from './Wave.css';

enum WaveClassName {
  active = 'ref:wave-active',
}

export const useWave = (ref: MutableRefObject<HTMLElement | null>) => {
  const timeout = useRef<number>();

  useEffect(() => {
    const { current: node } = ref;
    if (!node) return;

    const handleClick = () => {
      if (!ref.current) return;
      // Doesn't remove a className
      clearTimeout(timeout.current);

      node.classList.add(WaveClassName.active);
      // Forces to restart animation
      node.style.setProperty('--wave', 'none');

      window.setTimeout(() => {
        if (!ref.current) return;
        // Restarts animation
        node.style.setProperty('--wave', '');
      }, 0);

      timeout.current = window.setTimeout(() => {
        if (!ref.current) return;
        // Removes animation
        node.classList.remove(wave.active);
      }, 1000);
    };

    node.addEventListener('click', handleClick);
    // remove listener
    return () => {
      if (!node) return;
      node.removeEventListener('click', handleClick);
    };
  }, [ref]);
};
