import React from 'react';

import { useMergedRef } from '@utils/useMergedRef';
import { UseListProps, useList } from './useList';

export interface ListProps extends UseListProps {
  children: React.ReactNode;
}

const List = React.forwardRef<any, ListProps>(
  ({ children, ...props }, parentRef) => {
    const { Provider, listProps, providerProps } = useList({
      ...props,
    });

    const mergedRef = useMergedRef(listProps.ref, parentRef);

    return (
      <Provider {...providerProps}>
        <ul {...listProps} ref={mergedRef}>
          {children}
        </ul>
      </Provider>
    );
  },
);

export default List;
