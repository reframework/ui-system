import React from 'react';
import clsx from 'clsx';
import styles from './Input.css?module';

type Props = {
  // TODO:
  // addonAfter: React.ReactNode;
  // addonBefore: React.ReactNode;
  // allowClear: boolean;
  // autocomplete: boolean;
  // autoFocus: boolean;
  color: 'default' | 'error' | 'warning' | 'success';
  // defaultValue: string;
  // error: boolean;
  // helperText:string;
  id: string;
  // label:string;
  // min/max rows:number;
  // readOnly: boolean;
  // required:boolean;
  className?: string;
  name: string;
  onChange: any;
  placeholder: string;
  prefix: React.ReactNode;
  size: 'small' | 'medium' | 'large';
  suffix: React.ReactNode;
  type: string;
  value: string;

  // TODO: inputProps: React.HTMLAttributes<HTMLInputElement>;
};

const Input = ({
  className,
  color = 'default',
  id,
  name,
  onChange,
  placeholder,
  prefix,
  size = 'small',
  suffix,
  type,
  value,
}: Props) => {
  const classNames = clsx(className, styles.container, styles[size], {
    [styles[color]]: color,
  });
  const handleChange = (e) => {
    onChange(e);
  };

  return (
    <div className={classNames}>
      {/* TODO: Label */}
      {/* TODO: Prefix */}
      {prefix && <div>{prefix}</div>}
      <input
        className={styles.input}
        id={id}
        name={name}
        onChange={handleChange}
        placeholder={placeholder}
        type={type}
        value={value}
      />
      {suffix && <div className={styles.suffix}>{suffix}</div>}

      {/* TODO:  Suffix */}
    </div>
  );
};

export default Input;
