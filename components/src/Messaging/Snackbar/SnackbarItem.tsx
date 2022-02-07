import styles from './SnackbarItem.css?module';
import Paper from '../../Containers/Paper/Paper';
import React from 'react';
import { getClassName } from '@reframework/classnames';

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
    [styles.snackbar]: true,
    [styles[type]]: true,
  });

  React.useEffect(() => {
    if (duration === Infinity) return;
    const timeout = setTimeout(onClose, duration);
    // Removes the timer before unmounting
    return () => {
      clearTimeout(timeout);
    };
  }, [duration]);

  return (
    <Paper reflection={6} className={className}>
      <span className={styles.icon}>{emoji[type]} </span>
      <span>{content}</span>
    </Paper>
  );
};

export default SnackbarItem;
