import React from 'react';
import { getClassName } from '@reframework/classnames';
import styles from './Option.css?module';
import { typeOf } from './utils';

const createEvent = <T extends {}>(event: string, detail?: T) => {
  return new CustomEvent(event, {
    bubbles: true,
    cancelable: true,
    detail,
  });
};

export interface OptionProps {
  id?: string;
  color?: string;
  disabled?: boolean;
  icon?: React.ReactNode;
  value: string | number;
  children?: React.ReactNode;
  selected?: boolean;
  onClick?: (event: React.MouseEvent) => void;
  onFocus?: (event: React.FocusEvent) => void;
  onBlur?: (event: React.FocusEvent) => void;
}

const Option = ({
  children,
  disabled,
  id,
  onBlur,
  onClick,
  onFocus,
  selected,
  value,
  ...props
}: OptionProps) => {
  const ref = React.useRef<HTMLDivElement | null>(null);

  const classNames = getClassName({
    [styles.item]: true,
    [styles.active]: Boolean(selected),
    [styles.disabled]: Boolean(disabled),
  });

  const handleClick = (event: React.MouseEvent) => {
    if (typeOf.function(onClick)) onClick(event);

    if (ref.current && !disabled) {
      ref.current.dispatchEvent(createEvent('rf:option-select', { value }));
    }
  };

  const handleFocus = (event: React.FocusEvent) => {
    if (typeOf.function(onFocus)) onFocus(event);

    if (ref.current && !disabled) {
      ref.current.dispatchEvent(createEvent('rf:option-focus'));
    }
  };

  const handleBlur = (event: React.FocusEvent) => {
    if (typeOf.function(onBlur)) onBlur(event);

    if (ref.current && !disabled) {
      ref.current.dispatchEvent(createEvent('rf:option-blur'));
    }
  };

  return (
    <div
      aria-disabled={disabled}
      aria-selected={selected}
      className={classNames}
      data-value={value}
      id={id}
      onBlur={handleBlur}
      onClick={handleClick}
      onFocus={handleFocus}
      ref={ref}
      role="option"
      tabIndex={0}
      {...props}
    >
      {children || null}
    </div>
  );
};

export default Option;
