import React from 'react';
import { getClassName } from '@reframework/classnames';
import { DOMFocus } from '@utils/focus';
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
  ...props
}) => {
  const { activeDescendant, onCloseRequest } = useDescendantContext();

  const ref = React.useRef<HTMLLIElement | null>(null);
  const shouldFocus = ref.current?.isSameNode(activeDescendant);

  const classNames = getClassName({
    [MenuItemClassName.item]: true,
    [MenuItemClassName.selected]: Boolean(selected),
    [MenuItemClassName.disabled]: Boolean(disabled),
    [MenuItemClassName.divider]: Boolean(divider),
    [className!]: Boolean(className),
  });

  const handleClick = (e: React.MouseEvent) => {
    console.log('onCloseRequest', onCloseRequest);
    onCloseRequest?.();
    onClick?.(e);
  };

  const handleMouseEnter = ({ currentTarget }: React.MouseEvent) => {
    DOMFocus.set(currentTarget as HTMLElement);
  };

  React.useEffect(() => {
    if (ref.current && shouldFocus) {
      DOMFocus.set(ref.current);
    }
  }, [shouldFocus]);

  React.useEffect(() => {
    if (ref.current && autoFocus) {
      DOMFocus.set(ref.current!);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
      tabIndex={shouldFocus ? 0 : -1}
      {...props}
    >
      {children}
    </li>
  );
};

export default MenuItem;
