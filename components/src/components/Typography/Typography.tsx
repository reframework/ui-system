import React from 'react';
import styles from './Typography.css?module';
import { getClassName } from '@reframework/classnames';

export interface TypographyProps {
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
}: TypographyProps) => {
  const classNames = getClassName({
    [styles.typography]: true,
    [styles[align]]: true,
    [styles[`font_${font}`]]: true,
    [styles[size]]: true,
    [styles[color]]: true,
    [styles[weight]]: true,
    [styles.ellipsis]: ellipsis,
    [styles.nowrap]: nowrap,
    [styles.stretch]: stretch,
    [styles.underline]: underline,
    [styles.uppercase]: uppercase,
    [className!]: Boolean(className),
  });

  return (
    <Component {...otherProps} className={classNames}>
      {children}
    </Component>
  );
};

export default Text;
