import Paper, { PaperProps } from '../../Containers/Paper/Paper';
import React from 'react';

type ListBoxProps = {
  id?: string;
} & PaperProps;

const ListBox: React.FC<ListBoxProps & React.HTMLProps<HTMLDivElement>> = ({
  children,
  ...props
}) => {
  const ref = React.useRef<HTMLDivElement | null>(null);

  return (
    <Paper {...props} ref={ref} role="listbox" tabIndex={-1}>
      {children}
    </Paper>
  );
};

export default ListBox;
