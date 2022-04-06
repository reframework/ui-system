import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

export default {
  title: 'Data Entry/Form',
  component: () => <div></div>,
} as ComponentMeta<any>;

const Template: ComponentStory<any> = ({ ...props }) => (
  <div {...props}>Form is coming soon</div>
);

export const Form = Template.bind({});

Form.args = {};
