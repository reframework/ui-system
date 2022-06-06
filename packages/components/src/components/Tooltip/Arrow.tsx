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
    const offsetMapping = {
      left: '50%, 0px',
      right: '-50%, 0px',
      top: '0px, 50%',
      bottom: '0px, -50%',
    };

    const styles = {
      transform: `translate(${offsetMapping[placement!]})`,
      ...style,
    } as React.CSSProperties;

    return (
      <div className={ArrowClassNameEnum.arrow} ref={ref} style={styles} />
    );
  },
);
