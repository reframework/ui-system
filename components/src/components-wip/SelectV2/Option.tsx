import React from 'react';
import { getClassName } from '@reframework/classnames';
import { ListItem } from '@wip/List';
import styles from './Option.css?module';

export interface OptionProps {
  children?: React.ReactNode;
  color?: string;
  disabled?: boolean;
  focused?: boolean;
  icon?: React.ReactNode;
  id?: string;
  onClick?: (event: React.MouseEvent) => void;
  selected?: boolean;
  tabIndex?: number;
}

const Option = ({
  children,
  disabled,
  id,
  onClick,
  selected,
  tabIndex,
  focused,
  ...props
}: OptionProps) => {
  const classNames = getClassName({
    [styles.item]: true,
    [styles.selected]: Boolean(selected),
    [styles.disabled]: Boolean(disabled),
    [styles.highlighted]: Boolean(focused),
  });

  return (
    <ListItem
      aria-selected={selected}
      disabled={disabled}
      className={classNames}
      id={id}
      onClick={onClick}
      role="option"
      tabIndex={tabIndex}
      {...props}
    >
      {children}
    </ListItem>
  );
};

export default Option;
