import React from 'react';
import styles from './Checkbox.css?module';
export interface CheckboxProps {
  checked: boolean;
  id: string;
  disabled: boolean;
  onChange?: (e: React.ChangeEvent) => void;
  onClick?: (e: React.MouseEvent) => void;
  value: string;
  name: string;
}

const Checkbox = ({
  checked,
  id,
  disabled,
  onChange,
  onClick,
  value,
  name,
}) => {
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
