import React from 'react';
import { TabsClassName, useTabs } from './Tabs';
import { getClassName } from '@reframework/classnames';

interface TabProps {
  value: string;
  label: React.ReactNode;
  className?: string;
  disabled?: boolean;
  active?: boolean;
  // A11y props
  id?: string;
  tabIndex?: number;

  // onKeyDown
  // onClick
}

export const Tab: React.FC<TabProps> = ({
  id,
  label,
  value,
  active,
  disabled,
  className,
  ...props
}) => {
  if (!value) {
    // if __DEV__
    throw new Error('Tab: value is required');
  }

  const ref = React.useRef<HTMLDivElement>(null);
  const { setState, tabNode, value: activeValue } = useTabs();

  const updateState = () => {
    if (!ref.current) return;

    setState({
      value: value,
      tabNode: ref.current,
    });
  };

  const handleFocus = () => {
    updateState();
  };

  React.useEffect(() => {
    if (!active) return;
    /** Doesn't make sense to update when current tab is the same */
    if (value === activeValue && tabNode === ref.current) return;
    updateState();
  }, [active, activeValue, tabNode]);

  const classNames = getClassName({
    [TabsClassName.tab]: true,
    [TabsClassName.active]: Boolean(active),
    [TabsClassName.disabled]: Boolean(disabled),
    className: Boolean(className),
  });

  return (
    <div
      aria-selected={active}
      className={classNames}
      id={id || `tab:${value}`}
      onFocus={handleFocus}
      ref={ref}
      role="tab"
      {...props}
    >
      {label}
    </div>
  );
};
