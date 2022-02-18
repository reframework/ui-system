import React from 'react';
import styles from './AspectRatio.css?module';
import { getClassName } from '@reframework/classnames';

export interface AspectRatioBaseProps {
  /**
   * The aspect ratio of the Box. Common values are:  `16/9`, `4/3`, etc...
   */
  aspectRatio?: number;
}

export type AspectRatioProps = AspectRatioBaseProps &
  React.HTMLAttributes<HTMLDivElement>;

const AspectRatio: React.FC<AspectRatioProps> = ({
  aspectRatio = 1,
  children,
  className,
  ...props
}) => {
  const classNames = getClassName({
    [styles.container]: true,
    [className!]: Boolean(className),
  });

  const style = {
    ...props.style,
    paddingBottom: `${100 / aspectRatio}%`,
  };

  return (
    <div {...props} className={classNames} style={style}>
      <div className={styles.inner}>{children}</div>
    </div>
  );
};

export default AspectRatio;
