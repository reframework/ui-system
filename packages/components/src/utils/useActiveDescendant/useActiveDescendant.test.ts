import { renderHook, act } from '@testing-library/react-hooks';
import {
  // ActiveDescendant,
  useActiveDescendant,
} from '@utils/useActiveDescendant';

describe('useActiveDescendant', () => {
  it.skip('current should be null', () => {
    const { result } = renderHook(() => useActiveDescendant({}));
    expect(result.current.current).toBeNull();
  });

  it.skip('shout set and reset descendant', () => {
    const { result } = renderHook(() => useActiveDescendant({}));
    act(() => result.current.set(document.createElement('div')));
    expect(result.current.current).toBeInstanceOf(HTMLDivElement);
    act(() => result.current.reset());
    expect(result.current.current).toBeNull();
  });

  describe('setByIndex', () => {
    it.skip('should set descendant by index', () => {
      //
    });
  });
  describe('setPrevious', () => {
    it.skip('1', () => {
      //
    });
  });
  describe('setNext', () => {
    it.skip('1', () => {
      //
    });
  });
  describe('setLast', () => {
    it.skip('1', () => {
      //
    });
  });
  describe('setFirst', () => {
    it.skip('1', () => {
      //
    });
  });
});
