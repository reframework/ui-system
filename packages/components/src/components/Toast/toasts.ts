import { placements, ToastsRecord } from '@components/Toast/Toast';
import React from 'react';
import { ToastItemProps } from './ToastItem';

type SetToasts = React.Dispatch<React.SetStateAction<ToastsRecord>>;

export class Store {
  static setToasts: SetToasts = (_) => _;

  static removeToast = (key: React.Key, placement: string) => {
    Store.setToasts((toastsRecord) => {
      return {
        ...toastsRecord,
        [placement]: toastsRecord[placement].filter((it) => it.key !== key),
      };
    });
  };
}

// TODO: Replace with React.useId()
const useId = () =>
  'xxxx-xxxx-xxxx-xxxx'.replace(/[x]/g, () =>
    ((Math.random() * 16) % 16 | 0).toString(16),
  );

type PartialPick<T, TKeys extends keyof T> = { [k in TKeys]+?: T[k] };

type NextToastProps = Pick<
  ToastItemProps,
  'placement' | 'duration' | 'content'
> &
  PartialPick<ToastItemProps, 'key'>;

type InternalProps = Pick<ToastItemProps, 'type'>;

const showToast = (props: InternalProps) => (next: NextToastProps) => {
  const { type } = props;
  const { key, content, placement, ...nextProps } = next;

  if (!placements.includes(placement)) {
    console.error('Invalid Toast placement');
    return () => {
      /** noop */
    };
  }

  const isValidKey = typeof key === 'string' || typeof key === 'number';
  const nextKey = isValidKey ? key : useId();

  // The new Toast props
  const nextToast = {
    ...nextProps,
    content,
    placement,
    key: nextKey,
    type,
  };

  Store.setToasts((toastsRecord) => {
    const toasts = toastsRecord[placement];
    const idx = isValidKey ? toasts.findIndex((it) => it.key === key) : -1;

    if (idx >= 0) {
      // replaces the Toast if the same key was found
      const toastsClone = toasts.slice();
      toastsClone[idx] = nextToast;
      return {
        ...toastsRecord,
        [placement]: toastsClone,
      };
    }

    return {
      ...toastsRecord,
      [placement]: [nextToast, ...toasts],
    };
  });

  return () => {
    Store.removeToast(nextKey, placement);
  };
};

export default {
  error: showToast({ type: 'error' }),
  info: showToast({ type: 'info' }),
  success: showToast({ type: 'success' }),
  warning: showToast({ type: 'warning' }),
};
