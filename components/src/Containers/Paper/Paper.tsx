import React from 'react';
import styles from './Paper.css';
import clsx from 'clsx';

type Props = React.HTMLAttributes<HTMLDivElement>;

const Paper = (props: Props) => {
  const classNames = clsx(styles.paper, props.className);
  return <div {...props} className={classNames} />;
};

export default Paper;
