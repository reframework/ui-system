import Paper from '@components/Paper/Paper';
import React from 'react';
import { getClassName } from '@reframework/classnames';
import { ToastClassName } from '@wip/Toast/Toast';

type Placement = `${'top' | 'bottom'}-${'left' | 'center' | 'right'}`;

export interface ToastItemProps {
  content: string | React.ReactNode;
  key: React.Key;
  type: 'info' | 'success' | 'error' | 'warning';
  duration?: number;
  placement: Placement;
}

// TODO: Add css transitions
const ToastItem = ({
  content,
  type,
  onClose,
  duration = 5000,
}: ToastItemProps & { onClose: () => void }) => {
  const className = getClassName({
    [ToastClassName.item]: true,
    [ToastClassName[type]]: true,
  });

  React.useEffect(() => {
    if (duration === Infinity) return;
    const timeout = setTimeout(onClose, duration);
    // Removes the timer before unmounting
    return () => {
      clearTimeout(timeout);
    };
    // TODO: fix
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [duration]);

  return (
    <Paper shadow={6} className={className}>
      <span className={ToastClassName.icon}>🗯</span>
      <span>{content}</span>
    </Paper>
  );
};

export default ToastItem;
