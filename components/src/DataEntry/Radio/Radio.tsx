import React, { useState } from 'react';
import styles from './Radio.css?module';
export interface RadioProps {
  checked: boolean;
  id: string;
  disabled: boolean;
  onChange?: (e: React.ChangeEvent) => void;
  onClick?: (e: React.MouseEvent) => void;
  value: string;
  name: string;
}

const Radio = ({
  id,
  disabled,
  checked,
  onChange,
  onClick,
  value,
  name,
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
