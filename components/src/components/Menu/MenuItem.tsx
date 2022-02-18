import React from 'react';
import styles from './MenuItem.css?module';
import { getClassName } from '@reframework/classnames';
import { useDescendantContext } from './MenuList';
import { useMenuContext } from './Menu';

type Props = {
  // autoFocus
  // component
  children: React.ReactNode;
  className?: string;
  disabled?: boolean;
  divider?: boolean;
  onClick?: (event: React.MouseEvent) => void;
  selected?: boolean;
  // TODO: add those props;
  // icon?: React.ReactNode;
};

const MenuItem = ({
  onClick,
  selected,
  divider,
  className,
  children = null,
  disabled,
}: Props) => {
  const ref = React.useRef<HTMLDivElement | null>(null);

  const { close } = useMenuContext();
  const { activeDescendant } = useDescendantContext();

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
    (currentTarget as HTMLElement).focus();
  };

  React.useEffect(() => {
    if (!ref.current?.isSameNode(activeDescendant)) return;
    ref.current?.focus?.();
  }, [activeDescendant]);

  return (
    <div
      role="menuitem"
      ref={ref}
      onClick={handleClick}
      className={classNames}
      aria-disabled={disabled}
      onMouseEnter={handleMouseEnter}
      tabIndex={ref.current?.isSameNode(activeDescendant) ? 0 : -1}
    >
      {children}
    </div>
  );
};

export default MenuItem;
