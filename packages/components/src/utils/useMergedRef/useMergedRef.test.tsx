import { fireEvent, render, screen } from '@testing-library/react';
import { renderHook, act } from '@testing-library/react-hooks';
import React from 'react';
import useMergedRef from './useMergedRef';

const DemoRef = React.forwardRef((_, ref) => {
  const [cnt, setCnt] = React.useState(0);
  const ownRef = React.useRef(null);
  const mergedRef = useMergedRef(ref, ownRef);

  const increment = () => {
    setCnt((prev) => prev + 1);
  };

  return (
    <div>
      {cnt % 3 !== 0 && <div ref={mergedRef}>value: {cnt}</div>}
      <button onClick={increment} />
    </div>
  );
});

describe('useMergedRef', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  describe('How does hook work', () => {
    it('returns nothing when no ref provided', () => {
      // @ts-expect-error no arguments
      const { result } = renderHook(() => useMergedRef());
      expect(result.current).toBe(undefined);
    });
    it('returns first ref when only first ref provided', () => {
      const ref = { current: null };
      const { result } = renderHook(() => useMergedRef(ref, undefined));
      expect(result.current).toBe(ref);
    });
    it('returns first or second ref when only one ref provided', () => {
      const ref = { current: null };
      // @ts-expect-error another type of ref
      const { result } = renderHook(() => useMergedRef(undefined, ref));
      expect(result.current).toBe(ref);
    });
    it('returns function when both refs provided', () => {
      const ref = { current: null };
      const { result } = renderHook(() => useMergedRef(ref, ref));
      expect(typeof result.current).toBe('function');
    });
  });

  describe('How does mergeRefs method works', () => {
    it('merges both MutableRefObjects with `current` field', () => {
      const refA = { current: null };
      const refB = { current: null };
      const node = document.createElement('div');
      const { result } = renderHook(() => useMergedRef(refA, refB));
      expect(typeof result.current).toBe('function');
      // @ts-expect-error should be a function
      act(() => result.current.call(null, node));
      expect(refA.current).toBe(node);
      expect(refB.current).toBe(node);
    });
    it('merges both callback refs', () => {
      const refA = jest.fn();
      const refB = jest.fn();
      const node = document.createElement('div');
      const { result } = renderHook(() => useMergedRef(refA, refB));
      expect(typeof result.current).toBe('function');
      // @ts-expect-error should be a function
      act(() => result.current.call(null, node));
      expect(refA).toHaveBeenCalledTimes(1);
      expect(refA).toHaveBeenCalledWith(node);
      expect(refB).toHaveBeenCalledTimes(1);
      expect(refB).toHaveBeenCalledWith(node);
    });
    it('does not call callback ref when component updates state', () => {
      const callbackRef = jest.fn();
      render(<DemoRef ref={callbackRef} />);
      const button = screen.getByRole('button');

      fireEvent.click(button); // 1
      fireEvent.click(button); // 2
      fireEvent.click(button); // 3: should disappear

      expect(callbackRef.mock.calls[0][0]).toBeInstanceOf(HTMLDivElement);
      expect(callbackRef.mock.calls[1][0]).toBeNull();
    });
  });
});
