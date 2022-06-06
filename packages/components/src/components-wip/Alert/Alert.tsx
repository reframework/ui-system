import { getClassName } from '@reframework/classnames';
import React, { useEffect, useState } from 'react';
import styles from './Alert.css?module';

type AlertProps = {
  content: React.ReactNode;
  type: 'info' | 'success' | 'error' | 'warning';
  duration?: number;
};

const Alert: React.FC<AlertProps> = ({
  type = 'info',
  content,
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
      <span className={styles.icon}>🗯</span>
      <span>{content}</span>
    </div>
  );
};

export default Alert;
