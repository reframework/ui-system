import React, { useEffect } from 'react';
import Paper from '../../Containers/Paper/Paper';
import { Portal } from '../../Portal/Portal';
import styles from './Message.css?module';

const emoji = {
  error: '🚫',
  warning: '☢️',
  success: '✅',
  info: 'ℹ️',
} as const;

const createReactKey = () =>
  'xxxx-xxxx-xxxx'.replace(/[x]/g, () =>
    ((Math.random() * 16) % 16 | 0).toString(16)
  );

class Store {
  static setMessages = (_: any[] | React.SetStateAction<any[]>) => {};
}

const MessageItem = ({
  message,
  type,
  onClose,
  timeout = 50000,
}: MessageProps & { onClose: () => void; timeout?: number }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, timeout);
    // Removes the timer before unmounting
    return () => {
      clearTimeout(timer);
    };
  }, []);

  // TODO: add icons by type
  return (
    <Paper reflection={6} className={styles.message}>
      <span className={styles.icon}>{emoji[type || 'info']} </span>
      <span className={styles.text}>{message}</span>
    </Paper>
  );
};

type MessageProps = {
  id: string;
  message: React.ReactNode;
  icon?: React.ReactNode;
  type?: 'info' | 'success' | 'error' | 'warning';
};

export const showMessage = (next: Omit<MessageProps, 'id'>) => {
  Store.setMessages((prev) => [{ ...next, id: createReactKey() }, ...prev]);
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

  const removeMessage = (id: string) => () => {
    setMessages((prev) => prev.filter((messageItem) => messageItem.id !== id));
  };

  return (
    <Portal id="messages-root">
      <div className={styles.wrapper}>
        {messages.map((props) => {
          return (
            <MessageItem
              key={props.id}
              {...props}
              onClose={removeMessage(props.id)}
            />
          );
        })}
      </div>
    </Portal>
  );
};

export default Message;
