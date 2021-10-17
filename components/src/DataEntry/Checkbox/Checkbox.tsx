import React from 'react';
import styles from './Checkbox.css?module';
export interface CheckboxProps {
  checked: boolean;
  disabled?: boolean;
  id?: string;
  name: string;
  onChange?: (e: React.ChangeEvent) => void;
  onClick?: (e: React.MouseEvent) => void;
  value: string;
}

const Checkbox = ({
  checked,
  disabled,
  id,
  name,
  onChange,
  onClick,
  value,
}: CheckboxProps) => {
  return (
    <div className={styles.checkbox}>
      <input
        checked={checked}
        disabled={disabled}
        id={id}
        name={name}
        onChange={onChange}
        onClick={onClick}
        type="checkbox"
        value={value}
      />
      <span className={styles.inner} aria-hidden="true" />
    </div>
  );
};

export default Checkbox;
