import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import AlertComponent from './Alert';

export default {
  title: 'Components/Alert',
  component: () => <div></div>,
} as ComponentMeta<any>;

const Template: ComponentStory<any> = () => (
  <div
    style={{
      height: 300,
      display: 'flex',
      justifyContent: 'space-between',
      flexDirection: 'column',
    }}
  >
    <AlertComponent type="info">This is an info alert</AlertComponent>
    <AlertComponent type="success">This is a success alert</AlertComponent>
    <AlertComponent type="warning">This is a warning alert</AlertComponent>
    <AlertComponent type="error">This is an error alert</AlertComponent>
  </div>
);

export const Alert = Template.bind({});

Alert.args = {
  id: 'example',
};
