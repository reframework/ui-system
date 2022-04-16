import React, { useImperativeHandle, useRef } from 'react';
import './Input.css';
import { getClassName } from '@reframework/classnames';
import useControlledState from '@utils/useControlledState';
import { isFunction, useAutoFocus } from '../../utils';

enum InputClassName {
  input = 'ref:input',
  container = 'ref:input-container',
  // Affix
  prefix = 'ref:input-prefix',
  suffix = 'ref:input-suffix',
  // Sizes
  s = 'ref:input-s',
  m = 'ref:input-m',
  l = 'ref:input-l',
  // Colors
  warning = 'ref:input-warning',
  success = 'ref:input-success',
  error = 'ref:input-error',
}

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
  defaultValue?: string;
  // error?: boolean;
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
  size?: 's' | 'm' | 'l';
  suffix?: React.ReactNode;
  type?: string;
  value?: string;
  tabIndex?: number;
  status?: null | 'success' | 'error' | 'warning';
  // TODO: React.HTMLAttributes<HTMLInputElement>;
}

const Input = React.forwardRef(
  (
    {
      autoFocus,
      className,
      defaultValue,
      id,
      name,
      onChange,
      placeholder,
      prefix,
      readOnly,
      size = 's',
      status = null,
      suffix,
      type,
      value: $value,
      ...props
    }: InputProps,
    ref: React.ForwardedRef<InputRef>,
  ) => {
    const classNames = getClassName({
      [InputClassName.container]: true,
      [InputClassName[size]]: true,
      // TODO:fix
      [InputClassName[status!]]: Boolean(status),
      [className!]: Boolean(className),
    });

    const wrapperRef = useRef<HTMLDivElement | null>(null);
    const inputRef = useRef<HTMLInputElement | null>(null);

    const { state: value, setState: setValue } = useControlledState({
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
      <div className={classNames} ref={wrapperRef}>
        {prefix && <div className={InputClassName.prefix}>{prefix}</div>}
        <input
          className={InputClassName.input}
          id={id}
          name={name}
          onChange={handleChange}
          placeholder={placeholder}
          ref={inputRef}
          type={type}
          value={value}
          {...props}
        />
        {suffix && <div className={InputClassName.suffix}>{suffix}</div>}
      </div>
    );
  },
);
export default Input;
