import React from 'react';
import styles from './Radio.css?module';
export interface RadioProps {
  checked: boolean;
  disabled?: boolean;
  id?: string;
  name: string;
  onChange?: (e: React.ChangeEvent) => void;
  onClick?: (e: React.MouseEvent) => void;
  value: string;
}

const Radio = ({
  checked,
  disabled,
  id,
  name,
  onChange,
  onClick,
  value,
}: RadioProps) => {
  return (
    <div className={styles.radio}>
      <input
        checked={checked}
        disabled={disabled}
        id={id}
        name={name}
        onChange={onChange}
        onClick={onClick}
        type="radio"
        value={value}
      />
      <span className={styles.inner} aria-hidden="true" />
    </div>
  );
};

export default Radio;
