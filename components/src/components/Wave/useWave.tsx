import { MutableRefObject, useRef, useEffect } from 'react';
import wave from './Wave.css';

enum WaveClassName {
  active = 'ref:wave-active',
}

export const useWave = (ref: MutableRefObject<HTMLElement | null>) => {
  const timeout = useRef<number>();

  useEffect(() => {
    if (!ref.current) return;

    const handleClick = () => {
      if (!ref.current) return;
      // Doesn't remove a className
      clearTimeout(timeout.current);

      ref.current.classList.add(WaveClassName.active);
      // Forces to restart animation
      ref.current.style.setProperty('--wave', 'none');

      window.setTimeout(() => {
        if (!ref.current) return;
        // Restarts animation
        ref.current.style.setProperty('--wave', '');
      }, 0);

      timeout.current = window.setTimeout(() => {
        if (!ref.current) return;
        // Removes animation
        ref.current.classList.remove(wave.active);
      }, 1000);
    };

    ref.current.addEventListener('click', handleClick);
    // remove listener
    return () => {
      if (!ref.current) return;
      ref.current.removeEventListener('click', handleClick);
    };
  }, [ref]);
};
