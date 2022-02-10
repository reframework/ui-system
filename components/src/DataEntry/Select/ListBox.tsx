import Paper, { PaperProps } from '../../Containers/Paper/Paper';
import React from 'react';

type ListBoxProps = {
  id?: string;
  subscriptions?: Record<string, (event: CustomEvent<any>) => void>;
} & PaperProps;

const ListBox: React.FC<ListBoxProps & React.HTMLProps<HTMLDivElement>> = ({
  children,
  subscriptions,
  ...props
}) => {
  const ref = React.useRef<HTMLDivElement | null>(null);

  React.useEffect(() => {
    const { current } = ref;
    if (!current || subscriptions?.constructor?.name !== 'Object') return;

    const entriesArray = Object.entries(subscriptions);
    entriesArray.forEach(([eventName, eventHandler]) => {
      current.addEventListener(eventName, eventHandler as EventListener);
    });

    return () => {
      entriesArray.forEach(([eventName, eventHandler]) => {
        current.removeEventListener(eventName, eventHandler as EventListener);
      });
    };
  }, [subscriptions]);

  return (
    <Paper {...props} ref={ref} role="listbox" tabIndex={-1}>
      {children}
    </Paper>
  );
};

export default ListBox;
