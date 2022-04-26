import React from 'react';

export interface OptionItem {
  value: string;
  label: React.ReactNode;
}

export type SelectValue = string | string[];
