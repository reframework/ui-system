import React from 'react';
import { Portal } from '../../Portal';
import styles from './Snackbar.css?module';
import SnackbarItem, { SnackbarItemProps } from './SnackbarItem';
import { Store } from './Store';

const Message: React.FC = () => {
  const [snackbars, setSnackbars] = React.useState<SnackbarItemProps[]>([]);

  React.useEffect(() => {
    // Some sort of Monkey patching
    const defaultSetSnackbars = Store.setSnackbars;
    Store.setSnackbars = setSnackbars;

    return () => {
      // return the default method
      Store.setSnackbars = defaultSetSnackbars;
    };
  }, []);

  const removeSnackbar = (key: React.Key) => () => {
    Store.removeSnackbar(key);
  };

  return (
    <Portal id="snackbars-root" className={styles.wrapper}>
      {snackbars.map((props) => (
        <SnackbarItem
          {...props}
          key={props.key}
          onClose={removeSnackbar(props.key)}
        />
      ))}
    </Portal>
  );
};

export default Message;
