import React from 'react';
import { SnackbarItemProps } from './SnackbarItem';

export class Store {
  static setSnackbars = (
    _: SnackbarItemProps[] | React.SetStateAction<SnackbarItemProps[]>
  ) => {};

  static removeSnackbar = (key: React.Key) => {
    Store.setSnackbars((previous) => previous.filter((it) => it.key !== key));
  };
}
