/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */

import React from 'react';
import { getClassName } from '@reframework/classnames';
import { ActiveDescendantAction } from '@utils/useActiveDescendant';
import { useDescendantContext } from './Context';
import './ListItem.css';

enum MenuItemClassName {
  item = 'ref:menu-item',
}

export interface ListItemProps {
  id?: string;
  autoFocus?: boolean;
  as?: keyof JSX.IntrinsicElements;
  // closeOnSelect
  children: React.ReactNode;
  className?: string;
  disabled?: boolean;
  divider?: boolean;
  onClick?: (event: React.MouseEvent) => void;
  //
  closeOnSelect?: boolean;
  focusable?: boolean;
  role?: string;
  tabIndex?: number;
  // TODO: add those props;
  // icon?: React.ReactNode;
}

const ListItem: React.FC<ListItemProps> = ({
  autoFocus,
  onClick,
  divider,
  className,
  children = null,
  disabled,
  role,
  tabIndex = -1,
  ...props
}) => {
  const { activeDescendant } = useDescendantContext();

  const ref = React.useRef<HTMLLIElement | null>(null);

  const handleClick = (e: React.MouseEvent) => {
    onClick?.(e);
    activeDescendant.set(
      e.currentTarget as HTMLElement,
      ActiveDescendantAction.click,
    );
  };

  const handleMouseEnter = ({ currentTarget }: React.MouseEvent) => {
    activeDescendant.set(
      currentTarget as HTMLElement,
      ActiveDescendantAction.hover,
    );
  };

  // TEST: autofocus
  React.useLayoutEffect(() => {
    if (ref.current && autoFocus) {
      activeDescendant.set(ref.current, ActiveDescendantAction.focus);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const classNames = getClassName({
    [MenuItemClassName.item]: true,
    [className!]: Boolean(className),
  });

  return (
    <li
      role={role}
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

export default ListItem;
