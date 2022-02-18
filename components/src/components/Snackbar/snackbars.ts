import { SnackbarItemProps } from './SnackbarItem';
import { Store } from './Store';

// Utils
const createKey = () =>
  'xxxx-xxxx-xxxx'.replace(/[x]/g, () =>
    ((Math.random() * 16) % 16 | 0).toString(16)
  );

type PartialPick<T, TKeys extends keyof T> = { [k in TKeys]+?: T[k] };

type NextSnackbarProps = Pick<SnackbarItemProps, 'duration' | 'content'> &
  PartialPick<SnackbarItemProps, 'key'>;

type InternalProps = Pick<SnackbarItemProps, 'type'>;

const showSnackbar = (props: InternalProps) => (next: NextSnackbarProps) => {
  const { type } = props;
  const { key, content, ...nextProps } = next;

  const isValidKey = typeof key === 'string' || typeof key === 'number';
  const nextKey = isValidKey ? key : createKey();

  // The new Snackbar props
  const nextSnackbar = {
    ...nextProps,
    content,
    key: nextKey,
    type,
  };

  Store.setSnackbars((previous) => {
    const idx = isValidKey ? previous.findIndex((it) => it.key === key) : -1;

    if (idx >= 0) {
      // replaces the Snackbar if the same key was found
      const previousClone = previous.slice();
      previousClone[idx] = nextSnackbar;
      return previousClone;
    }

    return [nextSnackbar, ...previous];
  });

  return () => {
    Store.removeSnackbar(nextKey);
  };
};

export default {
  error: showSnackbar({ type: 'error' }),
  info: showSnackbar({ type: 'info' }),
  success: showSnackbar({ type: 'success' }),
  warning: showSnackbar({ type: 'warning' }),
};
