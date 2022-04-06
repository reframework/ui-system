import React from 'react';
import './AspectRatio.css';
import { getClassName } from '@reframework/classnames';

enum AspectRatioClassName {
  container = 'ref=aspect-ration-container',
  inner = 'ref:aspect-ratio-inner',
}
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
    [AspectRatioClassName.container]: true,
    [className!]: Boolean(className),
  });

  const style = {
    ...props.style,
    paddingBottom: `${100 / aspectRatio}%`,
  };

  return (
    <div {...props} className={classNames} style={style}>
      <div className={AspectRatioClassName.inner}>{children}</div>
    </div>
  );
};

export default AspectRatio;
