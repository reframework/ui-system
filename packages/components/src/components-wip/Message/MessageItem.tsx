import React from 'react';
import { Paper } from '@components/Paper';
import styles from './MessageItem.css?module';

// TODO: add icons by type
const emoji = {
  error: '🚫',
  warning: '☢️',
  success: '✅',
  info: 'ℹ️',
};

export interface MessageItemProps {
  content: string | React.ReactNode;
  key: React.Key;
  type: 'info' | 'success' | 'error' | 'warning';
  duration?: number;
}

// TODO: Add css transitions
const MessageItem = ({
  content,
  type,
  onClose,
  duration = 5000,
}: MessageItemProps & { onClose: () => void }) => {
  React.useEffect(() => {
    if (duration === Infinity) return;
    const timeout = setTimeout(onClose, duration);
    // Removes the timer before unmounting
    return () => {
      clearTimeout(timeout);
    };
  }, [duration]);

  return (
    <Paper shadow={6} className={styles.message}>
      <span className={styles.icon}>{emoji[type]} </span>
      <span>{content}</span>
    </Paper>
  );
};

export default MessageItem;
