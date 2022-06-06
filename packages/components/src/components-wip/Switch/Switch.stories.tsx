import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

export default {
  title: 'Forms/Switch',
  component: () => <div></div>,
} as ComponentMeta<any>;

const Template: ComponentStory<any> = ({ ...props }) => (
  <div {...props}>Switch is coming soon</div>
);

export const Switch = Template.bind({});

Switch.args = {
  id: 'example',
};
