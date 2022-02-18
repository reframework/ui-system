import { MessageItemProps } from './MessageItem';
import { Store } from './Store';

// Utils
const createKey = () =>
  'xxxx-xxxx-xxxx'.replace(/[x]/g, () =>
    ((Math.random() * 16) % 16 | 0).toString(16)
  );

type PartialPick<T, TKeys extends keyof T> = { [k in TKeys]+?: T[k] };

type NextMessageProps = Pick<MessageItemProps, 'duration' | 'content'> &
  PartialPick<MessageItemProps, 'key'>;

type InternalProps = Pick<MessageItemProps, 'type'>;

const showMessage = (props: InternalProps) => (next: NextMessageProps) => {
  const { type } = props;
  const { key, content, ...nextProps } = next;

  const isValidKey = typeof key === 'string' || typeof key === 'number';
  const nextKey = isValidKey ? key : createKey();

  // The new message props
  const nextMessage = {
    ...nextProps,
    content,
    key: nextKey,
    type,
  };

  Store.setMessages((previous) => {
    const idx = isValidKey ? previous.findIndex((it) => it.key === key) : -1;

    if (idx >= 0) {
      // replaces the message if the same key was found
      const previousClone = previous.slice();
      previousClone[idx] = nextMessage;
      return previousClone;
    }

    return [nextMessage, ...previous];
  });

  return () => {
    Store.removeMessage(nextKey);
  };
};

export default {
  error: showMessage({ type: 'error' }),
  info: showMessage({ type: 'info' }),
  success: showMessage({ type: 'success' }),
  warning: showMessage({ type: 'warning' }),
};
