import React, { useEffect } from 'react';
import Paper from '../../Containers/Paper/Paper';
import { Portal } from '../../Portal/Portal';
import styles from './Message.css?module';

type PartialPick<T, TKeys extends keyof T> = { [k in TKeys]+?: T[k] };

const emoji = {
  error: '🚫',
  warning: '☢️',
  success: '✅',
  info: 'ℹ️',
} as const;

const createKey = () =>
  'xxxx-xxxx-xxxx'.replace(/[x]/g, () =>
    ((Math.random() * 16) % 16 | 0).toString(16)
  );

class Store {
  static setMessages = (
    _: MessageProps[] | React.SetStateAction<MessageProps[]>
  ) => {};
}

const DEFAULT_DURATION = 5000;

const MessageItem = ({
  content,
  type,
  onClose,
  duration = DEFAULT_DURATION,
}: MessageProps & { onClose: () => void }) => {
  useEffect(() => {
    if (duration === Infinity) return;

    const timeout = setTimeout(onClose, duration);
    // Removes the timer before unmounting
    return () => {
      clearTimeout(timeout);
    };
  }, [duration]);

  // TODO: add icons by type
  return (
    <Paper reflection={6} className={styles.message}>
      <span className={styles.icon}>{emoji[type || 'info']} </span>
      <span className={styles.text}>{content}</span>
    </Paper>
  );
};

type MessageProps = {
  content: string | React.ReactNode;
  key: React.Key;
  type: 'info' | 'success' | 'error' | 'warning';
  duration?: number;
  // ...
};

type NextMessageProps = Pick<MessageProps, 'duration' | 'content'> &
  PartialPick<MessageProps, 'key'>;

type InternalProps = Pick<MessageProps, 'type'>;

const showMessage = (props: InternalProps) => (next: NextMessageProps) => {
  const { type } = props;
  const { key, content, ...nextProps } = next;

  const isValidKey = typeof key === 'string' || typeof key === 'number';
  // The new message props
  const nextMessage = {
    ...nextProps,
    content,
    key: isValidKey ? key : createKey(),
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
};

export const message = {
  error: showMessage({ type: 'error' }),
  info: showMessage({ type: 'info' }),
  success: showMessage({ type: 'success' }),
  warning: showMessage({ type: 'warning' }),
};

const Message: React.FC = () => {
  const [messages, setMessages] = React.useState<MessageProps[]>([]);

  React.useEffect(() => {
    const defaultMethod = Store.setMessages;
    Store.setMessages = setMessages;

    return () => {
      // return the default method
      Store.setMessages = defaultMethod;
    };
  }, []);

  const removeMessage = (key: React.Key) => () => {
    setMessages((prev) => prev.filter((item) => item.key !== key));
  };

  return (
    <Portal id="messages-root">
      <div className={styles.wrapper}>
        {messages.map((props) => {
          return (
            <MessageItem
              {...props}
              key={props.key}
              onClose={removeMessage(props.key)}
            />
          );
        })}
      </div>
    </Portal>
  );
};

export default Message;
