import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

export default {
  title: 'Data Entry/Switch',
  component: () => <div></div>,
} as ComponentMeta<any>;

const Template: ComponentStory<any> = ({ ...props }) => <div {...props} />;

export const Switch = Template.bind({});

Switch.args = {
  id: 'example',
};
