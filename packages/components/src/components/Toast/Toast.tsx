import React from 'react';
import { Portal } from '@components/Portal';
import './Toast.css';
import { getClassName } from '@reframework/classnames';
import ToastItem, { ToastItemProps } from './ToastItem';
import { Store } from './toasts';

type Placement = `${'top' | 'bottom'}-${'left' | 'center' | 'right'}`;
export type ToastsRecord = Record<Placement, ToastItemProps[]>;

export const placements: Placement[] = [
  'bottom-center',
  'bottom-left',
  'bottom-right',
  'top-center',
  'top-left',
  'top-right',
];

export enum ToastClassName {
  container = 'ref:toast-container',
  icon = 'ref:toast-icon',
  item = 'ref:toast-item',
  'bottom-center' = 'ref:toast-bottom-center',
  'bottom-left' = 'ref:toast-bottom-left',
  'bottom-right' = 'ref:toast-bottom-right',
  'top-center' = 'ref:toast-top-center',
  'top-left' = 'ref:toast-top-left',
  'top-right' = 'ref:toast-top-right',
  info = 'ref:toast-type-info',
  warning = 'ref:toast-type-warning',
  success = 'ref:toast-type-success',
  error = 'ref:toast-type-error',
}

const ToastContainer: React.FC = () => {
  const [Toasts, setToasts] = React.useState(() => {
    return placements.reduce(
      (acc, placement) => ({ ...acc, [placement]: [] }),
      {} as ToastsRecord,
    );
  });

  React.useEffect(() => {
    // Some sort of Monkey patching
    const defaultSetToasts = Store.setToasts;
    Store.setToasts = setToasts;

    return () => {
      // return the default method
      Store.setToasts = defaultSetToasts;
    };
  }, []);

  const removeToast = (key: React.Key, placement: Placement) => () => {
    Store.removeToast(key, placement);
  };

  return (
    <Portal id="ref:toasts-root">
      {placements.map((placement) => {
        const toasts = Toasts[placement];

        if (!toasts?.length) {
          return null;
        }

        const className = getClassName({
          [ToastClassName.container]: true,
          [ToastClassName[placement]]: true,
        });

        return (
          <div key={placement} className={className}>
            {toasts.map((props) => (
              <ToastItem
                {...props}
                key={props.key}
                onClose={removeToast(props.key, props.placement)}
              />
            ))}
          </div>
        );
      })}
    </Portal>
  );
};

export default ToastContainer;
