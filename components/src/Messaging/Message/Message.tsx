import React, { useEffect } from 'react';
import Paper from '../../Containers/Paper/Paper';
import { Portal } from '../../Portal/Portal';
import styles from './Message.css?module';

class Store {
  static setMessages = (_: any[] | React.SetStateAction<any[]>) => {};
}

const MessageItem = ({
  message,
  type,
  disappear,
  timeout = 5000,
}: MessageProps & { disappear: () => void; timeout?: number }) => {
  useEffect(() => {
    const timer = setTimeout(disappear, timeout);
    // Removes the timer before unmounting
    return () => {
      clearTimeout(timer);
    };
  }, []);

  // TODO: add icons by type
  return (
    <Paper reflection={4} className={styles.message}>
      {message}, type: {type || 'primary'}
    </Paper>
  );
};

type MessageProps = {
  id: string;
  message: React.ReactNode;
  icon?: React.ReactNode;
  type?: 'primary' | 'success' | 'error' | 'warning';
};

export const showMessage = (next: Omit<MessageProps, 'id'>) => {
  Store.setMessages((prev) => [
    ...prev,
    { ...next, id: (Math.random() * 1000000).toFixed(6) },
  ]);
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
              disappear={removeMessage(props.id)}
            />
          );
        })}
      </div>
    </Portal>
  );
};

export default Message;
