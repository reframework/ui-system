import React from 'react';
import { getClassName } from '@reframework/classnames';
import { TabsClassName, useTabs } from './Tabs';

export interface TabProps {
  value: string;
  label: React.ReactNode;
  className?: string;
  disabled?: boolean;
  active?: boolean;
  // A11y props
  id?: string;
  tabIndex?: number;
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

  const updateState = React.useCallback(() => {
    if (!ref.current) return;

    setState({
      value: value,
      tabNode: ref.current,
    });
  }, [setState, value]);

  const handleFocus = () => {
    updateState();
  };

  React.useLayoutEffect(() => {
    if (!active) return;
    /** Doesn't make sense to update when current tab is the same */
    if (value === activeValue && tabNode === ref.current) return;
    updateState();
  }, [active, activeValue, tabNode, value, updateState]);

  const classNames = getClassName({
    [TabsClassName.tab]: true,
    [TabsClassName.active]: Boolean(active),
    [TabsClassName.disabled]: Boolean(disabled),
    className: Boolean(className),
  });

  return (
    <div
      aria-selected={active}
      aria-disabled={disabled}
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
