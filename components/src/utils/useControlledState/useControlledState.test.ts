import { renderHook, act } from '@testing-library/react-hooks';
import useControlledState from './useControlledState';

describe('useControlledState', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const CONTROLLED_STATE = 'CONTROLLED_STATE';
  const DEFAULT_STATE = 'DEFAULT_STATE';
  const NEXT_STATE = 'NEXT_STATE';

  describe('Controlled mode', () => {
    it('`isControlled` should not change in controlled mode', () => {
      const { result, rerender } = renderHook(
        (params) => useControlledState(params),
        {
          initialProps: {
            default: undefined,
            controlled: CONTROLLED_STATE,
          },
        },
      );

      rerender({
        default: true,
        controlled: undefined,
      });

      expect(result.current.isControlled).toBe(true);
    });
    it('Should not update state', () => {
      const { result } = renderHook(() =>
        useControlledState({
          default: undefined,
          controlled: CONTROLLED_STATE,
        }),
      );

      act(() => result.current.setState(NEXT_STATE));
      expect(result.current.state).toBe(CONTROLLED_STATE);
    });
    it('Should return controlled state and ignore the default', () => {
      const { result } = renderHook(() =>
        useControlledState({
          default: DEFAULT_STATE,
          controlled: CONTROLLED_STATE,
        }),
      );

      expect(result.current.state).toBe(CONTROLLED_STATE);
    });
    it('Should update state after rerender', () => {
      const { result, rerender } = renderHook(
        (params) => useControlledState(params),
        {
          initialProps: {
            default: undefined,
            controlled: CONTROLLED_STATE,
          },
        },
      );

      rerender({
        default: undefined,
        controlled: NEXT_STATE,
      });

      expect(result.current.state).toBe(NEXT_STATE);
    });
  });
  describe('Uncontrolled mode', () => {
    it('`isControlled` should not change in uncontrolled mode', () => {
      const { result, rerender } = renderHook(
        (params) => useControlledState(params),
        {
          initialProps: {
            default: DEFAULT_STATE,
            controlled: undefined,
          },
        },
      );

      rerender({
        default: undefined,
        controlled: CONTROLLED_STATE,
      });

      expect(result.current.isControlled).toBe(false);
    });

    it('Should apply the default state only once', () => {
      const { result, rerender } = renderHook(
        (params) => useControlledState(params),
        {
          initialProps: {
            default: DEFAULT_STATE,
            controlled: undefined,
          },
        },
      );

      rerender({
        default: NEXT_STATE,
        controlled: undefined,
      });

      expect(result.current.state).toBe(DEFAULT_STATE);
    });
    it('Should update internal state', () => {
      const { result } = renderHook(() =>
        useControlledState({
          default: DEFAULT_STATE,
          controlled: undefined,
        }),
      );

      act(() => result.current.setState(NEXT_STATE));

      expect(result.current.state).toBe(NEXT_STATE);
    });
    it('Should ignore controlled state in uncontrolled mode', () => {
      const { result, rerender } = renderHook(() =>
        useControlledState({
          default: DEFAULT_STATE,
          controlled: undefined,
        }),
      );

      rerender({
        default: undefined,
        controlled: CONTROLLED_STATE,
      });

      expect(result.current.state).toBe(DEFAULT_STATE);
    });
  });
});
