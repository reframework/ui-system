import React, { useImperativeHandle, useRef, useState } from 'react';
import styles from './Button.css?module';
import { getClassName } from '@reframework/classnames';
import wave from '../Effects/Wave/Wave.css?module';

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

    const timeout = useRef<number>();
    const buttonRef = useRef<HTMLButtonElement | null>(null);

    useImperativeHandle(ref, () => buttonRef.current!, []);

    const onClick = () => {
      if (!buttonRef.current) return;
      // Doesn't remove a className
      clearTimeout(timeout.current);

      buttonRef.current.classList.add(wave.active);
      // Forces to restart animation
      buttonRef.current.style.setProperty('--wave', 'none');

      setTimeout(() => {
        if (!buttonRef.current) return;
        // Restarts animation
        buttonRef.current.style.setProperty('--wave', '');
      }, 0);

      timeout.current = window.setTimeout(() => {
        if (!buttonRef.current) return;
        // Removes animation
        buttonRef.current.classList.remove(wave.active);
      }, 1000);
    };

    return (
      <button
        {...otherProps}
        ref={buttonRef}
        onClick={onClick}
        disabled={disabled}
        className={classNames}
      >
        {children}
      </button>
    );
  }
);

export default Button;
