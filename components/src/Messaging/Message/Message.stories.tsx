import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import MessageComponent, { showMessage } from './Message';
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
        showMessage({ message: 'This is a success message', type: 'success' })
      }
    >
      Success
    </Button>
    <Button
      size="medium"
      variant="outlined"
      onClick={() =>
        showMessage({ message: 'This is a warning message', type: 'warning' })
      }
    >
      Warning
    </Button>
    <Button
      size="medium"
      color="secondary"
      variant="outlined"
      onClick={() =>
        showMessage({ message: 'This is an error message', type: 'error' })
      }
    >
      Error
    </Button>
    <Button
      size="medium"
      color="neutral"
      variant="outlined"
      onClick={() =>
        showMessage({ message: 'This is an info message', type: 'info' })
      }
    >
      Info
    </Button>
    <MessageComponent />
  </div>
);

export const Message = Template.bind({});

Message.args = {};
