import React from 'react';
import Menu, { MenuProps } from '../../DataDisplay/Menu/Menu';
export interface SelectProps extends MenuProps {
  children: React.ReactNode;
}

const Select = ({ children, ...props }: SelectProps) => {
  return <Menu {...props}>{children}</Menu>;
};

export default Select;
