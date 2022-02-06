import React from 'react';
import styles from './Wave.css?module';

export const Wave: React.FC = ({ children }) => {
  return <div className={styles.wave}>{children}</div>;
};
