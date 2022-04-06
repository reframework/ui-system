import React from 'react';
import './Paper.css';
import { getClassName } from '@reframework/classnames';

enum PaperClassName {
  paper = 'ref:paper',
  circle = 'ref:paper-circle',
  square = 'ref:paper-square',
  'shadow-0' = 'ref:paper-shadow-0',
  'shadow-1' = 'ref:paper-shadow-1',
  'shadow-2' = 'ref:paper-shadow-2',
  'shadow-3' = 'ref:paper-shadow-3',
  'shadow-4' = 'ref:paper-shadow-4',
  'shadow-5' = 'ref:paper-shadow-5',
  'shadow-6' = 'ref:paper-shadow-6',
  'shadow-7' = 'ref:paper-shadow-7',
  'shadow-8' = 'ref:paper-shadow-8',
  'shadow-9' = 'ref:paper-shadow-9',
}

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
      [PaperClassName.paper]: true,
      [PaperClassName[shape]]: Boolean(shape),
      [PaperClassName[`shadow-${levitation}`]]: Boolean(levitation),
      [className!]: Boolean(className),
    });
    return <div {...props} className={classNames} ref={ref} />;
  },
);

export default Paper;
