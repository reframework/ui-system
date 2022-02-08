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

const createEvent = <T extends {}>(detail?: T) => {
  return new CustomEvent('rf:list-item-click', {
    bubbles: true,
    cancelable: true,
    detail,
  });
};

const ListItem = ({
  onClick,
  selected,
  divider,
  className,
  children = null,
  disabled,
}: Props) => {
  const ref = React.useRef<HTMLLIElement | null>(null);

  const handleClick = (event: React.MouseEvent) => {
    if (typeof onClick === 'function') {
      onClick(event);
    }

    if (ref.current && !disabled) {
      ref.current.dispatchEvent(createEvent());
    }
  };

  const classNames = getClassName({
    [styles.item]: true,
    [styles.selected]: Boolean(selected),
    [styles.disabled]: Boolean(disabled),
    [styles.divider]: Boolean(divider),
    [className!]: Boolean(className),
  });

  return (
    <li ref={ref} onClick={handleClick} className={classNames}>
      {children}
    </li>
  );
};

export default ListItem;

// TODO: SubMenu component
