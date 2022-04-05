import React from 'react';
import { getClassName } from '@reframework/classnames';
import styles from './Option.css?module';

export interface OptionProps {
  children?: React.ReactNode;
  color?: string;
  disabled?: boolean;
  highlighted?: boolean;
  icon?: React.ReactNode;
  id?: string;
  label?: React.ReactNode;
  onBlur?: (event: React.FocusEvent) => void;
  onClick?: (event: React.MouseEvent) => void;
  onFocus?: (event: React.FocusEvent) => void;
  selected?: boolean;
  tabIndex?: number;
  value: string;
}

const Option = ({
  children,
  disabled,
  id,
  label,
  onBlur,
  onClick,
  onFocus,
  selected,
  tabIndex,
  highlighted,
  value,
  ...props
}: OptionProps) => {
  const classNames = getClassName({
    [styles.item]: true,
    [styles.active]: Boolean(selected),
    [styles.disabled]: Boolean(disabled),
    [styles.highlighted]: Boolean(highlighted),
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
      {children || label || null}
    </div>
  );
};

export default Option;
