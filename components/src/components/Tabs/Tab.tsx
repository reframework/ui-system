import React from 'react';
import { TabsClassName, useTabs } from './Tabs';
import { getClassName } from '@reframework/classnames';

interface TabProps {
  id?: string;
  value: string;
  label: React.ReactNode;
  className?: string;
  disabled?: boolean;
  active?: boolean;
  // onKeyDown
  // onClick
}

export const Tab: React.FC<TabProps> = ({
  id,
  label,
  value,
  active,
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
    updateState();
  }, [active]);

  const classNames = getClassName({
    [TabsClassName.tab]: true,
    className: Boolean(className),
    active: Boolean(active),
  });

  return (
    <div
      aria-selected={active}
      className={classNames}
      id={id || `tab:${value}`}
      onFocus={handleFocus}
      ref={ref}
      role="tab"
      tabIndex={active ? 0 : -1}
      {...props}
    >
      {label}
    </div>
  );
};
