import { getClassName } from '@reframework/classnames';
import React from 'react';
import styles from './Checkbox.css?module';
export interface CheckboxProps {
  checked: boolean;
  disabled?: boolean;
  id?: string;
  indeterminate?: boolean;
  name: string;
  onChange?: (e: React.ChangeEvent) => void;
  // ?
  onClick?: (e: React.MouseEvent) => void;
  // ?
  value: string;
}

const Checkbox = ({
  checked,
  disabled,
  id,
  indeterminate = false,
  name,
  onChange,
  onClick,
  value,
}: CheckboxProps) => {
  const innerClassName = getClassName({
    [styles.inner]: true,
  });

  const checkboxRef = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    if (!checkboxRef.current) return;
    checkboxRef.current.indeterminate = indeterminate;
  }, [indeterminate]);

  return (
    <div className={styles.wrapper}>
      <input
        checked={checked}
        disabled={disabled}
        id={id}
        name={name}
        onChange={onChange}
        onClick={onClick}
        type="checkbox"
        value={value}
        ref={checkboxRef}
      />
      <span className={innerClassName} aria-hidden="true" />
    </div>
  );
};

export default Checkbox;
