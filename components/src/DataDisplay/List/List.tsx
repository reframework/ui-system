import React from 'react';
import styles from './List.css?module';

export interface ListProps {
  children: React.ReactNode;
  autoFocus: boolean; //	If true, the list item will be focused during the first mount. Focus will also be triggered if the value changes from false to true.
}

const List = ({ children }: ListProps) => {
  return <ul className={styles.list}>{children}</ul>;
};

export default List;
