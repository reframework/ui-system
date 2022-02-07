import React from 'react';
import styles from './ListItem.css?module';
import { getClassName } from '@reframework/classnames';

type Props = {
  children: React.ReactNode;
  className?: string;
  disabled?: boolean;
  divider?: boolean;
  onClick?: (event: React.MouseEvent) => void;
  selected?: boolean;
  // TODO: add those props;
  // icon?: React.ReactNode;
};

const ListItem = ({
  onClick,
  selected,
  divider,
  className,
  children = null,
  disabled,
}: Props) => {
  const classNames = getClassName({
    [styles.item]: true,
    [styles.selected]: Boolean(selected),
    [styles.disabled]: Boolean(disabled),
    [styles.divider]: Boolean(divider),
    [className!]: Boolean(className),
  });

  return (
    <li onClick={onClick} className={classNames}>
      {/* TODO: ICON LEFT*/}
      {children}
    </li>
  );
};

export default ListItem;

// TODO: SubMenu component
