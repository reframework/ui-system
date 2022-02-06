import React from 'react';
import styles from './Paper.css?module';
import { getClassName } from '@reframework/classnames';

export interface PaperProps extends React.HTMLAttributes<HTMLDivElement> {
  reflection?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;
  square?: boolean;
}

const Paper = ({
  className,
  square = false,
  reflection = 3,
  ...props
}: PaperProps) => {
  const classNames = getClassName({
    [styles.paper]: true,
    [styles.round]: !square,
    [styles.square]: square,
    [styles[`shadow_${reflection}`]]: Boolean(reflection),
    [className!]: Boolean(className),
  });
  return <div {...props} className={classNames} />;
};

export default Paper;
