import React, { MutableRefObject, useImperativeHandle, useRef } from 'react';
import styles from './Input.css?module';
import { getClassName } from '@reframework/classnames';

export interface Refs {
  wrapperNode: HTMLDivElement | null;
  inputNode: HTMLInputElement | null;
  focus: () => void;
  blur: () => void;
}

export interface InputProps {
  // TODO:
  // addonAfter: React.ReactNode;
  // addonBefore: React.ReactNode;
  // allowClear: boolean;
  // autocomplete: boolean;
  // autoFocus: boolean;
  color?: 'default' | 'error' | 'warning' | 'success';
  // defaultValue: string;
  // error: boolean;
  // feedback:string;
  id?: string;
  // label:string;
  // min/max rows:number;
  // readOnly: boolean;
  // required:boolean;
  // rules: Rule[]
  className?: string;
  name?: string;
  onChange: any;
  onClick?: (event: React.MouseEvent) => void;
  placeholder?: string;
  prefix?: React.ReactNode;
  size?: 'small' | 'medium' | 'large';
  suffix?: React.ReactNode;
  type?: string;
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
      onClick,
      ...props
    }: InputProps,
    ref: React.ForwardedRef<Refs>
  ) => {
    const classNames = getClassName({
      [className!]: Boolean(className),
      [styles.container]: true,
      [styles[color]]: color,
      [styles[size]]: true,
    });

    const wrapperRef = useRef<HTMLDivElement | null>(null);
    const inputRef = useRef<HTMLInputElement | null>(null);

    useImperativeHandle(
      ref,
      () => {
        return {
          focus: inputRef.current?.focus || (() => {}),
          blur: inputRef.current?.blur || (() => {}),
          wrapperNode: wrapperRef.current,
          inputNode: inputRef.current,
        };
      },
      []
    );

    const handleChange = (e: React.ChangeEvent) => {
      onChange(e);
    };

    return (
      <div className={classNames} ref={wrapperRef} onClick={onClick}>
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
