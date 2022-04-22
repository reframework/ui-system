/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import { getClassName } from '@reframework/classnames';
import { useDescendantContext } from '@utils/useActiveDescendant';
import './Option.css';

enum OptionClassNames {
  option = 'ref:select-option',
  focused = 'ref:select-option-focused',
  selected = 'ref:select-option-selected',
  disabled = 'ref:select-option-disabled',
}

export interface OptionProps {
  autoFocus?: boolean;
  children?: React.ReactNode;
  color?: string;
  disabled?: boolean;
  focused?: boolean;
  icon?: React.ReactNode;
  id?: string;
  onClick?: (event: React.MouseEvent) => void;
  selected?: boolean;
  tabIndex?: number;
}

const Option = ({
  autoFocus,
  children,
  disabled,
  focused,
  id,
  selected,
  tabIndex = -1,
  ...props
}: OptionProps) => {
  const ref = React.useRef<HTMLLIElement | null>(null);

  const { activeDescendant } = useDescendantContext();

  const handleMouseEnter = ({ currentTarget }: React.MouseEvent) => {
    activeDescendant.set(currentTarget as HTMLElement);
  };

  React.useLayoutEffect(() => {
    if (ref.current && autoFocus) {
      activeDescendant.set(ref.current);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const classNames = getClassName({
    [OptionClassNames.option]: true,
    [OptionClassNames.selected]: Boolean(selected),
    [OptionClassNames.disabled]: Boolean(disabled),
    [OptionClassNames.focused]: Boolean(focused),
  });

  return (
    <li
      aria-disabled={disabled}
      aria-selected={selected}
      className={classNames}
      id={id}
      onMouseEnter={handleMouseEnter}
      ref={ref}
      role="option"
      tabIndex={tabIndex}
      {...props}
    >
      {children}
    </li>
  );
};

export default Option;
