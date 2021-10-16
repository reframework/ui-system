import React from 'react';
import clsx from 'clsx';

type Props = {
  color: string;
  disabled: boolean;
  icon: React.ReactNode;
  key: React.Key;
  title: string;
  value: string | number;
  children: React.ReactNode;
  onClick: () => void;
  selected: boolean;
};

const MenuItem = ({ onClick, selected, title, children }: Props) => {
  const classNames = clsx('item', { active: selected });

  return (
    <li title={title} onClick={onClick} className={classNames}>
      {children || title || null}
    </li>
  );
};

export default MenuItem;
