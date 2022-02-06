import React from 'react';
import { getClassName } from '@reframework/classnames';
import styles from './Option.css?module';

export interface OptionProps {
  color?: string;
  disabled?: boolean;
  icon?: React.ReactNode;
  value: string | number;
  children?: React.ReactNode;
  selected?: boolean;
}

const Option = ({
  selected,
  value,
  children,
  disabled,
  ...props
}: OptionProps) => {
  const classNames = getClassName({
    [styles.item]: true,
    [styles.active]: Boolean(selected),
    [styles.disabled]: Boolean(disabled),
  });

  return (
    <li
      value={value}
      className={classNames}
      aria-disabled={disabled}
      aria-selected={selected}
      role="option"
      {...props}
    >
      {children || null}
    </li>
  );
};

export default Option;
