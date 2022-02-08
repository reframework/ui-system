import React from 'react';
import { getClassName } from '@reframework/classnames';
import styles from './Option.css?module';

const createSelectEvent = <T extends {}>(detail?: T) => {
  return new CustomEvent('rf:option-select', {
    bubbles: true,
    cancelable: true,
    detail,
  });
};

export interface OptionProps {
  id?: string;
  color?: string;
  disabled?: boolean;
  icon?: React.ReactNode;
  value: string | number;
  children?: React.ReactNode;
  selected?: boolean;
  onClick?: (event: React.MouseEvent) => void;
}

const Option = ({
  children,
  disabled,
  id,
  onClick,
  selected,
  value,
  ...props
}: OptionProps) => {
  const ref = React.useRef<HTMLDivElement | null>(null);

  const classNames = getClassName({
    [styles.item]: true,
    [styles.active]: Boolean(selected),
    [styles.disabled]: Boolean(disabled),
  });

  const handleClick = (event: React.MouseEvent) => {
    if (typeof onClick === 'function') {
      onClick(event);
    }

    if (ref.current && !disabled) {
      ref.current.dispatchEvent(createSelectEvent({ value }));
    }
  };

  return (
    <div
      aria-disabled={disabled}
      aria-selected={selected}
      className={classNames}
      data-value={value}
      id={id}
      onClick={handleClick}
      ref={ref}
      role="option"
      {...props}
    >
      {children || null}
    </div>
  );
};

export default Option;
