import { getClassName } from '@reframework/classnames';
import React from 'react';
import {
  AtomicSpacingProps,
  getSpacing,
} from '../../atomic/Spacing/getSpacing';

export interface BoxProps
  extends AtomicSpacingProps,
    React.HTMLAttributes<HTMLDivElement> {}

const Box = (props: BoxProps) => {
  const { className: spacingClassName, props: restProps } = getSpacing(props);

  const className = getClassName({
    [props.className!]: Boolean(props.className),
    [spacingClassName]: Boolean(spacingClassName),
  });

  return <div {...restProps} className={className} />;
};

export default Box;
