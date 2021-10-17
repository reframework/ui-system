import React from 'react';
import clsx from 'clsx';
import styles from 'ListItem.css?module';

type Props = {
  color: string;
  disabled: boolean;
  icon: React.ReactNode;
  key: React.Key;
  children: React.ReactNode;
  onClick: () => void;
  active: boolean;
};

const ListItem = ({ onClick, active, children = null }: Props) => {
  const classNames = clsx(styles.item, { [styles.active]: active });

  return (
    <li onClick={onClick} className={classNames}>
      {/* TODO: ICON LEFT*/}
      {children}
    </li>
  );
};

export default ListItem;

// TODO: SubMenu component
