import React from 'react';
import styles from './MenuItem.css?module';
import { getClassName } from '@reframework/classnames';
import { useMenuContext } from './Menu';
import { useDescendantContext } from './useActiveDescendant';

type Props = {
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
  // TODO: add those props;
  // icon?: React.ReactNode;
};

const focus = (node: any) => {
  node?.focus();
};

const MenuItem = ({
  autoFocus,
  as = 'li',
  onClick,
  selected,
  divider,
  className,
  children = null,
  disabled,
}: Props) => {
  const { close } = useMenuContext();
  const { activeDescendant } = useDescendantContext();

  const Root = as as any;
  const ref = React.useRef<HTMLElement | null>(null);
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
    focus(currentTarget);
  };

  React.useEffect(() => {
    if (shouldFocus) {
      focus(ref.current);
    }
  }, [shouldFocus]);

  React.useEffect(() => {
    if (autoFocus) {
      focus(ref.current);
    }
  }, []);

  return (
    <Root
      role="menuitem"
      ref={ref}
      onClick={handleClick}
      className={classNames}
      aria-disabled={disabled}
      onMouseEnter={handleMouseEnter}
      tabIndex={shouldFocus ? 0 : -1}
    >
      {children}
    </Root>
  );
};

export default MenuItem;