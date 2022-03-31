import React from 'react';
import { getClassName } from '@reframework/classnames';
import { TabsClassName } from './Tabs';

interface InkProps {
  left: Number;
  width: number;
  className?: string;
}

const Ink: React.FC<InkProps> = ({ left, width, className }) => {
  const classNames = getClassName({
    [TabsClassName.ink]: true,
    className: Boolean(className),
  });

  return (
    <div
      aria-hidden
      className={classNames}
      style={{
        width,
        transform: `translateX(${left}px)`,
      }}
    />
  );
};

export default Ink;
