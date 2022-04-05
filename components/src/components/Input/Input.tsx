import React, { useImperativeHandle, useRef } from 'react';
import styles from './Input.css?module';
import { getClassName } from '@reframework/classnames';
import { isFunction, useAutoFocus, useControlledState } from '../../utils';

export interface InputRef {
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
  autoFocus?: boolean;
  color?: 'default' | 'error' | 'warning' | 'success';
  defaultValue?: string;
  error?: boolean;
  // feedback:string;
  id?: string;
  // label:string;
  // min/max rows:number;
  readOnly?: boolean;
  // required:boolean;
  // rules: Rule[]
  className?: string;
  disabled?: boolean;
  name?: string;
  onBlur?: (event: React.FocusEvent) => void;
  onChange: any;
  onClick?: (event: React.MouseEvent) => void;
  onFocus?: (event: React.FocusEvent) => void;
  onKeyUp?: (event: React.KeyboardEvent) => void;
  onKeyDown?: (event: React.KeyboardEvent) => void;
  placeholder?: string;
  prefix?: React.ReactNode;
  role?: string;
  size?: 'small' | 'medium' | 'large';
  suffix?: React.ReactNode;
  type?: string;
  value?: string;
  tabIndex?: number;
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
      defaultValue,
      autoFocus,
      readOnly,
      prefix,
      size = 'small',
      suffix,
      type,
      error,
      value: $value,
      onClick,
      ...props
    }: InputProps,
    ref: React.ForwardedRef<InputRef>,
  ) => {
    const classNames = getClassName({
      [className!]: Boolean(className),
      [styles.container]: true,
      [styles.error]: Boolean(error),
      [styles[color]]: color,
      [styles[size]]: true,
    });

    const wrapperRef = useRef<HTMLDivElement | null>(null);
    const inputRef = useRef<HTMLInputElement | null>(null);

    const [value, setValue] = useControlledState({
      controlled: $value,
      default: defaultValue || '',
    });

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
      [],
    );

    useAutoFocus(!!autoFocus, inputRef.current);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      if (readOnly) return;
      if (isFunction(onChange)) onChange(event);
      setValue(event.target.value);
    };

    return (
      <div className={classNames} ref={wrapperRef} onClick={onClick}>
        {/* TODO: Label */}
        {/* TODO: Prefix */}
        {prefix && <div className={styles.prefix}>{prefix}</div>}
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
  },
);
export default Input;
