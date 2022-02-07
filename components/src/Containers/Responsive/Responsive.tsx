import React from 'react';
import styles from './Responsive.css?module';
import { getClassName } from '@reframework/classnames';

type AspectRatio = `${number}:${number}`;

export type Props = {
  aspectRatio: AspectRatio;
  className?: string;
} & React.HTMLAttributes<HTMLDivElement>;

const Responsive = ({
  aspectRatio = '1:1',
  children,
  className,
  ...props
}: Props) => {
  const classNames = getClassName({
    [styles.container]: true,
    [className!]: Boolean(className),
  });

  const [x, y] = aspectRatio.split(':');

  const style = {
    ...props.style,
    paddingBottom: 100 / (parseInt(x, 10) / parseInt(y, 10)) + '%',
  };

  return (
    <div {...props} className={classNames} style={style}>
      <div className={styles.inner}>{children}</div>
    </div>
  );
};

export default Responsive;
