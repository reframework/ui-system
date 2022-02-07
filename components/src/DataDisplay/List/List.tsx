import React from 'react';
import styles from './List.css?module';
import ListItem from './ListItem';

export interface ListProps {
  children: React.ReactNode;
  autoFocus?: boolean;
}

const List = ({ children }: ListProps) => {
  return <ul className={styles.list}>{children}</ul>;
};

List.ListItem = ListItem;

export default List;
