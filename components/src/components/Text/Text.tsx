import React from 'react';
import './Text.css';
import { getClassName } from '@reframework/classnames';

enum TextClassName {
  text = 'ref:text',
  // Aligns
  'align-left' = 'ref:text-align-left',
  'align-center' = 'ref:text-align-center',
  'align-right' = 'ref:text-align-right',
  // Variants
  primary = 'ref:text-primary',
  secondary = 'ref:text-secondary',
  monospace = 'ref:text-monospace',
  italic = 'ref:text-italic',
  // Styles
  stretch = 'ref:text-stretch',
  nowrap = 'ref:text-nowrap',
  underline = 'ref:text-underline',
  uppercase = 'ref:text-uppercase',
  ellipsis = 'ref:text-ellipsis',
  // Weight
  'weight-black' = 'ref:text-weight-black',
  'weight-bold' = 'ref:text-weight-bold',
  'weight-semibold' = 'ref:text-weight-semibold',
  'weight-medium' = 'ref:text-weight-medium',
  'weight-regular' = 'ref:text-weight-regular',
  'weight-light' = 'ref:text-weight-light',
  'weight-thin' = 'ref:text-weight-thin',
  // Colors
  'color-primary' = 'ref:text-color-primary',
  'color-secondary' = 'ref:text-color-secondary',
  'color-error' = 'ref:text-color-error',
  'color-warning' = 'ref:text-color-warning',
  'color-success' = 'ref:text-color-success',
  'color-default' = 'ref:text-color-default',
  'color-neutral' = 'ref:text-color-neutral',
  // Sizes
  'size-xxxs' = 'ref:text-size-xxxs',
  'size-xxs' = 'ref:text-size-xxs',
  'size-xs' = 'ref:text-size-xs',
  'size-s' = 'ref:text-size-s',
  'size-m' = 'ref:text-size-m ',
  'size-l' = 'ref:text-size-l',
  'size-xl' = 'ref:text-size-xl',
  'size-xxxl' = 'ref:text-size-xxxl',
}
export interface TextProps {
  align?: 'left' | 'center' | 'right';
  children: React.ReactNode;
  className?: string;
  component?:
    | 'a'
    | 'button'
    | 'em'
    | 'h1'
    | 'h2'
    | 'h3'
    | 'p'
    | 'pre'
    | 'small'
    | 'span'
    | 'strong';
  ellipsis?: boolean;
  font?: 'primary' | 'secondary' | 'monospace' | 'italic';
  nowrap?: boolean;
  size?: 'xxxs' | 'xxs' | 'xs' | 's' | 'm' | 'l' | 'xl' | 'xxl' | 'xxxl';
  stretch?: boolean;
  underline?: boolean;
  uppercase?: boolean;
  color?:
    | 'primary'
    | 'secondary'
    | 'error'
    | 'warning'
    | 'success'
    | 'neutral'
    | 'default';
  weight?:
    | 'thin'
    | 'light'
    | 'regular'
    | 'medium'
    | 'semibold'
    | 'bold'
    | 'black';
}

const Text = ({
  align = 'left',
  children,
  className,
  component: Component = 'p' as const,
  ellipsis = false,
  font = 'primary',
  nowrap = false,
  size = 'm',
  stretch = false,
  underline = false,
  uppercase = false,
  color = 'default',
  weight = 'regular',
  ...otherProps
}: TextProps) => {
  const classNames = getClassName({
    [TextClassName.text]: true,
    [TextClassName[font]]: true,
    [TextClassName[`align-${align}`]]: true,
    [TextClassName[`size-${size}`]]: true,
    [TextClassName[`color-${color}`]]: true,
    [TextClassName[`weight-${weight}`]]: true,
    [TextClassName.ellipsis]: ellipsis,
    [TextClassName.nowrap]: nowrap,
    [TextClassName.stretch]: stretch,
    [TextClassName.underline]: underline,
    [TextClassName.uppercase]: uppercase,
    [className!]: Boolean(className),
  });

  return (
    <Component {...otherProps} className={classNames}>
      {children}
    </Component>
  );
};

export default Text;
