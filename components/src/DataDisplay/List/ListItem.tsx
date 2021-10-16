import React from 'react';
import clsx from 'clsx';

type Props = {
  color: string;
  disabled: boolean;
  icon: React.ReactNode;
  key: React.Key;
  title: string;
  children: React.ReactNode;
  onClick: () => void;
  active: boolean;
};

const MenuItem = ({ onClick, active, title, children }: Props) => {
  const classNames = clsx('item', { active: active });

  return (
    <li title={title} onClick={onClick} className={classNames}>
      {children || title || null}
    </li>
  );
};

export default MenuItem;
