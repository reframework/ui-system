import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import MessageComponent, { message } from './Message';
import { Button } from '../../Button';
export default {
  title: 'Feedback/Message',
  component: () => <div></div>,
} as ComponentMeta<typeof MessageComponent>;

const Template: ComponentStory<typeof MessageComponent> = () => (
  <div
    style={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      height: 150,
      width: 200,
    }}
  >
    <Button
      size="medium"
      onClick={() =>
        message.success({
          content: 'This is a success message',
        })
      }
    >
      Success
    </Button>
    <Button
      size="medium"
      variant="outlined"
      onClick={() => {
        const key = '<< The Key >>';

        message.warning({
          content: 'Warning! This message is changing in five seconds',
          key,
          duration: Infinity,
        });

        setTimeout(() => {
          message.success({
            content: 'Ok! Lets wait five seconds more :)',
            key,
            duration: 5000,
          });
        }, 5000);
      }}
    >
      Warning
    </Button>
    <Button
      size="medium"
      color="secondary"
      variant="outlined"
      onClick={() =>
        message.error({
          content: 'This is an error message, duration is 10s',
          duration: 10000,
        })
      }
    >
      Error
    </Button>
    <Button
      size="medium"
      color="neutral"
      variant="outlined"
      onClick={() =>
        message.info({
          content: 'This is an info message, Duration is 1s',
          duration: 1000,
        })
      }
    >
      Info
    </Button>
    <MessageComponent />
  </div>
);

export const Message = Template.bind({});

Message.args = {};
