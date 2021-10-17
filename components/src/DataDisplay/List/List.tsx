import React, { useState } from 'react';

export interface ListProps {
  children: React.ReactNode;
  // placement: 'auto' | 'string';
  // multiple: boolean;
  // selectable: boolean;
  // selectedKeys: string[];
  // onClick: (item: any) => void;
  // onDeselect: (item: any) => void;
  // onOpenChange: (open: boolean) => void;
  // onSelect: (item: any) => void;
}

const List = ({ children }: ListProps) => {
  return <ul>{children}</ul>;
};

export default List;
