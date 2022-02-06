import React, { useImperativeHandle, useRef } from 'react';
import styles from './Button.css?module';
import { getClassName } from '@reframework/classnames';
import { useWave } from '../Effects/Wave/useWave';

export interface ButtonProps {
  children: React.ReactNode;
  color?: 'primary' | 'secondary' | 'error' | 'warning' | 'success' | 'neutral';
  variant?: 'contained' | 'outlined' | 'text' | string;
  disabled?: boolean;
  shape?: 'circle' | 'square';
  size?: 'small' | 'medium' | 'large';
  stretch?: boolean;
  className?: string;
}

type Props = React.HTMLAttributes<HTMLButtonElement> & ButtonProps;

const Button = React.forwardRef(
  (
    {
      children,
      className,
      color = 'primary',
      disabled = false,
      shape = 'square',
      size = 'medium',
      stretch = false,
      variant = 'contained',
      ...otherProps
    }: Props,
    ref: React.ForwardedRef<HTMLButtonElement>
  ) => {
    const buttonRef = useRef<HTMLButtonElement | null>(null);
    useImperativeHandle(ref, () => buttonRef.current!, []);
    useWave(buttonRef);

    const classNames = getClassName({
      [styles.button]: true,
      [styles[size]]: true,
      [styles[variant]]: true,
      [styles[color]]: true,
      [styles.circle]: shape === 'circle',
      [styles.stretch]: stretch,
      [styles.disabled]: disabled,
      [className!]: Boolean(className),
    });

    return (
      <button
        {...otherProps}
        ref={buttonRef}
        disabled={disabled}
        className={classNames}
      >
        {children}
      </button>
    );
  }
);

export default Button;
