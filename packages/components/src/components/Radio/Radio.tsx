import React from 'react';
import './Radio.css';

enum RadioClassName {
  container = 'ref:radio-container',
  radio = 'ref:radio',
}

export interface RadioProps {
  checked: boolean;
  disabled?: boolean;
  id?: string;
  name?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
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
    <div className={RadioClassName.container}>
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
      <span className={RadioClassName.radio} aria-hidden="true" />
    </div>
  );
};

export default Radio;
