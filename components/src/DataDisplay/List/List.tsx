import React from 'react';

export interface ListProps {
  anchorEl: HTMLElement;
  children: React.ReactNode;
  placement: 'auto' | 'string';
  // multiple: boolean;
  selectable: boolean;
  selectedKeys: string[];
  onClick: (item: any) => void;
  onDeselect: (item: any) => void;
  onOpenChange: (open: boolean) => void;
  onSelect: (item: any) => void;
}

const List = ({ children }: ListProps) => {
  const handleClick = (idx: number) => () => {
    console.log(idx);
  };

  return (
    <ul>
      {React.Children.map(children, (child, idx) => {
        if (!React.isValidElement(child)) return null;

        return React.cloneElement(child, {
          isActive: idx % 3 === 0,
          onClick: handleClick(idx),
        });
      })}
    </ul>
  );
};

export default List;
