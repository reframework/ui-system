import React from 'react';
import styles from './Paper.module.css?module';
import { getClassName } from '@reframework/classnames';

export interface PaperProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Shadow depth. It accepts values between 0 and 9 inclusive.
   */
  levitation?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;
  /**
   * Border radius style.
   */
  shape?: 'square' | 'circle';
}

const Paper = React.forwardRef<HTMLDivElement | null, PaperProps>(
  ({ className, shape = 'circle', levitation = 3, ...props }, ref) => {
    const classNames = getClassName({
      [styles.paper]: true,
      [styles[shape]]: shape,
      [styles[`shadow_${levitation}`]]: Boolean(levitation),
      [className!]: Boolean(className),
    });
    return <div {...props} className={classNames} ref={ref} />;
  },
);

export default Paper;
