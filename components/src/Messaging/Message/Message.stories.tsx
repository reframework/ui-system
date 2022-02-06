import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import MessageComponent, { showMessage } from './Message';
import { Button } from '../../Button';
export default {
  title: 'Feedback/Message',
  component: () => <div></div>,
} as ComponentMeta<typeof MessageComponent>;

const Template: ComponentStory<typeof MessageComponent> = () => (
  <div>
    <MessageComponent />
    <Button onClick={() => showMessage({ message: 'Hallo world' })}>
      Message
    </Button>
  </div>
);

export const Message = Template.bind({});

Message.args = {};
