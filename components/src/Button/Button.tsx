import React from 'react';
import styles from './Button.css?module';
import clsx from 'clsx';
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
    const classNames = clsx(
      styles.button,
      styles[size],
      styles[variant],
      styles[color],
      {
        [styles.circle]: shape === 'circle',
        [styles.stretch]: stretch,
        [styles.disabled]: disabled,
        [className]: className,
      }
    );

    return (
      <button
        {...otherProps}
        ref={ref}
        disabled={disabled}
        className={classNames}
      >
        {children}
      </button>
    );
  }
);

export default Button;
