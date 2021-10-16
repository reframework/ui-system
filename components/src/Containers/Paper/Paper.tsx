import React from 'react';
import styles from './Paper.css';
import clsx from 'clsx';

export interface PaperProps extends React.HTMLAttributes<HTMLDivElement> {}

const Paper = (props: PaperProps) => {
  const classNames = clsx(styles.paper, props.className);
  return <div {...props} className={classNames} />;
};

export default Paper;
