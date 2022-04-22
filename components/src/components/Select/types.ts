import React from 'react';

export type Optional<T> = T | undefined;

export interface OptionItem {
  value: string;
  label: React.ReactNode;
}

export type SelectValue = string | string[];
