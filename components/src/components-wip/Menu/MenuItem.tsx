import React from 'react';
import { getClassName } from '@reframework/classnames';
import { DOMFocus } from '@utils/focus';
import styles from './MenuItem.module.css?module';
import { useDescendantContext, useMenuContext } from './Context';

export interface MenuItemProps {
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
  const { close } = useMenuContext();
  const { activeDescendant } = useDescendantContext();

  const ref = React.useRef<HTMLLIElement | null>(null);
  const shouldFocus = ref.current?.isSameNode(activeDescendant);

  const classNames = getClassName({
    [styles.item]: true,
    [styles.selected]: Boolean(selected),
    [styles.disabled]: Boolean(disabled),
    [styles.divider]: Boolean(divider),
    [className!]: Boolean(className),
  });

  const handleClick = (e: React.MouseEvent) => {
    close?.();
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
