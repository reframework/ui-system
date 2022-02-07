import { getClassName } from '@reframework/classnames';
import React, { useEffect, useState } from 'react';
import styles from './Alert.css?module';

// TODO: add icons by type
const emoji = {
  error: '🚫',
  warning: '☢️',
  success: '✅',
  info: 'ℹ️',
};

type AlertProps = {
  title?: string;
  type: 'info' | 'success' | 'error' | 'warning';
  duration?: number;
};

const Alert: React.FC<AlertProps> = ({
  type = 'info',
  children,
  duration = Infinity,
}) => {
  const [open, setOpen] = useState(true);

  const className = getClassName({
    [styles.wrapper]: true,
    [styles[type]]: true,
  });

  useEffect(() => {
    if (duration === Infinity) return;

    const timeout = setTimeout(() => {
      setOpen(false);
    }, duration);

    return () => {
      clearTimeout(timeout);
    };
  }, [duration]);

  if (!open) return null;

  return (
    <div className={className}>
      <span className={styles.icon}>{emoji[type]} </span>
      <span>{children}</span>
    </div>
  );
};

export default Alert;
