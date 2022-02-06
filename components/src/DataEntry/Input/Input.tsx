import React, { MutableRefObject, useImperativeHandle, useRef } from 'react';
import clsx from 'clsx';
import styles from './Input.css?module';

export interface Refs {
  wrapper: MutableRefObject<HTMLDivElement | null>;
  input: MutableRefObject<HTMLInputElement | null>;
}

export interface InputProps {
  // TODO:
  // addonAfter: React.ReactNode;
  // addonBefore: React.ReactNode;
  // allowClear: boolean;
  // autocomplete: boolean;
  // autoFocus: boolean;
  color: 'default' | 'error' | 'warning' | 'success';
  // defaultValue: string;
  // error: boolean;
  // feedback:string;
  id: string;
  // label:string;
  // min/max rows:number;
  // readOnly: boolean;
  // required:boolean;
  // rules: Rule[]
  className?: string;
  name: string;
  onChange: any;
  placeholder: string;
  prefix: React.ReactNode;
  size: 'small' | 'medium' | 'large';
  suffix: React.ReactNode;
  type: string;
  value: string;

  // TODO: React.HTMLAttributes<HTMLInputElement>;
}

const Input = React.forwardRef(
  (
    {
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
      ...props
    }: InputProps,
    ref: React.ForwardedRef<Refs>
  ) => {
    const classNames = clsx(className, styles.container, styles[size], {
      [styles[color]]: color,
    });

    const wrapperRef = useRef<HTMLDivElement | null>(null);
    const inputRef = useRef<HTMLInputElement | null>(null);

    useImperativeHandle(
      ref,
      () => {
        return {
          wrapper: wrapperRef,
          input: inputRef,
        };
      },
      []
    );

    const handleChange = (e) => {
      onChange(e);
    };

    return (
      <div className={classNames} ref={wrapperRef}>
        {/* TODO: Label */}
        {/* TODO: Prefix */}
        {prefix && <div>{prefix}</div>}
        <input
          className={styles.input}
          id={id}
          name={name}
          onChange={handleChange}
          placeholder={placeholder}
          ref={inputRef}
          type={type}
          value={value}
          {...props}
        />
        {suffix && <div className={styles.suffix}>{suffix}</div>}
        {/* TODO:  Suffix */}
      </div>
    );
  }
);
export default Input;
