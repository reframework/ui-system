import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import InputComponent from './Input';

export default {
  title: 'Input/Input',
  component: InputComponent,
  argTypes: {
    size: {
      options: ['small', 'medium', 'large'],
      control: { type: 'select' },
    },
    color: {
      options: ['default', 'error', 'warning', 'success'],
      control: { type: 'select' },
    },
  },
} as ComponentMeta<typeof InputComponent>;

const Template: ComponentStory<typeof InputComponent> = (props) => (
  <InputComponent {...props} />
);

export const Input = Template.bind({});

Input.args = {
  prefix: '$',
  size: 'small',
  placeholder: 'Input',
  suffix: 'BTC',
  color: 'default',
};
