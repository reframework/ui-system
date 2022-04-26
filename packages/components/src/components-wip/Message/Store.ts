import React from 'react';
import { MessageItemProps } from './MessageItem';

export class Store {
  static setMessages = (
    _: MessageItemProps[] | React.SetStateAction<MessageItemProps[]>,
  ) => {};

  static removeMessage = (key: React.Key) => {
    Store.setMessages((previous) => previous.filter((it) => it.key !== key));
  };
}
