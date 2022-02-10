import React from 'react';
import { getClassName } from '@reframework/classnames';
import styles from './Option.css?module';
import { typeOf } from './utils';

export interface OptionProps {
  children?: React.ReactNode;
  color?: string;
  disabled?: boolean;
  icon?: React.ReactNode;
  id?: string;
  onBlur?: (event: React.FocusEvent) => void;
  onClick?: (event: React.MouseEvent) => void;
  onFocus?: (event: React.FocusEvent) => void;
  selected?: boolean;
  value: string | number;
  tabIndex?: number;
}

const Option = ({
  children,
  disabled,
  id,
  onBlur,
  onClick,
  onFocus,
  selected,
  value,
  tabIndex,
  ...props
}: OptionProps) => {
  const classNames = getClassName({
    [styles.item]: true,
    [styles.active]: Boolean(selected),
    [styles.disabled]: Boolean(disabled),
  });

  return (
    <div
      aria-disabled={disabled}
      aria-selected={selected}
      className={classNames}
      data-value={value}
      id={id}
      onBlur={onBlur}
      onClick={onClick}
      onFocus={onFocus}
      role="option"
      tabIndex={tabIndex}
      {...props}
    >
      {children || null}
    </div>
  );
};

export default Option;
