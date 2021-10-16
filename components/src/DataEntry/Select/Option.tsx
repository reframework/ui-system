import React from 'react';
import clsx from 'clsx';

export interface OptionProps {
  color: string;
  disabled: boolean;
  icon: React.ReactNode;
  key: React.Key;
  title: string;
  value: string | number;
  children: React.ReactNode;
  onClick: () => void;
  selected: boolean;
}

const Option = ({ onClick, selected, title, children }: OptionProps) => {
  const classNames = clsx('option', { active: selected });

  return (
    <li title={title} onClick={onClick} className={classNames}>
      {children || title || null}
    </li>
  );
};

export default Option;
