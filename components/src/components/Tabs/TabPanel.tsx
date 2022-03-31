import React from 'react';
import { useTabs } from './Tabs';

interface TabPanelProps extends React.HTMLProps<HTMLDivElement> {
  value: string;
  role: 'tabpanel';
}

export const TabPanel: React.FC<TabPanelProps> = ({
  children,
  value,
  ...props
}) => {
  if (!value) {
    // if __DEV__
    throw new Error('Tab: value is required');
  }

  const { value: internalValue, activeTabNode } = useTabs();

  if (value !== internalValue) return null;

  return (
    <div {...props} role="tabpanel" aria-labelledby={activeTabNode?.id}>
      {children}
    </div>
  );
};
