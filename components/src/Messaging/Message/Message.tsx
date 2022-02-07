import React from 'react';
import { Portal } from '../../Portal';
import styles from './Message.css?module';
import MessageItem, { MessageItemProps } from './MessageItem';
import { Store } from './Store';

const Message: React.FC = () => {
  const [messages, setMessages] = React.useState<MessageItemProps[]>([]);

  React.useEffect(() => {
    // Some sort of Monkey patching
    const defaultSetMessages = Store.setMessages;
    Store.setMessages = setMessages;

    return () => {
      // return the default method
      Store.setMessages = defaultSetMessages;
    };
  }, []);

  const removeMessage = (key: React.Key) => () => {
    Store.removeMessage(key);
  };

  return (
    <Portal id="messages-root" className={styles.wrapper}>
      {messages.map((props) => (
        <MessageItem
          {...props}
          key={props.key}
          onClose={removeMessage(props.key)}
        />
      ))}
    </Portal>
  );
};

export default Message;
