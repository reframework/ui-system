import React, { useRef } from 'react';
import { getClassName } from '@reframework/classnames';
import { useWave } from '../Wave/useWave';
import { forkRef } from '../../utils/forkRef';
import styles from './Button.module.css?module?module';

export interface ButtonProps {
  /**
   * Custom className for button element
   */
  className?: string;
  /**
   *  ReactNode or string
   */
  children: React.ReactNode;
  /**
   *  The color of button
   */
  color?: 'primary' | 'secondary' | 'error' | 'warning' | 'success' | 'neutral';
  /**
   * Determines if the button is disabled
   */
  disabled?: boolean;
  /**
   * Border radius shape
   */
  shape?: 'circle' | 'square';
  /**
   * The size of the button
   */
  size?: 'small' | 'medium' | 'large';
  /**
   * The option to fit the width
   */
  stretch?: boolean;
  /**
   * The variant, see demo!
   */
  variant?: 'solid' | 'outlined' | 'ghost' | 'link';
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
      variant = 'ghost',
      ...otherProps
    }: Props,
    ref: React.ForwardedRef<HTMLButtonElement>
  ) => {
    const buttonRef = useRef<HTMLButtonElement | null>(null);

    const forkedRef = forkRef(ref, buttonRef);

    const waveRef = variant !== 'link' ? buttonRef : { current: null };
    // useWave(waveRef);

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
        ref={forkedRef}
        disabled={disabled}
        className={classNames}
      >
        {children}
      </button>
    );
  }
);

export default Button;
