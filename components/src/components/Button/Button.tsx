import React, { useRef } from 'react';
import { getClassName } from '@reframework/classnames';
import { useWave } from '../Wave/useWave';
import { forkRef } from '../../utils/forkRef';
import './Button.css';

export const olo_sd = 1000;

enum ButtonClassName {
  button = 'ref:button',
  // Sizes
  large = 'ref:button-size-large',
  medium = 'ref:button-size-medium',
  small = 'ref:button-size-small',
  // Variants
  solid = 'ref:button-variant-solid',
  outlined = 'ref:button-variant-outlined',
  ghost = 'ref:button-variant-ghost',
  link = 'ref:button-variant-link',
  // Colors
  primary = 'ref:button-color-primary',
  secondary = 'ref:button-color-secondary',
  success = 'ref:button-color-success',
  warning = 'ref:button-color-warning',
  error = 'ref:button-color-error',
  neutral = 'ref:button-color-neutral',
  // Shape
  circle = 'ref:button-circle',
  stretch = 'ref:button-stretch',
  disabled = 'ref:button-disabled',
}

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
    ref: React.ForwardedRef<HTMLButtonElement>,
  ) => {
    const buttonRef = useRef<HTMLButtonElement | null>(null);

    const forkedRef = forkRef(ref, buttonRef);

    const waveRef = variant !== 'link' ? buttonRef : { current: null };
    useWave(waveRef);

    const classNames = getClassName({
      [ButtonClassName.button]: true,
      [ButtonClassName[size]]: true,
      [ButtonClassName[variant]]: true,
      [ButtonClassName[color]]: true,
      [ButtonClassName.circle]: shape === 'circle',
      [ButtonClassName.stretch]: stretch,
      [ButtonClassName.disabled]: disabled,
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
  },
);

export default Button;
