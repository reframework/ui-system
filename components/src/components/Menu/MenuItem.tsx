import React from 'react';
import { getClassName } from '@reframework/classnames';
import './MenuItem.css';
import { useDescendantContext } from './Context';

enum MenuItemClassName {
  divider = 'ref:menu-item-divider',
  disabled = 'ref:menu-item-disabled',
  selected = 'ref:menu-item-selected',
  item = 'ref:menu-item',
}

export interface MenuItemProps {
  id?: string;
  autoFocus?: boolean;
  as?: keyof JSX.IntrinsicElements;
  // closeOnSelect
  children: React.ReactNode;
  className?: string;
  disabled?: boolean;
  divider?: boolean;
  onClick?: (event: React.MouseEvent) => void;
  selected?: boolean;
  //
  closeOnSelect?: boolean;
  focusable?: boolean;
  role?: 'menuitem';
  tabIndex?: number;
  // TODO: add those props;
  // icon?: React.ReactNode;
}

const MenuItem: React.FC<MenuItemProps> = ({
  autoFocus,
  onClick,
  selected,
  divider,
  className,
  children = null,
  disabled,
  // role = 'menuitem',
  tabIndex = -1,
  ...props
}) => {
  const { activeDescendant, onCloseRequest } = useDescendantContext();

  const ref = React.useRef<HTMLLIElement | null>(null);

  const handleClick = (e: React.MouseEvent) => {
    onCloseRequest?.();
    onClick?.(e);
  };

  const handleMouseEnter = ({ currentTarget }: React.MouseEvent) => {
    activeDescendant.set(currentTarget as HTMLElement);
  };

  // TEST: autofocus
  React.useLayoutEffect(() => {
    if (ref.current && autoFocus) {
      activeDescendant.set(ref.current);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const classNames = getClassName({
    [MenuItemClassName.item]: true,
    [MenuItemClassName.selected]: Boolean(selected),
    [MenuItemClassName.disabled]: Boolean(disabled),
    [MenuItemClassName.divider]: Boolean(divider),
    [className!]: Boolean(className),
  });

  return (
    // `handleKeyDown` is provided by `MenuList`
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events
    <li
      role="menuitem"
      ref={ref}
      onClick={handleClick}
      className={classNames}
      aria-disabled={disabled}
      onMouseEnter={handleMouseEnter}
      tabIndex={tabIndex}
      {...props}
    >
      {children}
    </li>
  );
};

export default MenuItem;
