import { getClassName } from '@reframework/classnames';
import React from 'react';
import './Arrow.css';

enum ArrowClassNameEnum {
  arrow = 'ref:tooltip-arrow',
}

interface ArrowProps {
  style?: React.CSSProperties;
  placement?: 'top' | 'right' | 'bottom' | 'left';
}

export const Arrow = React.forwardRef<HTMLDivElement | null, ArrowProps>(
  ({ style, placement }, ref) => {
    const arrowClassName = getClassName({
      [ArrowClassNameEnum.arrow]: true,
      [placement!]: !!placement,
    });

    return <div className={arrowClassName} ref={ref} style={style} />;
  },
);
