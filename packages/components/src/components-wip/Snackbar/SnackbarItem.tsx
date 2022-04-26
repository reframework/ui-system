import Paper from '@components/Paper/Paper';
import React from 'react';
import { getClassName } from '@reframework/classnames';

enum SnakbarClassName {}
// TODO: add icons by type
const emoji = {
  error: '🚫',
  warning: '☢️',
  success: '✅',
  info: 'ℹ️',
};

export interface SnackbarItemProps {
  content: string | React.ReactNode;
  key: React.Key;
  type: 'info' | 'success' | 'error' | 'warning';
  duration?: number;
}

// TODO: Add css transitions
const SnackbarItem = ({
  content,
  type,
  onClose,
  duration = 5000,
}: SnackbarItemProps & { onClose: () => void }) => {
  const className = getClassName({
    [SnakbarClassName.snackbar]: true,
    [SnakbarClassName[type]]: true,
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
    <Paper levitation={6} className={className}>
      <span className={SnakbarClassName.icon}>{emoji[type]} </span>
      <span>{content}</span>
    </Paper>
  );
};

export default SnackbarItem;
