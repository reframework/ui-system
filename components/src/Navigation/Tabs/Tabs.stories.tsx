import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

export default {
  title: 'Navigation/Tabs',
  component: () => <div></div>,
} as ComponentMeta<any>;

const Template: ComponentStory<any> = ({ ...props }) => <div {...props} />;

export const Checkbox = Template.bind({});

Checkbox.args = {
  id: 'example',
};
