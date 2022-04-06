import React from 'react';
import { useTabs } from './Tabs';

export interface TabPanelProps extends React.HTMLProps<HTMLDivElement> {
  value: string;
  role?: 'tabpanel';
}

export const TabPanel: React.FC<TabPanelProps> = ({
  children,
  value,
  role = 'tabpanel',
  ...props
}) => {
  if (!value) {
    // if __DEV__
    throw new Error('Tab: value is required');
  }

  const { value: internalValue, activeTabNode } = useTabs();

  if (value !== internalValue) return null;

  return (
    <div {...props} role={role} aria-labelledby={activeTabNode?.id}>
      {children}
    </div>
  );
};
