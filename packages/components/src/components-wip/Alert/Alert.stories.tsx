import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Box } from '@wip/Box';
import { Paper } from '@components/Paper';
import AlertComponent from './Alert';

export default {
  title: 'Feedback/Alert',
  component: () => <div></div>,
  parameters: {
    layout: 'centered',
  },
} as ComponentMeta<any>;

const Template: ComponentStory<any> = () => (
  <Paper style={{ width: '100vw', maxWidth: 600 }}>
    <Box p="m">
      <Box mb="s">
        <AlertComponent type="info" content="Info alert" />
      </Box>
      <Box mb="s">
        <AlertComponent type="success" content="Success alert" />
      </Box>
      <Box mb="s">
        <AlertComponent type="warning" content="Warning alert" />
      </Box>
      <Box>
        <AlertComponent type="error" content="Error alert" />
      </Box>
    </Box>
  </Paper>
);

export const Alert = Template.bind({});

Alert.args = {
  id: 'example',
};
